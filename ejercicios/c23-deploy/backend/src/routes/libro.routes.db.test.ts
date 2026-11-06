import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { prisma } from "../config/prisma";
import { JWT_SECRET } from "../config/env";


const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });
const idsCreados: number[] = [];
let autorId: number;

function libroDePrueba(titulo: string) {
  return { titulo, autorId, descripcion: "Libro creado por un test.", precio: 9000, portada: "https://img/t.jpg" };
}

beforeAll(async () => {
  const autor = await prisma.autor.findUniqueOrThrow({ where: { nombre: "Julio Cortázar" } }); // del seed
  autorId = autor.id;
});

afterAll(async () => {
  await prisma.libro.deleteMany({ where: { id: { in: idsCreados } } });
  await prisma.$disconnect();
});

describe("GET /api/libros", () => {
  it("→ 200 con el autor anidado en cada libro", async () => {
    const res = await request(app).get("/api/libros");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].autor).toEqual({
      id: expect.any(Number),
      nombre: expect.any(String),
      nacionalidad: expect.any(String),
    });
  });

  it("?disponible=false → devuelve solo los libros no disponibles", async () => {
    const noDisponible = await prisma.libro.create({
      data: { ...libroDePrueba("Libro agotado"), disponible: false },
    });
    idsCreados.push(noDisponible.id);

    const res = await request(app).get("/api/libros?disponible=false");

    expect(res.status).toBe(200);
    expect(res.body.map((l: { id: number }) => l.id)).toContain(noDisponible.id);
    expect(res.body.every((l: { disponible: boolean }) => l.disponible === false)).toBe(true);
  });
});

describe("GET /api/libros/:id", () => {
  it("un id que no existe → 404", async () => {
    const res = await request(app).get("/api/libros/999999");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Libro no encontrado" });
  });
});

describe("POST /api/libros", () => {
  it("como ADMIN → 201 con el libro creado y disponible por defecto", async () => {
    const res = await request(app).post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`).send(libroDePrueba("Bestiario"));
    idsCreados.push(res.body.id);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ titulo: "Bestiario", disponible: true, autor: { id: autorId } });
  });

  it("con un autor que no existe → 400 y no 500", async () => {
    const res = await request(app).post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ ...libroDePrueba("Sin autor"), autorId: 999999 });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "El autor con ID 999999 no existe" });
  });
});

describe("POST /api/autores", () => {
  it("con un nombre repetido → 409, y el error llega al errorHandler", async () => {
    const res = await request(app).post("/api/autores")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ nombre: "Julio Cortázar", nacionalidad: "Argentina" });

    expect(res.status).toBe(409);
    expect(res.body).toEqual({ error: "Datos duplicados" });
  });
});
