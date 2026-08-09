import { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 0,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    descripcion: "Una de las obras más importantes de la literatura latinoamericana. Narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo, entrelazando realidad y fantasía en lo que se conoce como realismo mágico.",
    precio: "$4.500",
    portada: "https://covers.openlibrary.org/b/id/15219095-M.jpg"
  },
  {
    id: 1,
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    descripcion: "Una colección de cuentos que explora el infinito, el tiempo y la identidad. El cuento central narra el descubrimiento de un punto en el espacio desde el cual se pueden ver todos los lugares del universo al mismo tiempo.",
    precio: "$3.200",
    portada: "https://covers.openlibrary.org/b/id/14826417-M.jpg"
  },
  {
    id: 2,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    descripcion: "Considerada la primera novela moderna de la literatura occidental. Sigue las aventuras de Alonso Quijano, un hidalgo que enloquece leyendo libros de caballería y decide convertirse en caballero andante junto a su fiel escudero Sancho Panza.",
    precio: "$5.000",
    portada: "https://covers.openlibrary.org/b/id/15119548-M.jpg"
  },
];
let proximoId = libros.length;

export function findAll(): Libro[] {
  return libros;
}

export function findById(id: number): Libro | undefined {
  return libros.find(l => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return undefined;
  libros[index] = { ...datos, id };
  return libros[index];
}

export function remove(id: number): boolean {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return false;
  libros.splice(index, 1);
  return true;
}