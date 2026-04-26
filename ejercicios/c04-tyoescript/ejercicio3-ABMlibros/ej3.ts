interface Libro{

    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disp: boolean;
    genero?: string;

}

let catalogo: Libro[]=[

    {isbn: "1", titulo: "El Principito", autor: "Saint-Exupery", precio: 15000, disp: true},
    {isbn: "2", titulo: "El Problema de los Tres Cuerpos", autor: "Liu Cixin", precio: 25000, disp: true},
    {isbn: "3", titulo: "No Tengo Boca y Debo Gritar", autor: "Harlan Ellison", precio: 27500, disp: false},
    {isbn: "4", titulo: "La Ultima Pregunta", autor: "Isaac Asimov", precio: 15000, disp: false},
    {isbn: "5", titulo: "Metro 2033", autor: "Dmitry Glukhovsky", precio: 40000, disp: true}
    
]

function buscarPorAutor(autor: string): Libro[]{

    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));

}

function librosDisponibles(): Libro[]{

    return catalogo.filter(libro => libro.disp);

}

function precioPromedio(libros: Libro[]): number{

    if(libros.length === 0) return 0;
    let suma = 0;

    for(let libro of libros){

        suma = suma + libro.precio;

    }

    return suma / libros.length;

}


const input = document.getElementById("filtroautor") as HTMLInputElement;
const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement;
const btnDisponibles = document.getElementById("mostrarDisp") as HTMLButtonElement;
const btnTodos = document.getElementById("mostrarAll") as HTMLButtonElement;

btnFiltrar.addEventListener("click", () => {
    
    renderizar(buscarPorAutor(input.value));

});

btnDisponibles.addEventListener("click", () => {

    renderizar(librosDisponibles());

});

btnTodos.addEventListener("click", () => {

    renderizar(catalogo);

});

function renderizar(libros: Libro[]): void {

    const lista = document.getElementById("listado") as HTMLUListElement;
    const stats = document.getElementById("stats") as HTMLElement;

    lista.innerHTML = "";

    for (let libro of libros) {

        const li = document.createElement("li");

        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio} ${libro.disp ? "(Disponible)" : "(No disponible)"} `;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        btnEliminar.addEventListener("click", () => {
            eliminarLibro(libro.isbn);
        });

        li.appendChild(btnEliminar);
        lista.appendChild(li);
    }

    stats.textContent = `Cantidad: ${libros.length}`;
}

function agregarLibro(libro: Libro): void{

    catalogo.push(libro);
    renderizar(catalogo);

}

function eliminarLibro(isbn: string): void {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
}

function validarFormulario(): Libro | null{

    const titulo = (document.getElementById("titulo") as HTMLInputElement).value.trim();
    const autor = (document.getElementById("autor") as HTMLInputElement).value.trim();
    const precioStr = (document.getElementById("precio") as HTMLInputElement).value;
    const genero = (document.getElementById("genero") as HTMLInputElement).value.trim();
    const disp = (document.getElementById("disponible") as HTMLInputElement).checked;

    const error = document.getElementById("errorForm") as HTMLElement;

    const precio = Number(precioStr);

    if (titulo === "" || autor === "" || precio <= 0) {
        error.textContent = "Completar campos obligatorios y precio válido";
        return null;
    }

    error.textContent = "";

    const nuevoLibro: Libro = {
        isbn: "AUTO-" + Date.now(),
        titulo,
        autor,
        precio,
        disp,
        genero: genero || undefined
    };

    return nuevoLibro;
}

const btnAgregar = document.getElementById("agregar") as HTMLButtonElement;

btnAgregar.addEventListener("click", () => {

    const libro = validarFormulario();

    if (libro === null) return;

    agregarLibro(libro);

    // Limpiar form
    (document.getElementById("titulo") as HTMLInputElement).value = "";
    (document.getElementById("autor") as HTMLInputElement).value = "";
    (document.getElementById("precio") as HTMLInputElement).value = "";
    (document.getElementById("genero") as HTMLInputElement).value = "";
    (document.getElementById("disponible") as HTMLInputElement).checked = false;
});

renderizar(catalogo);