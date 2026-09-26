import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;

export async function findAll(): Promise<Libro[]> {
  return prisma.libro.findMany();
}

export async function findAllWithAuthor(): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    include: { autor: true }
  });
}

export async function findById(id: number): Promise<Libro | null> {
  return prisma.libro.findUnique({ where: { id } });
}

export async function findByIdWithAuthor(id: number): Promise<LibroConAutor | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true }
  });
}

export async function create(datos: { titulo: string; autorId: number; descripcion?: string; precio: number; portada: string }): Promise<Libro> {
  const autorExists = await prisma.autor.findUnique({ where: { id: datos.autorId } });
  if (!autorExists) {
    throw new Error(`El autor con ID ${datos.autorId} no existe`);
  }
  return prisma.libro.create({ data: datos, include: { autor: true } });
}

export async function update(id: number, datos: { titulo?: string; autorId?: number; descripcion?: string; precio?: number; portada?: string }): Promise<LibroConAutor | null> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return null;
  
  if (datos.autorId !== undefined) {
    const autorExists = await prisma.autor.findUnique({ where: { id: datos.autorId } });
    if (!autorExists) {
      throw new Error(`El autor con ID ${datos.autorId} no existe`);
    }
  }
  
  return prisma.libro.update({ 
    where: { id }, 
    data: datos,
    include: { autor: true }
  });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return false;
  await prisma.libro.delete({ where: { id } });
  return true;
}
