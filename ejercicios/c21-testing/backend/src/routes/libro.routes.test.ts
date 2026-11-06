import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";


// Prisma vacío: si un día authorize se rompe, estos tests fallan en vez de escribir en la base real
vi.mock("../config/prisma", () => ({ prisma: {} }));

const libroNuevo = {
  titulo: "Bestiario",
  autorId: 1,
  descripcion: "Cuentos de Julio Cortázar.",
  precio: 9000,
  portada: "https://img/b.jpg",
};

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

describe("POST /api/libros", () => {
  it("sin token → 401 'Falta el token'", async () => {
    const res = await request(app).post("/api/libros").send(libroNuevo);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Falta el token" });
  });

  it("con token de CLIENTE → 403", async () => {
    const res = await request(app).post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`).send(libroNuevo);
    expect(res.status).toBe(403);
  });

  it("ADMIN con body inválido → 400, no 403", async () => {
    const res = await request(app).post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`).send({ precio: -5 });
    expect(res.status).toBe(400);
    expect(res.body.detalles).toContainEqual({ campo: "precio", mensaje: "El precio debe ser mayor a 0" });
  });

  it("CLIENTE con body inválido → 403, no 400: autorizar va antes que validar", async () => {
    const res = await request(app).post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`).send({ precio: -5 });
    expect(res.status).toBe(403);
  });

  it("con token adulterado → 401 'Token inválido'", async () => {
    const res = await request(app).post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}x`).send(libroNuevo);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Token inválido" });
  });
});

describe("DELETE /api/libros/:id", () => {
  it("con token de CLIENTE → 403", async () => {
    const res = await request(app).delete("/api/libros/1")
      .set("Authorization", `Bearer ${tokenCliente}`);
    expect(res.status).toBe(403);
  });
});

describe("ruta inexistente", () => {
  it("GET /api/no-existe → 404", async () => {
    const res = await request(app).get("/api/no-existe");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Ruta no encontrada" });
  });
});
