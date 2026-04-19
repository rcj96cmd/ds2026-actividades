function generar(){

    let input = document.getElementById("altura").value;
    let resultado = document.getElementById("resultado");

    //Validacion
    if (input === "" || input < 1) {

        resultado.textContent = "Error: ingresar un numero valido mayor a 0";
        return;

    }

    let altura = Number(input);
    let arbol = "";

    //Generar medio arbol

    for (let i = 1; i <= altura; i++){

        for (let j = 0; j < i; j++){

            arbol += "*";

        }

        arbol += "\n";

    }

    //Mostrar en Pantalla

    resultado.textContent = arbol;

}