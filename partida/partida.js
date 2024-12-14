import {getCookie,changeCSS} from '../js/cookies.js';

//Cookies
if (getCookie("alto-contraste")=="true"){
    changeCSS("../estilo/alto-contraste/partida-ac.css", 1);
}

if (getCookie("daltonismo")=="true"){
    changeCSS("../estilo/daltonismo/partida-d.css", 1);
}


window.onload = function () {
    const atras = document.getElementById('btnAtras');
    const cajaSalida = document.getElementById('cajaSalida');
    const no_salir = document.getElementById('no_salir');
    const si_salir = document.getElementById('si_salir');
    const fondoSalida = document.getElementById('fondoSalida');
    const jugadores = Array.from(document.getElementsByClassName('jugador'));
    const dado = document.getElementById('dado');
    const casillas = Array.from(document.querySelectorAll('.box'));
    //const preguntaCaja = document.getElementsByClassName('pregunta');
    const preguntaCajaAzul = document.getElementById('cajaPreguntaAzul');
    const preguntaCajaAmarilla = document.getElementById('cajaPreguntaAmarilla');
    const preguntaCajaRoja = document.getElementById('cajaPreguntaRoja');
    const RespuestaCorrecta = document.getElementById('respuestaCorrecta');
    const RespuestaIncorrecta = document.getElementById('respuestaIncorrecta');
    const tituloRespuesta = document.getElementsByClassName('tituloRespuesta')
    const preguntaTexto = document.getElementById('preguntaTexto');
    const respuestaInput = document.getElementById('respuesta');
    //const aceptarBoton = document.getElementsByClassName('aceptar');
    const aceptarBotonAzul = document.getElementById('ubi-button');
    const aceptarBotonAmarilla = document.getElementById('amarillo-button');
    const aceptarBotonRoja = document.getElementById('rojo-button');
    const aceptarCorrecta = document.getElementById('ok-button');
    const aceptarIncorrecta = document.getElementById('notok-button');
    //
    const puntuacion = document.getElementById('puntuacion');
    const puntuacionCaja = document.getElementById('puntuacionCaja');
    const jugadorActualTexto = document.getElementById('jugador');
    const audioDado = new Audio('../audio/Guitarra1Edited.mp3');
    const audioCorrecta = new Audio('../audio/RespuestaCorrecta.m4a');
    const audioIncorrecta = new Audio('../audio/RespuestaIncorrecta.m4a');

    const cajaAyudaUbi = document.getElementById("cajaAyudaUbi");
    const ayudaUbi = document.getElementById("ayudaUbi");
    const volverUbi = document.getElementById("volverUbi");
    let haUsadoAyuda = 0;
    let puntuacionCorrecta = 10;
    //Mapa
    const variacionPermitida = 0.010
    var map = L.map('map');

    //Variables con los colores de css para animar el dado
    const amarillo = getComputedStyle(document.documentElement)
                    .getPropertyValue('--amarillo');
    const azul = getComputedStyle(document.documentElement)
                    .getPropertyValue('--azul');      
    const rojo = getComputedStyle(document.documentElement)
                    .getPropertyValue('--rojo');  
    const colors = [amarillo, azul, rojo];//array de los colores para evitar hacer un switch
    
    let turnoActual = 0;
    let puntajes = [0, 0, 0, 0];
    const preguntas = [
        { texto: "¿Capital de España?", respuesta: "Madrid" },
        { texto: "¿Capital de Francia?", respuesta: "París" },
        { texto: "¿Quién pintó la Mona Lisa?", respuesta: "Leonardo da Vinci" },
        { texto: "¿Cuántos continentes existen?", respuesta: "7" }
    ];
    const debugRoja = document.getElementById("debugRoja");
    const debugAmarilla = document.getElementById("debugAmarilla");
    const debug2 = document.getElementsByClassName("debug2");
    let grados = 69;

    /* FUNCIONES PARA LOS EVENTLISTENERS DE LOS SENSORES, TRAIDO DE /DEV */
    //Agitar el dado
    let handleMotion = (event) => detectarAgitado(event);

    function setMotionListeners() {
        window.addEventListener('devicemotion', handleMotion);
    }
    
    function detectarAgitado(event) {
        if ((Math.abs(event.rotationRate.alpha > 900) || 
            Math.abs(event.rotationRate.beta > 900) || 
            Math.abs(event.rotationRate.gamma > 900))) 
        {
            //window.alert("SE AGITAAAAAAAAA");
            window.removeEventListener('devicemotion', handleMotion);
            tirarDado();
        }
    }
    setMotionListeners();

    let handleOrientacion = (eventData) => orientacion(eventData);
    //Brujula. Roja/rosada
    //let gradosAntes = 0;
    function orientacion(eventData){
        //window.alert("orientacion")
        //direccion a donde apunta el dispositivo
        grados = eventData.alpha;
        //debugRoja.innerText = "alpha: "+grados;
        //Inclinar hacia izquierda o derecha. Hacia la derecha es positivo
        let IzqDer = eventData.gamma;

        //Inclinar hacia arriba o abajo. Hacia arriba es positivo
        let ArrAba = eventData.beta;

        if (IzqDer+ArrAba > 20 ){
            debugRoja.innerText = "TIP: Mantén el dispositivo sin inclinar"+IzqDer+" "+ArrAba;
        } 
        else{
            debugRoja.innerText = "";

        }
        if (   (grados < 5 && grados > 355) 
            || (grados < 275 && grados >265) 
            || (grados < 95 && grados > 85) 
            || (grados < 185 && grados > 175)
        ){
            window.navigator.vibrate(60);
        } 
        /*if (Math.abs(gradosAntes-grados)>20){
            window.navigator.vibrate(30);
        }*/
        //gradosAntes = grados
        debug2[0].innerText = "Grados: "+grados;
        debug2[1].innerText = "Grados: "+grados;
    }

    //Reconocimiento de voz. Amarilla
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = false; //Nose que es, pero funciona
    recognition.lang = "en-US";
    recognition.addEventListener("result", (textoReconocido) => {
        console.log(textoReconocido);
        debugAmarilla.innerHTML = textoReconocido.results[textoReconocido.results.length - 1][0].transcript;
        setTimeout(() => {
            aceptarRespuestaAmarillo(textoReconocido.results[textoReconocido.results.length - 1][0].transcript);
        }, 200);
        //Con el + se añade a lo que ya estaba las nuevas palabras, sin el + se sustituye
        });
    //La ubicacion (Azul) va de otra manera, no necesita eventListener

    aceptarBotonRoja.addEventListener('click', function(){aceptarRespuestaRojo()});
    aceptarBotonAzul.addEventListener('click', function(){
        navigator.geolocation.getCurrentPosition((position) => {aceptarRespuestaAzul(position)});
    });
    aceptarBotonAmarilla.addEventListener('click', function(){recognition.start()});

    //* ******************************* */
    // Evento de retroceder
    atras.addEventListener('click', () => {
        cajaSalida.classList.add('visible');
        fondoSalida.classList.add('visible');
        window.navigator.vibrate([30, 50, 30]);
    });

    // Si no quiere salir
    no_salir.addEventListener('click', () => {
        cajaSalida.classList.remove('visible');
        fondoSalida.classList.remove('visible');
    });

    fondoSalida.addEventListener('click', () => {
        cajaSalida.classList.remove('visible');
        fondoSalida.classList.remove('visible');
    });

    // Si quiere salir, redirige a la página anterior
    si_salir.addEventListener('click', () => {
        document.querySelector('body').style.background = '#b3e5fc';
        document.querySelector('body').style.opacity = 0;
        setTimeout(function() { 
            window.location.href = '../index.html';
        }, 200);
    });

    // Botones para ayuda ubi y volver
    ayudaUbi.addEventListener('click', () => {
        //window.alert("evento click")
        if (haUsadoAyuda < 1){
        
            navigator.geolocation.getCurrentPosition((position) => {
                //Poner el mapa en una ubicacion cercana a la actual
                let lat = position.coords.latitude + Math.random() * variacionPermitida;
                let lon = position.coords.longitude + Math.random() * variacionPermitida
                map.setView([lat, lon], 23);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);
                  //Circulo en el mapa
                var circle = L.circle([lat, lon], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(map);
                circle.bindPopup("Se encuentra en esta zona");
            });
            haUsadoAyuda = 1;
            //window.alert(haUsadoAyuda)
            ayudaUbi.setAttribute("disabled", "true");
            setTimeout(function() {
                preguntaCajaAzul.classList.remove('visible');
                cajaAyudaUbi.classList.add('visible');
            }, 200);
        }
    });
    //volver a la pregunta
    volverUbi.addEventListener('click', () => {
        setTimeout(function() {
            cajaAyudaUbi.classList.remove('visible');
            preguntaCajaAzul.classList.add('visible');
        }, 200);
    });

    // Inicialización: asegurar que todas las casillas se vean normales
    function inicializarCasillas() {
        casillas.forEach(casilla => {
            casilla.classList.remove('gris', 'clicable');
        });
        dado.classList.add('clicable');
    }

    // Función para el siguiente turno
    function siguienteTurno() {
        jugadores[turnoActual].querySelector('.indicador').classList.remove('act');
        turnoActual = (turnoActual + 1) % jugadores.length;
        jugadores[turnoActual].querySelector('.indicador').classList.add('act');
        jugadorActualTexto.innerText = `Jugador ${turnoActual + 1}`;
        puntuacion.innerText = `${puntajes[turnoActual]} ptos`;
    }

    // Función para tirar el dado
    function tirarDado() {
        if (!dado.classList.contains('clicable')) {
            return; // Ignorar clic 
        }

        dado.classList.add('seleccionando');
        
        let iteraciones = 13;
        let iteracionActual = 0;
        let ultimoColor = null;
        
        function cambiarColor() {
            if (iteracionActual >= iteraciones) {
                audioDado.play();
                switch(ultimoColor){
                    case amarillo:
                        destacarCasillas("amarillo");
                        break;
                    case azul:
                        destacarCasillas("azul");
                        break;
                    case rojo:
                        destacarCasillas("rojo");
                        break;
                    default:
                        destacarCasillas("ERROR");
                }
                dado.classList.remove('seleccionando');
                dado.style.backgroundColor = rojo;//Para reestaurar apariencia original
                return;
            }
            
            window.navigator.vibrate(30);

            const coloresDisponibles = colors.filter(color => color !== ultimoColor);
            const colorRandom = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
            dado.style.backgroundColor = colorRandom;
            ultimoColor = colorRandom;
            //ultimoColor = poner color para hacer pruebas;
            iteracionActual++;
            // Calcular retraso nuevo
            const retraso = 10 + (iteracionActual/4 * 50) * iteracionActual/4;
            //Llamada recursiva en la que aumentamos el retraso
            setTimeout(cambiarColor, retraso);
        }

        function destacarCasillas(colorElegido){
            //alert(`Color obtenido: ${colorElegido.toUpperCase()}`);
            casillas.forEach(casilla => {
                if (casilla.classList.contains(colorElegido)) {
                    casilla.classList.add('clicable'); // Habilitar
                } else {
                    casilla.classList.add('gris'); // Deshabilitar
                }
            });
            dado.classList.remove('clicable');
        }
    
        cambiarColor();
        inicializarCasillas();
    }

    // Función para manejar la selección de una casilla
    function seleccionarCasilla(event) {
        var color;
        var aceptarBoton;
        const casilla = event.target.closest('.box');
        if (!casilla || !casilla.classList.contains('clicable')) {
            return; // Ignorar clic en casillas no válidas
        }
        function volverAPartida(){
            fondoSalida.classList.remove('visible');
            preguntaCajaAmarilla.classList.remove('visible');
            preguntaCajaAzul.classList.remove('visible');
            preguntaCajaRoja.classList.remove('visible');
            RespuestaCorrecta.classList.remove('visible');
            RespuestaIncorrecta.classList.remove('visible');
            aceptarCorrecta.RemoveEventListener('click', volverAPartida); //Para mejorar rendimiento pagina
            aceptarIncorrecta.RemoveEventListener('click', volverAPartida);
        }
        aceptarCorrecta.addEventListener('click', volverAPartida);
        aceptarIncorrecta.addEventListener('click', volverAPartida);

        color = casilla.classList[1]
        switch (color){
            case 'amarillo':
                preguntaCajaAmarilla.classList.add('visible');
                fondoSalida.classList.add('visible');
                break;
            case 'rojo':
                preguntaCajaRoja.classList.add('visible');
                fondoSalida.classList.add('visible');
                window.addEventListener('deviceorientationabsolute', handleOrientacion);
                break;
            case 'azul':
                preguntaCajaAzul.classList.add('visible');
                fondoSalida.classList.add('visible');
                break;
        }
    }

    function aceptarRespuestaAzul(position){
        tituloRespuesta[0].innerText = 'Ubicacion';
        tituloRespuesta[1].innerText = 'Ubicacion';

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        const latesperada = 39.394363;
        const lonesperada = -3.2189677;

        if ((latitude<latesperada+variacionPermitida && latitude>latesperada-variacionPermitida) 
                && (longitude<lonesperada+10 && longitude>lonesperada-10)){
            window.alert(Math.floor(((latitude-latesperada) + (longitude-lonesperada))/2))
            puntajes[turnoActual] += puntuacionCorrecta;
            puntuacion.innerText = `${puntajes[turnoActual]} ptos`;
            puntuacionCaja.innerText = `+ ${puntuacionCorrecta} ptos`;
            RespuestaCorrecta.classList.add('visible');
            debug2[0].innerText = "latitud: "+latitude+" longitud: "+longitude;
            setTimeout(function() {
                //AUDIO CORRECTO
                audioCorrecta.play();
                window.navigator.vibrate([30, 50, 30]);
                //alert('Respuesta correcta!');
            }, 300);

        } else {
            //AUDIO INCORRECTO
            RespuestaIncorrecta.classList.add('visible');
            debug2[1].innerText = "latitud: "+latitude+" longitud: "+longitude;
            audioIncorrecta.play();
            window.navigator.vibrate([500]);
        }
        
        ayudaUbi.removeAttribute("disabled");
        haUsadoAyuda = 0;
        siguienteTurno();

        // Restaurar casillas para el siguiente turno
        inicializarCasillas();
        setMotionListeners();
    };


    function aceptarRespuestaRojo() {
        //window.alert("Listener boton"+grados)
        tituloRespuesta[0].innerText = 'Orientacion';
        tituloRespuesta[1].innerText = 'Orientacion';

        //if (respuesta.toLowerCase() === pregunta.respuesta.toLowerCase()) {
        if (grados<60 || grados>300){
            window.alert(turnoActual,puntajes[turnoActual]);
            if(grados < 30 || grados > 330){
                puntuacionCorrecta = 10;
            }
            else{
                puntuacionCorrecta = 5;
                
            }
            puntajes[turnoActual] += puntuacionCorrecta;
            puntuacion.innerText = `${puntajes[turnoActual]} ptos`;
            puntuacionCaja.innerText = `+ ${puntuacionCorrecta} ptos`;
            RespuestaCorrecta.classList.add('visible');
            setTimeout(function() {
                //AUDIO CORRECTO
                audioCorrecta.play();
                window.navigator.vibrate([30, 50, 30]);
                //alert('Respuesta correcta!');
            }, 300);

        } else {
            //AUDIO INCORRECTO
            RespuestaIncorrecta.classList.add('visible');
            audioIncorrecta.play();
            window.navigator.vibrate([500]);
            //alert('Respuesta incorrecta!');
        }

        window.removeEventListener('deviceorientationabsolute', handleOrientacion)
        preguntaCajaRoja.classList.remove('visible');
        //aceptarBotonRoja.removeEventListener('click', aceptarRespuestaRojo);
   
        siguienteTurno();

        // Restaurar casillas para el siguiente turno
        inicializarCasillas();
        setMotionListeners();
    };

    function aceptarRespuestaAmarillo(textoReconocido) {
        tituloRespuesta[0].innerText = 'Pronunciación';
        tituloRespuesta[1].innerText = 'Pronunciación';

        //if (respuesta.toLowerCase() === pregunta.respuesta.toLowerCase()) {
        if (textoReconocido == "hello"){
            puntuacionCorrecta = 10;
            puntajes[turnoActual] += puntuacionCorrecta;
        
            puntuacion.innerText = `${puntajes[turnoActual]} ptos`;
            puntuacionCaja.innerText = `+ ${puntuacionCorrecta} ptos`;
            RespuestaCorrecta.classList.add('visible');
            window.alert(turnoActual,puntajes[turnoActual]);
            setTimeout(function() {
                //AUDIO CORRECTO
                audioCorrecta.play();
                window.navigator.vibrate([30, 50, 30]);
                //alert('Respuesta correcta!');
            }, 300);

        } else {
            //AUDIO INCORRECTO
            RespuestaIncorrecta.classList.add('visible');
            audioIncorrecta.play();
            window.navigator.vibrate([500]);
            //alert('Respuesta incorrecta!');
        }

        preguntaCajaRoja.classList.remove('visible');
        //aceptarBotonRoja.removeEventListener('click', aceptarRespuestaRojo);
   
        siguienteTurno();

        // Restaurar casillas para el siguiente turno
        inicializarCasillas();
        setMotionListeners();//Inicializar evento de agitar
    };


    // Agregar eventos
    dado.addEventListener('click', tirarDado);
    casillas.forEach(casilla => casilla.addEventListener('click', seleccionarCasilla));

    // Inicialización de la partida
    inicializarCasillas();
    document.querySelector('body').style.opacity = 1;
};



