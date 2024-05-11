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


const guardarUsuario = function(valorNombre){
    sessionStorage.setItem("nombre", valorNombre)


    let usuario = {
        nombre : valorNombre,
        puntaje : 0,
        inventario: ""
    }
    
    const usuarioJSON = JSON.stringify(usuario);

    localStorage.setItem(`${valorNombre}`, usuarioJSON );

} 

const guardarResultado = function(numeroDesafio, valorResultado){
    sessionStorage.setItem(`${numeroDesafio}`, valorResultado)
}


const sumarPuntos = (puntos) => {
    let nombre = sessionStorage.getItem("nombre")
    let usuarioJSON = localStorage.getItem(nombre)
    let usuario = JSON.parse(usuarioJSON)
    console.log(sumarPuntos)
    if (usuario.puntaje === null || isNaN(usuario.puntaje)) {
        localStorage.setItem("puntaje", puntos.toString());
    } else {
        usuario.puntaje += puntos; 
        localStorage.setItem(nombre, JSON.stringify(usuario));
    }
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



const primerDesafio = (respuestaPrimerDesafio) => {
    
    nombreUsuarioSession = sessionStorage.getItem("nombre");
    
    divPrincipal.innerHTML = `<div id="seccion">
    <h2>Primer capitulo</h2>
    <p>
        ${nombreUsuarioSession} tras salir de su hogar en busca de desafios se adentro en un bosque donde a la hora de caminata se encuentra tres caminos 
        </p>
        <ol>
        <li>En el camino de la derecha se en cuentra un leon muerto de hambre</li> 
        <li>En el camino del medio hay un camino lleno de plantas venenozas</li> 
        <li>En el camino de la izquierda se encuentra custodiado por tres golems</li>
        </ol>

        <form id="respuestasFormUno">
            <fielset>
                <span>¿Que camino deberia tomar?</span>

                <div>
                    <input type="radio" name="respuestaDesUno" id="respuestaUno" value="1">
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
            <div id="seccion">
            <p>
                ${nombreUsuarioSession} avanza por el camino de la derecha se encuentra al leon muerto de hambre y como estaba muerto pasa tranquilamente \n ganas 50 puntos    
            </p>
            
            <button id="siguienteBasico">
                siguiente
            </button>
            </div>`

            const siguienteBasico = document.getElementById("siguienteBasico")

            buenasDecisiones++;
            puntajeTotal += 50;
            puntajeUser += 50;
            sumarPuntos(50)

            siguienteBasico.addEventListener("click", () =>{
                final()
            })
            
        }else if(resultadoDesUnoSS == 2){
            vidas--;
            malasDecisiones++;
            divPrincipal.innerHTML=`<div id="seccion"><p>${nombreUsuarioSession} avanza por el camino de la izquierda enfrentandose a los tres golems y como no tenia armas, y asi termina MURIENDO</p>
                        <button id="resultado">
                            Siguiente
                        </button>
                        </div>`;

            const resultadosBoton = document.getElementById("resultado")
            resultadosBoton.addEventListener("click", () =>{
            if(vidas == 0){
            
                resultado()
            

            }else{
                divPrincipal.innerHTML=`<div id="seccion"><p>${nombreUsuarioSession} al tener la pocion consigue sobrevivir</p>
                <button id="siguiente">
                    Siguiente
                </button>`
                const siguiente = document.getElementById("siguiente")
                siguiente.addEventListener("click", () => {
                    tienda()
                })
            }
        })

        }else if(resultadoDesUnoSS == 3){
            vidas--;
            malasDecisiones++;
            divPrincipal.innerHTML=`<div id="seccion"><p>${nombreUsuarioSession} avanza por el camino de la izquierda enfrentandose a los tres golems y como no tenia armas, y asi termina MURIENDO</p>
            <button id="siguiente">
                Siguiente
            </button>
            </div>`;
            const siguienteBoton = document.getElementById("siguiente")
            siguienteBoton.addEventListener("click", () =>{
            if(vidas == 0){
                resultado()
            }else{
                divPrincipal.innerHTML=`<div id="seccion"><p>${nombreUsuarioSession} al tener la pocion consigue sobrevivir</p>
                    <button id="siguiente">
                        Siguiente
                    </button>`
                const siguiente = document.getElementById("siguiente")
                siguiente.addEventListener("click", () => {
                    tienda()
                })
            }

        });
    }
    
})
}

const tienda = () => {
    const objetos = [
        {pin: 1, nombre:"Amuleto", precio: 80, informacion: "aumenta la cantidad de puntos obtenidos"},
        {pin: 2, nombre: "Pocion", precio: 100, informacion:"1HP"},
        {pin: 3, nombre: "Espada", precio: 150, informacion:"te permite pasar sobre los desafios donde el camino es evitado por monstruos lv1"}
    ];
    
    
    divPrincipal.innerHTML=`
            <span class="puntaje">Puntaje: ${puntajeUser}</span> <p>Que objetos quieres comprar con los puntos obtenidos:</p> 
            <ol id="textoObjetos"></ol> Elige un objeto:
            <div id="inputObjetos" class="objetos">
            </div> 
            <button id="comprar">Comprar</button>
            <button id="salir">SALIR</button>
        `;

    const textoObjetos = document.getElementById("textoObjetos")
    const inputObjetos = document.getElementById("inputObjetos")

    const mostrarObjetos = () => {
        for(i = 0; i < objetos.length; i++){
            textoObjetos.innerHTML += `<li>${objetos[i].nombre} - ${objetos[i].precio}PTS - ${objetos[i].informacion}</li>`
        }

        for(i = 0; i < objetos.length; i++){
            inputObjetos.innerHTML += `<input type="radio" name="objetoRadio" id="respuesta ${i + 1}" value="${objetos[i].nombre}" checked>
                                        <label for="respuesta ${i + 1}"> ${i + 1} </label>`
        }
        
    }
    mostrarObjetos()
    
    // const guardarCompra = function(numeroDesafio, valorResultado){
    //     sessionStorage.setItem(`${numeroDesafio}`, valorResultado)
    // }
    
    guardarCompra(localStorage.inventario.setItem())
    // document.querySelectorAll('input[name="objetoRadio"]').forEach((elem) => {
    //     elem.addEventListener("change", (e) => {
    //         let resultado = 1;
    //         resultado = e.target.value;
    //         guardarCompra("Desafio 1", resultado)
    //     });
    // });



        // if(textoTienda == objetos[0].nombre && puntaje >= objetos[0].precio || textoTienda == 1 && puntaje >= objetos[0].precio){
        //     alert(`compraste ${objetos[0].nombre}`);
        //     puntaje -= objetos[0].precio;
        //     console.log(puntaje);

        // }else if(textoTienda == 2 && puntaje >= objetos[1].precio || textoTienda == objetos[1].nombre && puntaje >= objetos[1].precio){
        //     alert(`compraste ${objetos[1].nombre}`);
        //     puntaje -= objetos[1].precio;
        //     console.log(puntaje);

        // }else if(textoTienda == 1 && puntaje < objetos[0].precio || textoTienda == objetos[0].nombre && puntaje < objetos[0].precio){
        //     alert(`No tienes suficientes puntos para comprar el ${objetos[0].nombre}`);
        // }
        // else if(textoTienda == 2 && puntaje < objetos[1].precio || textoTienda == objetos[1].nombre && puntaje < objetos[1].precio){
        //     alert(`No tienes suficientes puntos para comprar el ${objetos[1].nombre}`);
        // }
        // else if(textoTienda == null){
        //     alert("Saliendo de la tienda");
            
        // }else{
        //     alert("Introducir el nombre exactamente con mayusculas o en cambio el numero de orden");
        // }
    }

    // tienda();

// const segundoDesafio = () =>{
//     alert("El aventurero sigue por el camino del bosque y se encuentra con un castillo enorme")
// }

const final = () =>{
    divPrincipal.innerHTML = `<div><p>El aventurero al pasar despues de las adversidades se dio cuanta que ser aventurero no era lo que a el le inspiraba a seguir adelante con su vida. \n\nSe dio la vuelta y volvio para convertirse en un pescador\n\n ¡FIN!</p><button id="botonResultado">resultado</button></div>`
    const botonResultado = document.getElementById("botonResultado")
    botonResultado.addEventListener("click", ()=>{
        resultado()
    })
}

const resultado = () => {
    divPrincipal.innerHTML = `<div>
    <p>Estos fueron tus resultados: <ul>Buenas decisiones: ${buenasDecisiones} Malas decisiones: ${malasDecisiones} Puntaje Total: ${puntajeTotal}</p>
    </div>`;
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
    if(vidas == 0){
        muerte()
    }
    
}
nombreAventurero()

