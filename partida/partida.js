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
    const debug = document.getElementById("debug");
    const debug2 = document.getElementsByClassName("debug2");
    let grados = 69;

    //FUNCIONES PARA LOS EVENTLISTENERS DE LOS SENSORES, TRAIDO DE /DEV
    function orientacion(eventData){
        //window.alert("orientacion")
        //direccion a donde apunta el dispositivo
        grados = eventData.alpha;
        debug.innerText = "alpha: "+grados;
        //Inclinar hacia izquierda o derecha. Hacia la derecha es positivo
        let IzqDer = eventData.gamma;
        //Inclinar hacia arriba o abajo. Hacia arriba es positivo
        let ArrAba = eventData.beta;

    }
    aceptarBotonRoja.addEventListener('click', function(){aceptarRespuestaRojo()});
    aceptarBotonAzul.addEventListener('click', function(){
        navigator.geolocation.getCurrentPosition((position) => {aceptarRespuestaAzul(position)});
    });


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
            ultimoColor = azul;
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

        color = casilla.classList[1]
        switch (color){
            case 'amarillo':
                preguntaCajaAmarilla.classList.add('visible');
                
                break;
            case 'rojo':
                preguntaCajaRoja.classList.add('visible');
                fondoSalida.classList.add('visible');
                window.addEventListener('deviceorientationabsolute', (event) => {orientacion(event);});
                break;
            case 'azul':
                preguntaCajaAzul.classList.add('visible');
                fondoSalida.classList.add('visible');
                break;
        }

        // Mostrar la preguntaorientacion
        //const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
 
    }

    function aceptarRespuestaAzul(position){
        tituloRespuesta[0].innerText = 'Ubicacion';
        tituloRespuesta[1].innerText = 'Ubicacion';

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        const latesperada = 39.394363;
        const lonesperada = -3.2189677;

        let puntuacionCorrecta = 10;
        const variacionPermitida = 0.010

        if ((latitude<latesperada+variacionPermitida && latitude>latesperada-variacionPermitida) 
                && (longitude<lonesperada+10 && longitude>lonesperada-10)){
            window.alert(Math.floor(((latitude-latesperada) + (longitude-lonesperada))/2))
            puntajes[turnoActual] += puntuacionCorrecta;
            puntuacion.innerText = `${puntajes[turnoActual]} ptos`;
            puntuacionCaja.innerText = `+ ${puntajes[turnoActual]} ptos`;
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
    }

    function aceptarRespuestaRojo() {
        //window.alert("Listener boton"+grados)
        tituloRespuesta[0].innerText = 'Orientacion';
        tituloRespuesta[1].innerText = 'Orientacion';

        //if (respuesta.toLowerCase() === pregunta.respuesta.toLowerCase()) {
        if (grados<150 && grados>340){
            puntajes[turnoActual] += 10;
            puntuacion.innerText = `${puntajes[turnoActual]} ptos`;
            puntuacionCaja.innerText = `+ ${puntajes[turnoActual]} ptos`;
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

        window.removeEventListener('deviceorientationabsolute', (event) => {orientacion(event);})
        preguntaCajaRoja.classList.remove('visible');
        //aceptarBotonRoja.removeEventListener('click', aceptarRespuestaRojo);
   
        siguienteTurno();

        // Restaurar casillas para el siguiente turno
        inicializarCasillas();
    };


    // Agregar eventos
    dado.addEventListener('click', tirarDado);
    casillas.forEach(casilla => casilla.addEventListener('click', seleccionarCasilla));

    // Inicialización de la partida
    inicializarCasillas();
    document.querySelector('body').style.opacity = 1;


};



