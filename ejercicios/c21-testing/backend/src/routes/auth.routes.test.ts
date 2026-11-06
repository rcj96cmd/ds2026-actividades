import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../config/prisma";

// Usa la base de datos: requiere docker compose up -d db y el seed cargado
afterAll(() => prisma.$disconnect());

describe("POST /api/auth/login", () => {
  it("credenciales del seed → 200 con token y usuario sin passwordHash", async () => {
    const res = await request(app).post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "Cliente1234" });
    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.usuario).toMatchObject({ email: "cliente@libreria.test", rol: "CLIENTE" });
    expect(res.body.usuario).not.toHaveProperty("passwordHash");
  });

  it("email con mayúsculas y espacios → 200, porque el schema lo normaliza", async () => {
    const res = await request(app).post("/api/auth/login")
      .send({ email: "  Cliente@Libreria.TEST ", password: "Cliente1234" });
    expect(res.status).toBe(200);
  });

  it("contraseña incorrecta → 401 'Credenciales inválidas'", async () => {
    const res = await request(app).post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "Incorrecta1" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });

  it("mail que no existe → el MISMO 401 (no revela si el mail existe)", async () => {
    const res = await request(app).post("/api/auth/login")
      .send({ email: "nadie@libreria.test", password: "Cliente1234" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });
});

describe("GET /api/auth/yo", () => {
  it("con el token del login → 200 con el usuario", async () => {
    const login = await request(app).post("/api/auth/login")
      .send({ email: "admin@libreria.test", password: "Admin1234" });

    const res = await request(app).get("/api/auth/yo")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ email: "admin@libreria.test", rol: "ADMIN" });
    expect(res.body).not.toHaveProperty("passwordHash");
  });
});
