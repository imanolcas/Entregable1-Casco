
let vidas = 1;

let click = false;

const divPrincipal = document.getElementById("principal")
const nombre = document.getElementById("nombre");
const formulario = document.getElementById("informacion");


let buenasDecisiones = 0;
let malasDecisiones = 0;

let puntajeUser = 0;
let puntajeTotal = 0;
sessionStorage.setItem("puntaje", puntajeUser)

// se crea la funcion para guardar el usuario
const guardarUsuario = function(valorNombre){
    // se guarda el nombre en el sessionstorage
    sessionStorage.setItem("nombre", valorNombre)

    // se crea la clase usuario
    let usuario = {
        nombre : valorNombre,
        puntaje : "",
        inventario: ""
    }
    
    const usuarioJSON = JSON.stringify(usuario);

    // se guarda el usuario en el localstorage
    localStorage.setItem(`${valorNombre}`, usuarioJSON );

} 

// se crea la funcion para guardar el resultado
const guardarResultado = function(numeroDesafio, valorResultado){
    // se guarda los resultados en el sessionstorage
    sessionStorage.setItem(`${numeroDesafio}`, valorResultado)
}

// se crea la funcion para sumar los puntos en el LocalStorage y en los demas valores locales
const sumarPuntos = (puntos) => {
    puntajeUser += puntos ;
    puntajeTotal += puntos;
    let nombre = sessionStorage.getItem("nombre");
    let usuarioJSON = localStorage.getItem(nombre);
    let usuario = JSON.parse(usuarioJSON);

    // se guarda el puntaje en el SessionStorage
    sessionStorage.setItem("puntaje", puntajeUser);
    
    // si no es un numero el puntaje se cambia a cero
    if(isNaN(usuario.puntaje)){
        usuario.puntaje = 0
    }
    
    // se establece el puntaje del localStorage con el valor que tenga puntajeUser
    usuario.puntaje = puntajeUser 

    //se guarda el usuario actualizado 
    localStorage.setItem(nombre, JSON.stringify(usuario))
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

    // se sacan los valores del DOM
    let nombre = document.getElementById("nombre");
    const formulario = document.getElementById("informacion");
    const textoMostrar = document.getElementById("mostrar");


    // se crea un evento al presionar enter
    formulario.addEventListener("submit", (e) => {
        // se evita el reinicio
        e.preventDefault();
        // se establece el nombre del valor puesto por el usuario
        nombre = nombre.value;
        // se guarda
        guardarUsuario(nombre);
        primerDesafio();
    });

    
    

    const botonSiguiente = document.getElementById("siguiente");
    // se crea un evento al presionar el boton "siguiente"(se podia meter el boton en el form y ponerle un type="submit"?? si)
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
            <li>1 - En el camino de la derecha se encuentra un leon muerto de hambre</li> 
            <li>2 - En el camino del medio hay un camino lleno de plantas venenozas</li> 
            <li>3 - En el camino de la izquierda se encuentra custodiado por tres golems</li>
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
    

    // se buscan todos los input con el nombre "respuestaDesUno"
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
                ${nombreUsuarioSession} avanza por el camino de la derecha se encuentra al leon muerto de hambre y como estaba muerto pasa tranquilamente   
            </p>
            
            <button id="siguienteBasico">
                siguiente
            </button>
            </div>`

            const siguienteBasico = document.getElementById("siguienteBasico")

            buenasDecisiones++;
            sumarPuntos(50)
            const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            background: "#252624",
                            color: "#fff",
                            didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: `Consigues 50 puntos`
                        });
            siguienteBasico.addEventListener("click", () =>{
                tienda()
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
                divPrincipal.innerHTML=`<div id="seccion">
                <p>${nombreUsuarioSession} al tener la pocion consigue sobrevivir</p>
                <button id="siguiente">
                    Siguiente
                </button>
                </div>`
                
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
    let nombreUsuarioSession = sessionStorage.getItem("nombre")
    let puntajeUserSession = sessionStorage.getItem("puntaje")
    divPrincipal.innerHTML=`
            <span class="puntaje">Puntaje: ${puntajeUserSession}</span> 
            <p>Que objetos quieres comprar con los puntos obtenidos:</p> 
            <ol id="textoObjetos"></ol> 
            <form id="formObjetos">
                Elige un objeto:
                <div id="inputObjetos" class="objetos"></div>
                <div id="radioObjetos" class="radioObjs"></div>
                <button type="submit" id="comprar">Comprar</button>
            </form>
            <button id="salir">SALIR</button>
        `;

    const textoObjetos = document.getElementById("textoObjetos")
    const inputObjetos = document.getElementById("inputObjetos")
    const radioObjetos = document.getElementById("radioObjetos")
    let objetosElemento = {}

    const mostrarObjetos = (ArrayObjetos) => {

            textoObjetos.innerHTML = ""
            inputObjetos.innerHTML = ""
            radioObjetos.innerHTML = ""

            // se obtienen los objetos del array
            ArrayObjetos.forEach(objetoItem =>{

                const {pin: pinObj, nombre: nombreObj, precio: precioObj, informacion: informacionObj} = objetoItem

                const li = document.createElement("li")

                li.innerHTML = `
                <div>
                    ${pinObj} - ${nombreObj} - ${precioObj}PTS - ${informacionObj}
                </div>
                `
                inputObjetos.appendChild(li)

                const radio = document.createElement(`input`)
                radio.type = "radio"
                radio.value = `${nombreObj}`
                radio.name = "objetoRadio";
                radio.checked = true;
                radio.id = `respuesta_${pinObj}`
                
                radioObjetos.appendChild(radio)

                const label = document.createElement("label")
                label.for = `respuesta_${pinObj}`
                label.innerText = `${pinObj}`
                radioObjetos.appendChild(label)
            })
    }

    // se hace una funcion asincrona para usar el valor await y asi el fetch
    const funcionTienda = async() =>{

        // se obtiene los datos de el archivo .json
        const rta = await fetch("../objetos.json");


        const data = await rta.json();
        mostrarObjetos(data);

        
        let formObjetos = document.getElementById("formObjetos")
        formObjetos.addEventListener("submit", (e) => {

            e.preventDefault()


            let resultado = document.querySelector(`input[name="objetoRadio"]:checked`).value
            sessionStorage.setItem("compra", resultado)

            let usuarioLocalStr = localStorage.getItem(nombreUsuarioSession)   
            let usuarioLocal = JSON.parse(usuarioLocalStr);
            let puntajeLocal = localStorage.getItem(nombreUsuarioSession.puntaje)


            let guardarObjeto = (precio) =>{
                // if si el inventario no es un array este lo convierte en uno
                if (!Array.isArray(usuarioLocal.inventario)) {
                    usuarioLocal.inventario = [];
                }  

                // introduce el objeto comprado al inventario
                usuarioLocal.inventario.push(resultado);

                // se actualiza el usuario con la compra
                localStorage.setItem(nombreUsuarioSession, JSON.stringify(usuarioLocal));

                // se agrega la funcion sumarPuntos para que acortar el codigo y restar lo que vale el objeto
                sumarPuntos(-precio)

            }



                if(resultado == data[0].nombre && puntajeUser >= data[0].precio){
                
                    guardarObjeto(data[0].precio)

                    Swal.fire({
                        icon: "success",
                        title: "Compra exitosa",
                        color: "#fff",
                        background: "#252624",
                        keydownListenerCapture: "esc",
                    });
                    // se actualiza la tienda
                    tienda()
                    
                }else if(resultado == data[1].nombre && puntajeUser >= data[1].precio){

                    guardarObjeto(-data[1].precio)

                    Swal.fire({
                        icon: "success",
                        title: "Compra exitosa",
                        color: "#fff",
                        background: "#252624",
                        keydownListenerCapture: "esc",
                    });

                    tienda()

                }else if(resultado == data[2].nombre && puntajeUser >= data[2].precio){

                    guardarObjeto(-data[2].precio)
                    Swal.fire({
                        icon: "success",
                        title: "Compra exitosa",
                        color: "#fff",
                        background: "#252624",
                        keydownListenerCapture: "esc",
                    });
                    tienda()
                }
                else if(resultado == data[0].nombre && puntajeUser < data[0].precio){
                    Swal.fire({
                        icon: "error",
                        title: "No tienes suficientes puntos",
                        color: "#fff",
                        background:"#252624",
                        keydownListenerCapture: "esc"
                    });

                }
                else if(resultado == data[1].nombre && puntajeUser < data[1].precio){
                    Swal.fire({
                        icon: "error",
                        title: "No tienes suficientes puntos",
                        color: "#fff",
                        background: "#252624",
                        keydownListenerCapture: "esc",
                    });
                }
                else if(resultado == data[2].nombre && puntajeUser < data[2].precio){
                    Swal.fire({
                        icon: "error",
                        title: "No tienes suficientes puntos",
                        color: "#fff",
                        background: "#252624",
                        keydownListenerCapture: "esc",
                    });
                }
        });
    }
    funcionTienda()
        
        let botonSalir = document.getElementById("salir")
        botonSalir.addEventListener("click", (e) =>{
            e.preventDefault
            final()
        })
}
    

    // const segundoDesafio = () =>{
    //     alert("El aventurero sigue por el camino del bosque y se encuentra con un castillo enorme")
    // }

const final = () =>{
    divPrincipal.innerHTML = `
    <div id="final">
        <p>
            El aventurero al pasar despues de las adversidades se dio cuanta que ser aventurero no era lo que a el le inspiraba a seguir adelante con su vida. \n\nSe dio la vuelta y volvio para convertirse en un pescador\n\n ¡FIN!
        </p>
        <button id="botonResultado">Resultado</button>  
    </div>`
    const botonResultado = document.getElementById("botonResultado")
    botonResultado.addEventListener("click", ()=>{
        resultado()
    })
}

const resultado = () => {
    divPrincipal.innerHTML = `
    <div id="final">
        <h3>
            Estos fueron tus resultados: 
        </h3>
         <ul id="ulResultados">
            <li>Buenas decisiones: ${buenasDecisiones}</li> 
            <li> Malas decisiones: ${malasDecisiones}</li> 
            <li> Puntaje Total: ${puntajeTotal}</li>
         </ul>
        
    </div>`;
}

nombreAventurero()