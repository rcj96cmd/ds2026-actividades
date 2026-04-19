const numeros = [10, 25, 3, 40, 18, 7, 50, 2];

let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (let i=0; i < numeros.length; i++) {

    suma += numeros[i];

    if(numeros[i] > mayor){

        mayor = numeros[i];

    }

    if(numeros[i] < menor){

        menor = numeros[i];

    }


}

let promedio = suma / numeros.length;

///Muestra en Consola

console.log("Suma total:", suma);
console.log("Promedio:", promedio);
console.log("Mayor:", mayor);
console.log("Menor:", menor);

///Funcion

function generarAsteriscos(n){

    let resultado = "";

    for (let i=0; i<n; i++){

        resultado += "*";

    }

    return resultado;

}

console.log(generarAsteriscos(5));
console.log(generarAsteriscos(20));
