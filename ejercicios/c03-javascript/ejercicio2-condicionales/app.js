//Funcion

function clasificarNota(nota){

    if (nota < 4){

        return "Desaprobado";

    } else  
        if (nota >= 4 && nota <= 7){

            return "Aprobado";

        } else {

            return "Promocionado";

        }
}

function diadelasemana(num){

    switch (num) {

        case 1:
            return "Lunes";

        case 2:
            return "Martes";

        case 3:
            return "Miercoles";

        case 4:
            return "Jueves";

        case 5:
            return "Viernes";

        case 6:
            return "Sabado (fin de semana)";

        case 7:
            return "Domingo (fin de semana)";

        default:
            return "Dia Invalido";

    }
}

console.log(clasificarNota(2)); //Desaprobado
console.log(clasificarNota(5)); //Apronado
console.log(clasificarNota(9)); //Promocionado

console.log(diadelasemana(1)); //Lunes
console.log(diadelasemana(6)); //Sabado
console.log(diadelasemana(14)); //Dia Invalido
