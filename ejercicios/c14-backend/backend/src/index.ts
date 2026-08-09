const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const libros = [
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

app.get('/', (req, res) => {
  res.json({ message: 'Hello World desde el backend con Docker 🐳' });
});

app.get('/libros', (req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});