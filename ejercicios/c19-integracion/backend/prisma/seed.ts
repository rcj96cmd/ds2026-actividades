import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";


const autoresData = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "Alexander Shvets", nacionalidad: "Ucrania" },
  { nombre: "Ray Bradbury", nacionalidad: "Estados Unidos" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
  { nombre: "Paulo Coelho", nacionalidad: "Brasil" },
  { nombre: "Yuval Noah Harari", nacionalidad: "Israel" },
  { nombre: "Dan Brown", nacionalidad: "Estados Unidos" },
  { nombre: "Harper Lee", nacionalidad: "Estados Unidos" },
  { nombre: "Carlos Ruiz Zafón", nacionalidad: "España" }
];

const librosData = [
  { titulo: "El principito", descripcion: "Un piloto en el desierto encuentra un pequeño príncipe de otro mundo.", precio: 4500, portada: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80", autorId: 1 },
  { titulo: "Patrones de diseño", descripcion: "Colección de soluciones recurrentes a problemas comunes de software.", precio: 8500, portada: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80", autorId: 3 },
  { titulo: "Fahrenheit 451", descripcion: "En un futuro distópico, los bomberos se encargan de quemar libros.", precio: 5200, portada: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80", autorId: 4 },
  { titulo: "Cien años de soledad", descripcion: "Una de las obras más importantes de la literatura universal.", precio: 6200, portada: "https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=400&q=80", autorId: 2 },
  { titulo: "1984", descripcion: "Un clásico de la literatura distópica sobre el totalitarismo.", precio: 3500, portada: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80", autorId: 5 },
  { titulo: "El alquimista", descripcion: "Un novelista y sus libros", precio: 4100, portada: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80", autorId: 6 },
  { titulo: "Sapiens: De animales a dioses", descripcion: "La historia de la humanidad según Yuval Noah Harari.", precio: 7800, portada: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80", autorId: 7 },
  { titulo: "El código Da Vinci", descripcion: "Teorías conspirativas sobre historia del arte y religión.", precio: 5100, portada: "https://images.unsplash.com/photo-1496104679561-38b73d6fcdf0?auto=format&fit=crop&w=400&q=80", autorId: 8 },
  { titulo: "Matar a un ruiseñor", descripcion: "Un abogado defiende a un negro acusado de atacar a un blanco.", precio: 4700, portada: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80", autorId: 9 },
  { titulo: "La sombra del viento", descripcion: "Un libro misterioso en una Barcelona de los años 40.", precio: 6900, portada: "https://images.unsplash.com/photo-1529480821492-a27f2b0b4b79?auto=format&fit=crop&w=400&q=80", autorId: 10 }
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
