function generar(): void {

    const input = document.getElementById("altura") as HTMLInputElement;
    const resultado = document.getElementById("resultado") as HTMLElement;

    const valor: string = input.value;
    const altura: number = Number(valor);
    ///Error
    ///let altura: string = valor;

    if(valor === "" || altura < 1){

        resultado.textContent = "Error: ingresar un numero valido mayor a 0;"
        return;

    }

    let arbol: string ="";

    for(let i: number = 1; i <= altura; i++){

        for(let j: number = 0; j < i; j++){

            arbol = arbol + "*";

        }

        arbol += "\n";

    }

    resultado.textContent = arbol;
    
}