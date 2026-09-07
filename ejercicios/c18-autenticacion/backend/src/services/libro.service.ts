import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;

// Sin include: solo el libro con autorId (no devuelve el autor completo)
export async function findAll(): Promise<Libro[]> {
  return prisma.libro.findMany();
}

// CON INCLUDE - Cambia la forma del JSON devuelto (página 14 del PDF)
export async function findAllWithAuthor(): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    include: { autor: true }
  });
}

// Buscar por ID sin include
export async function findById(id: number): Promise<Libro | null> {
  return prisma.libro.findUnique({ where: { id } });
}

// Buscar por ID CON include del autor (página 14 del PDF)
export async function findByIdWithAuthor(id: number): Promise<LibroConAutor | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true }
  });
}

// Crear libro (con validación de que el autor exista)
export async function create(datos: { titulo: string; autorId: number; descripcion?: string; precio: number; portada: string }): Promise<Libro> {
  const autorExists = await prisma.autor.findUnique({ where: { id: datos.autorId } });
  if (!autorExists) {
    throw new Error(`El autor con ID ${datos.autorId} no existe`);
  }
  return prisma.libro.create({ data: datos });
}

// Actualizar libro (con validación de autor si se cambia el autorId)
export async function update(id: number, datos: { titulo?: string; autorId?: number; descripcion?: string; precio?: number; portada?: string }): Promise<Libro | null> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return null;
  
  // Si se cambia el autor, verificar que exista
  if (datos.autorId !== undefined) {
    const autorExists = await prisma.autor.findUnique({ where: { id: datos.autorId } });
    if (!autorExists) {
      throw new Error(`El autor con ID ${datos.autorId} no existe`);
    }
  }
  
  await prisma.libro.update({ where: { id }, data: datos });
  return prisma.libro.findUnique({ where: { id } });
}

// Eliminar libro (onDelete: Restrict - si el autor tiene otros libros NO se borra)
export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return false;
  await prisma.libro.delete({ where: { id } });
  return true;
}
