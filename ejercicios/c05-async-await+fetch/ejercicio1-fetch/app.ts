//interfaz Usuario
interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

//Funcion async

async function obtenerUsuarios(): Promise<Usuario[]> {

  try {

    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');

    //Verificacion de error

    if(!respuesta.ok){

      throw new Error('Error al obtener usuarios');

    }

    // Respuesta a JSON tipado

    const usuarios: Usuario[] = await respuesta.json();

    return usuarios;

  } catch (error) {

    console.error('Error:', error);

    return [];

  }

}

//Llamada a la funcion


async function mostrarUsuarios() {

  const usuarios = await obtenerUsuarios();

  usuarios.forEach(usuario => {

    console.log(`Nombre: ${usuario.name}`);
    console.log(`Email: ${usuario.email}`);
    console.log(`--------------------------`);

  });

}

//Ejecutar la funcion para mostrar usuarios

mostrarUsuarios();

