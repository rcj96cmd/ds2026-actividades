import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";


const autoresData = [
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "Miguel de Cervantes", nacionalidad: "España" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { nombre: "Ray Bradbury", nacionalidad: "Estados Unidos" },
  { nombre: "Paulo Coelho", nacionalidad: "Brasil" },
  { nombre: "Harper Lee", nacionalidad: "Estados Unidos" },
  { nombre: "Carlos Ruiz Zafón", nacionalidad: "España" }
];

const librosData = [
  { titulo: "Cien años de soledad", descripcion: "Una de las obras más importantes de la literatura latinoamericana. Narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo, entrelazando realidad y fantasía en lo que se conoce como realismo mágico.", precio: 4500, portada: "https://covers.openlibrary.org/b/id/15219095-M.jpg", autorId: 1 },
  { titulo: "El Aleph", descripcion: "Una colección de cuentos que explora el infinito, el tiempo y la identidad. El cuento central narra el descubrimiento de un punto en el espacio desde el cual se pueden ver todos los lugares del universo al mismo tiempo.", precio: 3200, portada: "https://covers.openlibrary.org/b/id/14826417-M.jpg", autorId: 2 },
  { titulo: "Don Quijote de la Mancha", descripcion: "Considerada la primera novela moderna de la literatura occidental. Sigue las aventuras de Alonso Quijano, un hidalgo que enloquece leyendo libros de caballería y decide convertirse en caballero andante junto a su fiel escudero Sancho Panza.", precio: 5000, portada: "https://covers.openlibrary.org/b/id/15119548-M.jpg", autorId: 3 },
  { titulo: "1984", descripcion: "Una distopía ambientada en un futuro totalitario donde el gobierno controla cada aspecto de la vida de los ciudadanos. Winston Smith trabaja reescribiendo la historia para el Partido y comienza a cuestionar en secreto el sistema que lo oprime.", precio: 3800, portada: "https://covers.openlibrary.org/b/id/15158861-M.jpg", autorId: 4 },
  { titulo: "El principito", descripcion: "Un aviador que cae en el desierto conoce a un pequeño príncipe llegado de otro planeta. A través de sus viajes por distintos mundos, la historia reflexiona sobre la amistad, el amor y lo esencial de la vida.", precio: 2900, portada: "https://covers.openlibrary.org/b/id/14851577-M.jpg", autorId: 5 },
  { titulo: "Rayuela", descripcion: "Una novela experimental que puede leerse en distintos órdenes según las instrucciones del autor. Sigue a Horacio Oliveira, un argentino en París que busca el sentido de la existencia entre el arte, el amor y la filosofía.", precio: 4100, portada: "https://covers.openlibrary.org/b/id/15103307-M.jpg", autorId: 6 },
  { titulo: "Fahrenheit 451", descripcion: "En una sociedad distópica donde los libros están prohibidos, Guy Montag es un bombero cuya tarea es quemarlos. Su encuentro con una joven vecina lo lleva a cuestionar su trabajo y a descubrir el valor oculto del conocimiento y la lectura.", precio: 5200, portada: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80", autorId: 7 },
  { titulo: "El alquimista", descripcion: "Santiago, un joven pastor andaluz, emprende un viaje hacia las pirámides de Egipto en busca de un tesoro anunciado en un sueño recurrente. En el camino descubre que el verdadero tesoro está en el propio viaje y en escuchar los signos del universo.", precio: 4100, portada: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80", autorId: 8 },
  { titulo: "Matar a un ruiseñor", descripcion: "En un pueblo del sur de Estados Unidos durante la Gran Depresión, el abogado Atticus Finch decide defender a un hombre acusado injustamente. La historia, narrada por su hija Scout, aborda el racismo, la injusticia y la pérdida de la inocencia.", precio: 4700, portada: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80", autorId: 9 },
  { titulo: "La sombra del viento", descripcion: "En la Barcelona de posguerra, un joven descubre en el Cementerio de los Libros Olvidados una novela que cambiará su destino. A medida que investiga al misterioso autor del libro, se adentra en una trama de amor, venganza y secretos ocultos.", precio: 6900, portada: "https://images.unsplash.com/photo-1529480821492-a27f2b0b4b79?auto=format&fit=crop&w=400&q=80", autorId: 10 }
];

const usuarios = [
  { email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN" as const, password: "Admin1234" },
  { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as const, password: "Cliente1234" }
];

async function main() {
  const autores = await prisma.autor.createMany({ data: autoresData });  // ← DECLARAR LA VARIABLE
  
  console.log(`Se crearon ${autores.count} autores`);
  
  for (const libro of librosData) {
    await prisma.libro.create({ 
      data: { titulo: libro.titulo, descripcion: libro.descripcion, precio: libro.precio, portada: libro.portada, autorId: libro.autorId } 
    });
    console.log(`Creado libro "${libro.titulo}" → autorId: ${libro.autorId}`);
  }
  
  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({ 
      where: { email: datos.email }, 
      update: {}, 
      create: { ...datos, passwordHash: await bcrypt.hash(password, 10) } 
    });
  }
  
  console.log('\nBase de datos inicializada correctamente!');
}

main().catch(console.error);