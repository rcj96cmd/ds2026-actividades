import type { Libro } from "../types/libro";

export const libros: Libro[] = [
  {
    id: 0,
    titulo: "Cien años de soledad",
    autor: {
      id: 0,
      nombre: "Gabriel García Márquez",
      nacionalidad: "Colombiana"
    },
    autorId: 0,
    descripcion: "Una de las obras más importantes de la literatura latinoamericana. Narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo, entrelazando realidad y fantasía en lo que se conoce como realismo mágico.",
    precio: 4500,
    disponible: true,
    portada: "https://covers.openlibrary.org/b/id/15219095-M.jpg"
  },
  {
    id: 1,
    titulo: "El Aleph",
    autor: {
      id: 1,
      nombre: "Jorge Luis Borges",
      nacionalidad: "Argentina"
    },
    autorId: 1,
    descripcion: "Una colección de cuentos que explora el infinito, el tiempo y la identidad. El cuento central narra el descubrimiento de un punto en el espacio desde el cual se pueden ver todos los lugares del universo al mismo tiempo.",
    precio: 3200,
    disponible: true,
    portada: "https://covers.openlibrary.org/b/id/14826417-M.jpg"
  },
  {
    id: 2,
    titulo: "Don Quijote de la Mancha",
    autor: {
      id: 2,
      nombre: "Miguel de Cervantes",
      nacionalidad: "Española"
    },
    autorId: 2,
    descripcion: "Considerada la primera novela moderna de la literatura occidental. Sigue las aventuras de Alonso Quijano, un hidalgo que enloquece leyendo libros de caballería y decide convertirse en caballero andante junto a su fiel escudero Sancho Panza.",
    precio: 5000,
    disponible: true,
    portada: "https://covers.openlibrary.org/b/id/15119548-M.jpg"
  },
  {
    id: 3,
    titulo: "1984",
    autor: {
      id: 3,
      nombre: "George Orwell",
      nacionalidad: "Británica"
    },
    autorId: 3,
    descripcion: "Una distopía ambientada en un futuro totalitario donde el gobierno controla cada aspecto de la vida de los ciudadanos. Winston Smith trabaja reescribiendo la historia para el Partido y comienza a cuestionar en secreto el sistema que lo oprime.",
    precio: 3800,
    disponible: true,
    portada: "https://covers.openlibrary.org/b/id/15158861-M.jpg"
  },
  {
    id: 4,
    titulo: "El principito",
    autor: {
      id: 4,
      nombre: "Antoine de Saint-Exupéry",
      nacionalidad: "Francesa"
    },
    autorId: 4,
    descripcion: "Un aviador que cae en el desierto conoce a un pequeño príncipe llegado de otro planeta. A través de sus viajes por distintos mundos, la historia reflexiona sobre la amistad, el amor y lo esencial de la vida.",
    precio: 2900,
    disponible: true,
    portada: "https://covers.openlibrary.org/b/id/14851577-M.jpg"
  },
  {
    id: 5,
    titulo: "Rayuela",
    autor: {
      id: 5,
      nombre: "Julio Cortázar",
      nacionalidad: "Argentina"
    },
    autorId: 5,
    descripcion: "Una novela experimental que puede leerse en distintos órdenes según las instrucciones del autor. Sigue a Horacio Oliveira, un argentino en París que busca el sentido de la existencia entre el arte, el amor y la filosofía.",
    precio: 4100,
    disponible: true,
    portada: "https://covers.openlibrary.org/b/id/15103307-M.jpg"
  },
  {
    id: 6,
    titulo: "Fahrenheit 451",
    autor: {
      id: 6,
      nombre: "Ray Bradbury",
      nacionalidad: "Estadounidense"
    },
    autorId: 6,
    descripcion: "En una sociedad distópica donde los libros están prohibidos, Guy Montag es un bombero cuya tarea es quemarlos. Su encuentro con una joven vecina lo lleva a cuestionar su trabajo y a descubrir el valor oculto del conocimiento y la lectura.",
    precio: 5200,
    disponible: true,
    portada: "https://covers.openlibrary.org/b/isbn/9781451673319-M.jpg"
  },
  {
    id: 7,
    titulo: "El alquimista",
    autor: {
      id: 7,
      nombre: "Paulo Coelho",
      nacionalidad: "Brasileña"
    },
    autorId: 7,
    descripcion: "Santiago, un joven pastor andaluz, emprende un viaje hacia las pirámides de Egipto en busca de un tesoro anunciado en un sueño recurrente. En el camino descubre que el verdadero tesoro está en el propio viaje y en escuchar los signos del universo.",
    precio: 4100,
    disponible: true,
    portada: "https://covers.openlibrary.org/b/isbn/9780062315007-M.jpg"
  },
  {
    id: 8,
    titulo: "Matar a un ruiseñor",
    autor: {
      id: 8,
      nombre: "Harper Lee",
      nacionalidad: "Estadounidense"
    },
    autorId: 8,
    descripcion: "En un pueblo del sur de Estados Unidos durante la Gran Depresión, el abogado Atticus Finch decide defender a un hombre acusado injustamente. La historia, narrada por su hija Scout, aborda el racismo, la injusticia y la pérdida de la inocencia.",
    precio: 4700,
    disponible: true,
    portada: "https://covers.openlibrary.org/b/isbn/9780060935467-M.jpg"
  },
  {
    id: 9,
    titulo: "La sombra del viento",
    autor: {
      id: 9,
      nombre: "Carlos Ruiz Zafón",
      nacionalidad: "Española"
    },
    autorId: 9,
    descripcion: "En la Barcelona de posguerra, un joven descubre en el Cementerio de los Libros Olvidados una novela que cambiará su destino. A medida que investiga al misterioso autor del libro, se adentra en una trama de amor, venganza y secretos ocultos.",
    precio: 6900,
    disponible: true,
    portada: "https://covers.openlibrary.org/b/isbn/9788408043645-M.jpg"
  }
];