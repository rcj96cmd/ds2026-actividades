// Interface Usuario
interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// Referencias al DOM
const listaUsuarios = document.getElementById("listaUsuarios") as HTMLUListElement;

const loading = document.getElementById("loading") as HTMLParagraphElement;

const errorMensaje = document.getElementById("error") as HTMLParagraphElement;


// Función async
async function obtenerUsuarios(): Promise<Usuario[]> {

  try {

    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!respuesta.ok) {
      throw new Error("Error al obtener usuarios");
    }

    const usuarios: Usuario[] = await respuesta.json();

    return usuarios;

  } catch (error) {

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

  } catch (error) {

    loading.style.display = "none";

    errorMensaje.textContent = "Ocurrió un error al cargar usuarios.";

  }

}


// Ejecutar
mostrarUsuarios();