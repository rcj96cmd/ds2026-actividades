"use strict";
const catalogo = [
    { isbn: "1", titulo: "El Principito", autor: "Saint-Exupery", precio: 15000, disp: true },
    { isbn: "2", titulo: "El Problema de los Tres Cuerpos", autor: "Liu Cixin", precio: 25000, disp: true },
    { isbn: "3", titulo: "No Tengo Boca y Debo Gritar", autor: "Harlan Ellison", precio: 27500, disp: false },
    { isbn: "4", titulo: "La Ultima Pregunta", autor: "Isaac Asimov", precio: 15000, disp: false },
    { isbn: "5", titulo: "Metro 2033", autor: "Dmitry Glukhovsky", precio: 40000, disp: true }
];
function buscarPorAutor(autor) {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(libro => libro.disp);
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    let suma = 0;
    for (let libro of libros) {
        suma = suma + libro.precio;
    }
    return suma / libros.length;
}
function renderizar(libros) {
    const lista = document.getElementById("listado");
    const stats = document.getElementById("stats");
    lista.innerHTML = "";
    for (let libro of libros) {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio} ${libro.disp ? "(Disponible)" : "(No Disponible)"}`;
        lista.appendChild(li);
    }
    const promedio = precioPromedio(libros);
    stats.textContent = `Cantidad: ${libros.length} | Precio Promedio: $${promedio}`;
}
const input = document.getElementById("filtroautor");
const btnFiltrar = document.getElementById("filtrar");
const btnDisponibles = document.getElementById("mostrarDisp");
const btnTodos = document.getElementById("mostrarAll");
btnFiltrar.addEventListener("click", () => {
    renderizar(buscarPorAutor(input.value));
});
btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
renderizar(catalogo);
