//Interface
interface LibroOL {

  title: string;

  author_name?: string[];

  first_publish_year?: number;

}


//Interface de la respuesta
interface RespuestaLibros {

  docs: LibroOL[];

}


const inputBusqueda = document.getElementById("busqueda") as HTMLInputElement;

const btnBuscar = document.getElementById("btnBuscar") as HTMLButtonElement;

const resultados = document.getElementById("resultados") as HTMLDivElement;

const mensajeError = document.getElementById("mensajeError") as HTMLParagraphElement;


//Evento click
btnBuscar.addEventListener("click", buscarLibros);


//Función principal
async function buscarLibros() {


  resultados.innerHTML = "";

  mensajeError.textContent = "";

  const textoBusqueda = inputBusqueda.value.trim();

  if (textoBusqueda === "") {

    mensajeError.textContent = "Ingrese un libro para buscar.";

    return;

  }

  try {

    const respuesta = await fetch(
      `https://openlibrary.org/search.json?q=${textoBusqueda}`
    );

    if (!respuesta.ok) {

      throw new Error("Error en la búsqueda");

    }

    const datos: RespuestaLibros = await respuesta.json();

    mostrarResultados(datos.docs);

  } catch (error) {

    mensajeError.textContent = "Ocurrió un error al buscar libros.";

    console.error(error);

  }

}


//Resultados
function mostrarResultados(libros: LibroOL[]) {

  libros.slice(0, 10).forEach(libro => {

    const tarjeta = document.createElement("div");

    tarjeta.className = "tarjeta";

    const autor = libro.author_name
      ? libro.author_name[0]
      : "Autor desconocido";

    const anio = libro.first_publish_year
      ? libro.first_publish_year
      : "Sin año";

    tarjeta.innerHTML = `
    
      <h3>${libro.title}</h3>

      <p><strong>Autor:</strong> ${autor}</p>

      <p><strong>Año:</strong> ${anio}</p>

    `;

    resultados.appendChild(tarjeta);

  });

}