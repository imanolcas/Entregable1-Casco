let vidas = 1;
let nombre = "";
let loop = true;


let buenasDecisiones = 0;
let malasDecisiones = 0;

let puntaje = 0;
let puntajeTotal = 0;

let objetos



const nombreAventurero = () => {
    nombre = prompt("En un mundo de fantasía donde la magia fluía como los ríos y las criaturas místicas poblaban los bosques, había un intrépido aventurero llamado:");
    if(!nombre){
            nombre = "Alric";
            alert(`Como el nombre no fue correctamente asignado se le asignara el nombre ${nombre}`);
        }
    console.log(nombre)
}

const introduccion = () => {
    nombreAventurero();
        alert(`Ahora seras tu quien controle las desiciones de ${nombre} \n SUERTE!!!`)
}

const primerDesafio = (respuestaPrimerDesafio) => {

    alert(`${nombre} se adentro en un bosque donde a la hora de caminata se encuentra tres caminos \n 1-En el camino de la derecha se encuentra un leon muerto de hambre \n 2-En el camino del medio hay un camino lleno de plantas venenozas \n 3-En el camino de la izquierda se encuentra custodiado por tres golems`);
    
    while(loop){    
    respuestaPrimerDesafio = prompt(`¿Que camino tendra que elgir ${nombre}? \n 1-Leon muerto de hambre \n 2-plantas venenozas \n 3-tres golems \n (como respuestas unicas 1, 2 o 3)`);

    if(respuestaPrimerDesafio == 1){
            alert(`${nombre} avanza por el camino de la derecha se encuentra al leon muerto de hambre y como estaba muerto pasa tranquilamente \n ganas 50 puntos`);
            buenasDecisiones++;
            puntajeTotal += 50;
            puntaje += 50;
            console.log(`Puntaje:${puntaje}`)
            break;
        }else if(respuestaPrimerDesafio == 2){
            alert(`${nombre} avanza por el camino del medio intentando evitar las plantas pero se descuida y respira las esporas venenozas, y asi termina MURIENDO`);
            vidas--;
            malasDecisiones++;
            break;
        }else if(respuestaPrimerDesafio == 3){
            alert(`${nombre} avanza por el camino de la izquierda enfrentandose a los tres golems y como no tenia armas, y asi termina MURIENDO`);
            vidas--;
            malasDecisiones++;
            break;
        }else{
            alert("Por favor elegir solo las respuestas correspondientes(1 - 2 - 3)");
        }
    }
}

const tienda = () => {
    const objetos = [
        {pin: 1, nombre:"Amuleto", precio: 80, informacion: "aumenta la cantidad de puntos obtenidos"},
        {pin: 2, nombre: "Pocion", precio: 100, informacion:"1HP"}
    ];
    
    const mostrarobjetos = () => {
        let tiendaconsola = "Los objetos son los siguientes:\n";
        for(i = 0; i < objetos.length; i++){
            tiendaconsola += `${i}- ${objetos[i].nombre} - ${objetos[i].precio}PTS - ${objetos[i].informacion}\n`
        }
        console.table(tiendaconsola)
    }

    mostrarobjetos();

    alert("El aventurero encuentra una tienda y se adentra en ella"); 

    while(loop){
        let textoTienda = prompt(`Puntaje: ${puntaje} \n Que objetos quieres comprar con los puntos obtenidos: \n ${objetos[0].pin}- ${objetos[0].nombre} - ${objetos[0].precio}PTS - ${objetos[0].informacion}\n ${objetos[1].pin}- ${objetos[1].nombre} - ${objetos[1].precio}PTS - ${objetos[1].informacion} \n \n Elige una de los objetos \n PRESIONA CANCELAR PARA SALIR DE LA TIENDA`);

        console.log(textoTienda);

        if(textoTienda == objetos[0].nombre && puntaje >= objetos[0].precio || textoTienda == 1 && puntaje >= objetos[0].precio){
            alert(`compraste ${objetos[0].nombre}`);
            puntaje -= objetos[0].precio;
            console.log(puntaje);

        }else if(textoTienda == 2 && puntaje >= objetos[1].precio || textoTienda == objetos[1].nombre && puntaje >= objetos[1].precio){
            alert(`compraste ${objetos[1].nombre}`);
            puntaje -= objetos[1].precio;
            console.log(puntaje);

        }else if(textoTienda == 1 && puntaje < objetos[0].precio || textoTienda == objetos[0].nombre && puntaje < objetos[0].precio){
            alert(`No tienes suficientes puntos para comprar el ${objetos[0].nombre}`);
        }
        else if(textoTienda == 2 && puntaje < objetos[1].precio || textoTienda == objetos[1].nombre && puntaje < objetos[1].precio){
            alert(`No tienes suficientes puntos para comprar el ${objetos[1].nombre}`);
        }
        else if(textoTienda == null){
            alert("Saliendo de la tienda");
            break
        }else{
            alert("Introducir el nombre exactamente con mayusculas o en cambio el numero de orden");
        }
    }
}
// const segundoDesafio = () =>{
//     alert("El aventurero sigue por el camino del bosque y se encuentra con un castillo enorme")
// }

const final = () =>{
    alert("El aventurero al salir de la tienda se dio cuanta que ser aventurero no era lo que a el le inspiraba a seguir adelante con su vida. \n\nSe dio la vuelta y volvio para convertirse en un pescador\n\n ¡FIN!")
}

const resultado = () => {
    alert(`Estos fueron tus resultados: \nBuenas decisiones: ${buenasDecisiones} \nMalas decisiones: ${malasDecisiones}\nPuntaje Total: ${puntajeTotal}`);
}

const comenzar = (confirmacion) => {
    confirmacion = confirm("Quieres comenzar la aventura?");
    if(!confirmacion){
        loop = false;
    }
};

const muerte = () =>{
    alert("SU PERSONAJE FALLECIO");
}



const historia = () => {
    comenzar();
    while(loop){
        introduccion();
        primerDesafio();
        if(vidas == 0){
            muerte();
            resultado()
            break;
        }
        tienda();
        final();
        resultado();
        break;
    }
}


historia();