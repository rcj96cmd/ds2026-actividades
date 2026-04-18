function calcularPrecioFinal(monto, medioPago){

    let descuento = 0;

    if (monto < 200){

        descuento = 0;

    } else
        if (monto >= 200 && monto <= 400){

            if (medioPago === "E"){

                descuento = 0.30;

            } else
                if (medioPago === "D"){

                    descuento = 0.20;
                    
                } else
                    if(medioPago === "C"){

                        descuento = 0.10;

                    }

        } else {

            descuento = 0.40;

        }
    
    let montoFinal = monto - (monto * descuento);
    return montoFinal;

}


///Pruebas

console.log(`Monto: $150 | Pago: E | Final: $${calcularPrecioFinal(150,"E")}`);
console.log(`Monto: $250 | Pago: E | Final: $${calcularPrecioFinal(250,"E")}`);
console.log(`Monto: $500 | Pago: D | Final: $${calcularPrecioFinal(500,"D")}`);
console.log(`Monto: $1000 | Pago: C | Final: $${calcularPrecioFinal(1000,"C")}`);
console.log(`Monto: $1500 | Pago: C | Final: $${calcularPrecioFinal(1500,"D")}`);