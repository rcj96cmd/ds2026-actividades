import { describe, it, expect } from "vitest";
import { libroCreateSchema, libroUpdateSchema, idParamSchema } from "./libro.validation";

const libroValido = {
  titulo: "Rayuela",
  autorId: 1,
  descripcion: "Una novela experimental.",
  precio: 7000,
  portada: "https://img/r.jpg",
};

describe("libroCreateSchema", () => {
  it("rechaza precio negativo", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, precio: -5 });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].path).toEqual(["precio"]);
  });

  it("recorta espacios del título", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, titulo: "  Rayuela  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.titulo).toBe("Rayuela");
  });

  it("exige la descripción, porque la base no la acepta vacía", () => {
    const { descripcion: _descripcion, ...sinDescripcion } = libroValido;
    const r = libroCreateSchema.safeParse(sinDescripcion);
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].path).toEqual(["descripcion"]);
  });
});

describe("libroUpdateSchema", () => {
  it("acepta actualizar un solo campo", () => {
    const r = libroUpdateSchema.safeParse({ precio: 8000 });
    expect(r.success).toBe(true);
  });
});

describe("idParamSchema", () => {
  it('convierte el id "42" de la URL en el número 42', () => {
    const r = idParamSchema.safeParse({ id: "42" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.id).toBe(42);
  });

  it("rechaza un id que no es un número", () => {
    const r = idParamSchema.safeParse({ id: "abc" });
    expect(r.success).toBe(false);
  });
});
