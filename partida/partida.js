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
    const preguntaCaja = document.getElementsByClassName('pregunta');
    const preguntaCajaAzul = document.getElementById('cajaPreguntaAzul');
    const preguntaCajaAmarilla = document.getElementById('cajaPreguntaAmarilla');
    const preguntaCajaRoja = document.getElementById('cajaPreguntaRojo');
    const preguntaTexto = document.getElementById('preguntaTexto');
    const respuestaInput = document.getElementById('respuesta');
    const aceptarBoton = document.getElementById('aceptar');
    const puntuacion = document.getElementById('puntuacion');
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
        }
    
        cambiarColor();
        inicializarCasillas();
    }

    // Función para manejar la selección de una casilla
    function seleccionarCasilla(event) {
        var color;
        const casilla = event.target.closest('.box');
        if (!casilla || !casilla.classList.contains('clicable')) {
            return; // Ignorar clic en casillas no válidas
        }

        switch (casilla.classList[1]){
            case 'amarillo':
                color = 'amarillo';
                preguntaCajaAmarilla.classList.add('visible');
                break;
            case 'rojo':
                color = 'rojo';
                preguntaCajaRoja.classList.add('visible');
                break;
            case 'azul':
                color = 'azul';
                preguntaCajaAzul.classList.add('visible');
                break;
        }

        // Mostrar la pregunta
        const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];

        preguntaTexto.innerText = pregunta.texto;

        aceptarBoton.onclick = () => {
            const respuesta = respuestaInput.value.trim();
            if (respuesta.toLowerCase() === pregunta.respuesta.toLowerCase()) {
                puntajes[turnoActual] += 10;
                puntuacion.innerText = `${puntajes[turnoActual]} ptos`;
                //AUDIO CORRECTO
                audioCorrecta.play();
                window.navigator.vibrate([30, 50, 30]);
                alert('Respuesta correcta!');
            } else {
                //AUDIO INCORRECTO
                audioIncorrecta.play();
                window.navigator.vibrate([500]);
                alert('Respuesta incorrecta!');
            }
            
            switch(color){
                case 'amarillo':
                    preguntaCajaAmarilla.classList.remove('visible');
                    break;
                case 'rojo':
                    preguntaCajaRoja.classList.remove('visible');
                    break;
                case 'azul':
                    preguntaCajaAzul.classList.remove('visible');
                    break;
            }

            respuestaInput.value = '';
            siguienteTurno();

            // Restaurar casillas para el siguiente turno
            inicializarCasillas();
        };
    }

    // Agregar eventos
    dado.addEventListener('click', tirarDado);
    casillas.forEach(casilla => casilla.addEventListener('click', seleccionarCasilla));

    // Inicialización de la partida
    inicializarCasillas();
    document.querySelector('body').style.opacity = 1;
};



