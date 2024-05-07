let vidas = 1;

let loop = true;
let click = false;

const divPrincipal = document.getElementById("principal")
const nombre = document.getElementById("nombre");
const formulario = document.getElementById("informacion");


let buenasDecisiones = 0;
let malasDecisiones = 0;

let puntajeUser = 0;
let puntajeTotal = 0;

// let objetos

const confirmacion = (funcion) => {
    click = true;
    if(click === true){
        funcion
    };
}


const guardarUsuario = (valorNombre) =>{
    let nombreUsuario = valorNombre
    sessionStorage.setItem("nombre", nombreUsuario)


    const usuario = {
        nombre: nombreUsuario,
        puntaje: puntajeUser,
        inventario: ""
    }
    
    const usuarioJSON = JSON.stringify(usuario);

    localStorage.setItem(`${nombreUsuario}`, usuarioJSON );

} 

const guardarResultado = function(numeroDesafio, valorResultado){
    
    sessionStorage.setItem(`${numeroDesafio}`, valorResultado)
}

const siguienteBasico = (funcion) =>{ 
    siguienteBasico.addEventListener("click", () =>{ 
    funcion
});
}

const nombreAventurero = () => {

    divPrincipal.innerHTML = `

    <p>
    En un mundo de fantasía donde la magia fluía como los ríos y las criaturas místicas poblaban los bosques, había un intrépido aventurero llamado:
    </p>
    <form action="" id="informacion">
        <input type="text" id="nombre" required>
    </form>
    <button id="siguiente">
            siguiente
    </button>`

    let nombre = document.getElementById("nombre");
    const formulario = document.getElementById("informacion");
    const textoMostrar = document.getElementById("mostrar");
    
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        nombre = nombre.value;
        guardarUsuario(nombre);
        primerDesafio();
    });

    
    

    const botonSiguiente = document.getElementById("siguiente");
    botonSiguiente.addEventListener("click", (e) =>{ 
        e.preventDefault();
        nombre = nombre.value;
        guardarUsuario(nombre);
        primerDesafio();
    });
    
    
}

nombreAventurero()

const primerDesafio = (respuestaPrimerDesafio) => {
    
    nombreUsuarioSession = sessionStorage.getItem("nombre");
    
    divPrincipal.innerHTML = `
    <h2>Primer capitulo<h2>
    <p>
        ${nombreUsuarioSession} tras salir de su hogar en busca de desafios se adentro en un bosque donde a la hora de caminata se encuentra tres caminos </p> 
        <ol>
        <li>En el camino de la derecha se en cuentra un leon muerto de hambre</li> 
        <li>En el camino del medio hay un camino lleno de plantas venenozas</li> 
        <li>En el camino de la izquierda se encuentra custodiado por tres golems</li>
        </ol>

    <div>
        <form id="respuestasFormUno">
            <fielset>
                <span>¿Que camino deberia tomar?</span>

                <div>
                    <input type="radio" name="respuestaDesUno" id="respuestaUno" value="1" checked>
                    <label for="respuestaUno">1</label>
                    <input type="radio" name="respuestaDesUno" id="respuestaDos" value="2">
                    <label for="respuestaDos">2</label>
                    <input type="radio" name="respuestaDesUno" id="respuestaTres" value="3">
                    <label for="respuestaTres">3</label>
                </div>
                <button type="submit" id="siguiente">
                    siguiente
                </button>
            </fielset>
        </form>
    </div>
    `
    

    document.querySelectorAll('input[name="respuestaDesUno"]').forEach((elem) => {
        elem.addEventListener("change", (e) => {
            let resultado = 1;
            resultado = e.target.value;
            guardarResultado("Desafio 1", resultado)
        });
    });

    const botonSiguiente = document.getElementById("siguiente");
    botonSiguiente.addEventListener("click", (e) =>{
        e.preventDefault();
        let resultadoDesUnoSS = 1;
        resultadoDesUnoSS = sessionStorage.getItem("Desafio 1");
        
        if(resultadoDesUnoSS == 1){
            divPrincipal.innerHTML=`
            <div>
                ${nombreUsuarioSession} avanza por el camino de la derecha se encuentra al leon muerto de hambre y como estaba muerto pasa tranquilamente \n ganas 50 puntos    
            </div>
            <button id="siguienteBasico">
                siguiente
            </button>`

            const siguienteBasico = document.getElementById("siguienteBasico")

            buenasDecisiones++;
            puntajeTotal += 50;
            puntajeUser += 50;
            siguienteBasico.addEventListener("click", () =>{
                final()
            })
            
        }else if(resultadoDesUnoSS == 2){
            divPrincipal.innerHTML=`${nombreUsuarioSession} avanza por el camino del medio intentando evitar las plantas pero se descuida y respira las esporas venenozas, y asi termina MURIENDO`;
            vidas--;
            malasDecisiones++;
        }else if(resultadoDesUnoSS == 3){
            divPrincipal.innerHTML=`<div>${nombreUsuarioSession} avanza por el camino de la izquierda enfrentandose a los tres golems y como no tenia armas, y asi termina MURIENDO</div>`;
            vidas--;
            malasDecisiones++;
        }

    })
    
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

    // alert("El aventurero encuentra una tienda y se adentra en ella"); 

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
    divPrincipal.innerHTML = "<div>El aventurero al salir de la tienda se dio cuanta que ser aventurero no era lo que a el le inspiraba a seguir adelante con su vida. \n\nSe dio la vuelta y volvio para convertirse en un pescador\n\n ¡FIN!</div>"
}

const resultado = () => {
    divPrincipal.innerHTML = `Estos fueron tus resultados: \nBuenas decisiones: ${buenasDecisiones} \nMalas decisiones: ${malasDecisiones}\nPuntaje Total: ${puntajeTotal}`;
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
    nombreAventurero();
    primerDesafio();
    if(vidas == 0){
        muerte()
    }
    
}


// const historia = () => {
    // comenzar();
    // while(loop){
    //     introduccion();
    //     primerDesafio();
    //     if(vidas == 0){
    //         muerte();
    //         resultado()
    //         break;
    //     }
    //     tienda();
    //     final();
    //     resultado();
    //     break;
//     }
// }

// historia();