"use strict";
function generar() {
    const input = document.getElementById("altura");
    const resultado = document.getElementById("resultado");
    const valor = input.value;
    const altura = Number(valor);
    ///Error
    ///let altura: string = valor;
    if (valor === "" || altura < 1) {
        resultado.textContent = "Error: ingresar un numero valido mayor a 0;";
        return;
    }
    let arbol = "";
    for (let i = 1; i <= altura; i++) {
        for (let j = 0; j < i; j++) {
            arbol = arbol + "*";
        }
        arbol += "\n";
    }
    resultado.textContent = arbol;
}
