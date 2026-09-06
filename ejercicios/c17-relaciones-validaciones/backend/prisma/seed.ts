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
  { 
    titulo: "El principito",
    descripcion: "Un piloto en el desierto encuentra un pequeño príncipe de otro mundo.",
    precio: 4500, 
    portada: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    autorId: 1  
  },
  { 
    titulo: "Patrones de diseño",
    descripcion: "Colección de soluciones recurrentes a problemas comunes de software.",
    precio: 8500, 
    portada: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    autorId: 3  
  },
  { 
    titulo: "Fahrenheit 451",
    descripcion: "En un futuro distópico, los bomberos se encargan de quemar libros.",
    precio: 5200, 
    portada: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80",
    autorId: 4  
  },
  { 
    titulo: "Cien años de soledad",
    descripcion: "La historia de la familia Buendía en el pueblo ficticio de Macondo.",
    precio: 6200, 
    portada: "https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=400&q=80",
    autorId: 2  
  },
  { 
    titulo: "1984",
    descripcion: "Una distopía sobre vigilancia estatal totalitaria.",
    precio: 5400, 
    portada: "https://images.unsplash.com/photo-1473755504818-b72b6dfdc0a1?auto=format&fit=crop&w=400&q=80",
    autorId: 5  
  },
  { 
    titulo: "El alquimista",
    descripcion: "Un pastor andaluz busca un tesoro enterrado.",
    precio: 4300, 
    portada: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=400&q=80",
    autorId: 6  
  },
  { 
    titulo: "Sapiens: De animales a dioses",
    descripcion: "Historia de la humanidad desde las primeras herramientas hasta el dominio global.",
    precio: 7800, 
    portada: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    autorId: 7  
  },
  { 
    titulo: "El código Da Vinci",
    descripcion: "Teorías conspirativas sobre historia del arte y religión.",
    precio: 5100, 
    portada: "https://images.unsplash.com/photo-1496104679561-38b73d6fcdf0?auto=format&fit=crop&w=400&q=80",
    autorId: 8 
  },
  { 
    titulo: "Matar a un ruiseñor",
    descripcion: "Un abogado defiende a un negro acusado de atacar a un blanco.",
    precio: 4700, 
    portada: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
    autorId: 9  
  },
  { 
    titulo: "La sombra del viento",
    descripcion: "Un libro misterioso en una Barcelona de los años 40.",
    precio: 6900, 
    portada: "https://images.unsplash.com/photo-1529480821492-a27f2b0b4b79?auto=format&fit=crop&w=400&q=80",
    autorId: 10 
  }
];

async function main() {

  const autores = await prisma.autor.createMany({ data: autoresData });
  
  console.log(`Se crearon ${autores.count} autores`);
  if (autores.ids && autores.ids.length > 0) {
    console.log('   IDs de autores:', autores.ids);
  }
  
  for (const libro of librosData) {
    await prisma.libro.create({
      data: {
        titulo: libro.titulo,
        descripcion: libro.descripcion,
        precio: libro.precio,
        portada: libro.portada,
        autorId: libro.autorId 
      }
    });
    
    console.log(`Creado libro "${libro.titulo}" → autorId: ${libro.autorId}`);
  }
  
  console.log('\nBase de datos inicializada correctamente!');
}

main().catch(console.error);
