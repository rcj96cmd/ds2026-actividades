const input = document.getElementById("producto");
const boton = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

boton.addEventListener("click", agregarProducto);

function agregarProducto(){

    let nombre = input.value.trim();

    //Validacion

    if(nombre === ""){

        alert("Ingresar un producto valido");
        return;

    }

    //Crear elementos

    let li = document.createElement("li");
    li.textContent = nombre + " ";

    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    //Evento Eliminar

    btnEliminar.addEventListener("click", function() {

        lista.removeChild(li);
        actualizarContador();
        
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);

    //Limpiar Input
    input.value = "";

    actualizarContador();

}

function actualizarContador(){

    let cantidad = lista.children.length;
    contador.textContent = `${cantidad} productos en la lista`;
    
}