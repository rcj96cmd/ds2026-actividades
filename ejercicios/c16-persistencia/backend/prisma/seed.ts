import { prisma } from "../src/config/prisma";

const libros = [
  { titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    descripcion: "Una de las obras más importantes de la literatura latinoamericana. Narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo, entrelazando realidad y fantasía en lo que se conoce como realismo mágico.",
    precio: "$4.500",
    portada: "https://covers.openlibrary.org/b/id/15219095-M.jpg"
  },
  { titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    descripcion: "Una colección de cuentos que explora el infinito, el tiempo y la identidad. El cuento central narra el descubrimiento de un punto en el espacio desde el cual se pueden ver todos los lugares del universo al mismo tiempo.",
    precio: "$3.200",
    portada: "https://covers.openlibrary.org/b/id/14826417-M.jpg"
  },
  { titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    descripcion: "Considerada la primera novela moderna de la literatura occidental. Sigue las aventuras de Alonso Quijano, un hidalgo que enloquece leyendo libros de caballería y decide convertirse en caballero andante junto a su fiel escudero Sancho Panza.",
    precio: "$5.000",
    portada: "https://covers.openlibrary.org/b/id/15119548-M.jpg"
  },
];

const autores = [
    { nombre: "Gabriel García Márquez", nacionalidad: "Colombia", bio: "Premio Nobel de Literatura 1982, máximo exponente del realismo mágico." },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina", bio: "Escritor y poeta, referente de la literatura fantástica del siglo XX." },
  { nombre: "Miguel de Cervantes", nacionalidad: "España", bio: "Autor de Don Quijote de la Mancha, considerado el padre de la novela moderna." },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();