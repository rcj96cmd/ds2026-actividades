"use strict";
// Referencias al DOM
const listaUsuarios = document.getElementById("listaUsuarios");
const loading = document.getElementById("loading");
const errorMensaje = document.getElementById("error");
// Función async
async function obtenerUsuarios() {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!respuesta.ok) {
            throw new Error("Error al obtener usuarios");
        }
        const usuarios = await respuesta.json();
        return usuarios;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
// Mostrar usuarios en pantalla
async function mostrarUsuarios() {
    try {
        // Mostrar loading
        loading.style.display = "block";
        const usuarios = await obtenerUsuarios();
        // Ocultar loading
        loading.style.display = "none";
        usuarios.forEach(usuario => {
            const li = document.createElement("li");
            li.textContent = `${usuario.name} - ${usuario.email}`;
            listaUsuarios.appendChild(li);
        });
    }
    catch (error) {
        loading.style.display = "none";
        errorMensaje.textContent = "Ocurrió un error al cargar usuarios.";
    }
}
// Ejecutar
mostrarUsuarios();
