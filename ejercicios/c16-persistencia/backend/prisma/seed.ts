import { prisma } from "../src/config/prisma";

const libros = [
  { 
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    descripcion: "Una de las obras más importantes...",
    precio: 4500, 
    portada: "https://covers.openlibrary.org/b/id/15219095-M.jpg"
  },
  { 
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",  
    descripcion: "Una colección de cuentos...",
    precio: 3200, 
    portada: "https://covers.openlibrary.org/b/id/14826417-M.jpg"
  }
];

const autores = [
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "Miguel de Cervantes", nacionalidad: "España" }
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();
