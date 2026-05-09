const inputBusqueda = document.getElementById("busqueda");
const btnBuscar = document.getElementById("btnBuscar");
const resultados = document.getElementById("resultados");
const mensajeError = document.getElementById("mensajeError");

if (btnBuscar){
    btnBuscar.addEventListener("click", buscarLibros);
}

function buscarLibros(){

    resultados.innerHTML = "";
    mensajeError.textContent = "";

    const textoBusqueda = inputBusqueda.value.trim().toLowerCase();

    if (textoBusqueda === ""){
        mensajeError.textContent = "Ingrese un libro para buscar.";
        return;
    }

    const encontrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(textoBusqueda) ||
        libro.autor.toLowerCase().includes(textoBusqueda)
    );

    if (encontrados.length === 0) {
        mensajeError.textContent = "No se encontraron libros.";
        return;
    }

    mostrarResultados(encontrados);
}

function mostrarResultados(librosAMostrar){
    
    librosAMostrar.forEach(libro => {
        const col = document.createElement("div");
        col.className = "col";
        col.innerHTML = `
            <div class="card h-100">
                <img src="${libro.portada}" class="card-img-top" alt="Portada">
                <div class="card-body">
                    <h5 class="card-title">${libro.titulo}</h5>
                    <p class="card-text">${libro.autor}</p>
                </div>
                <div class="card-footer">
                    <a href="libro.html?id=${libro.id}" class="btn btn-primary btn-sm">Ver más</a>
                </div>
            </div>
        `;
        resultados.appendChild(col);
    });
}

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
    {
        id: 3,
        titulo: "1984",
        autor: "George Orwell",
        descripcion: "Una distopía ambientada en un futuro totalitario donde el gobierno controla cada aspecto de la vida de los ciudadanos. Winston Smith trabaja reescribiendo la historia para el Partido y comienza a cuestionar en secreto el sistema que lo oprime.",
        precio: "$3.800",
        portada: "https://covers.openlibrary.org/b/id/15158861-M.jpg"
    },
    {
        id: 4,
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        descripcion: "Un aviador que cae en el desierto conoce a un pequeño príncipe llegado de otro planeta. A través de sus viajes por distintos mundos, la historia reflexiona sobre la amistad, el amor y lo esencial de la vida.",
        precio: "$2.900",
        portada: "https://covers.openlibrary.org/b/id/14851577-M.jpg"
    },
    {
        id: 5,
        titulo: "Rayuela",
        autor: "Julio Cortázar",
        descripcion: "Una novela experimental que puede leerse en distintos órdenes según las instrucciones del autor. Sigue a Horacio Oliveira, un argentino en París que busca el sentido de la existencia entre el arte, el amor y la filosofía.",
        precio: "$4.100",
        portada: "https://covers.openlibrary.org/b/id/15103307-M.jpg"
    }
];