import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "../config/prisma";
import { create, findAll } from "./libro.service";

// Prisma mockeado: testea la lógica del service sin base de datos
vi.mock("../config/prisma", () => ({
  prisma: {
    libro: { findMany: vi.fn(), create: vi.fn() },
    autor: { findUnique: vi.fn() },
  },
}));

const findMany = vi.mocked(prisma.libro.findMany);
const crearLibro = vi.mocked(prisma.libro.create);
const buscarAutor = vi.mocked(prisma.autor.findUnique);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("libroService.findAll", () => {
  it("devuelve lo que trae Prisma, con el autor y ordenado por id", async () => {
    const libros = [{ id: 1, titulo: "Rayuela" }];
    findMany.mockResolvedValue(libros as never);

    const resultado = await findAll();

    expect(resultado).toEqual(libros);
    expect(findMany).toHaveBeenCalledWith({
      where: { disponible: undefined },
      include: { autor: true },
      orderBy: { id: "asc" },
    });
  });

  it("le pasa el filtro de disponibilidad a Prisma", async () => {
    findMany.mockResolvedValue([] as never);

    await findAll(false);

    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { disponible: false } }));
  });
});

describe("libroService.create", () => {
  const datos = { titulo: "Bestiario", autorId: 999, descripcion: "Cuentos.", precio: 9000, portada: "https://img/b.jpg" };

  it("con un autor que no existe tira un error 400 y no crea el libro", async () => {
    buscarAutor.mockResolvedValue(null);

    await expect(create(datos)).rejects.toMatchObject({
      status: 400,
      message: "El autor con ID 999 no existe",
    });
    expect(crearLibro).not.toHaveBeenCalled();
  });
});
