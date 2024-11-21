//const casilla = document.querySelector('.box');
var sleep = function(ms){
    var esperarHasta = new Date().getTime() + ms;
    while(new Date().getTime() < esperarHasta) continue;
};
window.onload = function () {
    const atras = document.getElementById('btnAtras');
    const cajaSalida = document.getElementById('cajaSalida');
    const no_salir = document.getElementById('no_salir');
    const si_salir = document.getElementById('si_salir');
    const fondoSalida = document.getElementById('fondoSalida');
    const jugadores = Array.from(document.getElementsByClassName('jugador'));
    const dado = document.getElementById('dado');
    const casillas = Array.from(document.querySelectorAll('.box'));
    const preguntaCaja = document.getElementById('cajaPregunta');
    const preguntaTexto = document.getElementById('preguntaTexto');
    const respuestaInput = document.getElementById('respuesta');
    const aceptarBoton = document.getElementById('aceptar');
    const puntuacion = document.getElementById('puntuacion');
    const jugadorActualTexto = document.getElementById('jugador');

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
   
        /*
        // Colores posibles para el dado (coinciden con los colores de las casillas)
        const colores = ['rojo', 'azul', 'amarillo'];
        const colorSeleccionado = colores[Math.floor(Math.random() * colores.length)];

        // Restablecer el estado visual de todas las casillas
        inicializarCasillas();

        // Activar la animación en el dado (cambiando colores durante 2 segundos)
        dado.classList.add('seleccionando');
        
        // Después de 2 segundos, detener la animación y asignar el color final al dado
        setTimeout(() => {
            dado.classList.remove('seleccionando');
            dado.style.backgroundColor = colorSeleccionado; // Establecer el color final del dado
            alert(`Color obtenido: ${colorSeleccionado.toUpperCase()}`);

            // Destacar las casillas correspondientes al color y deshabilitar el resto
            casillas.forEach(casilla => {
                if (casilla.classList.contains(colorSeleccionado)) {
                    casilla.classList.add('clicable'); // Habilitar
                } else {
                    casilla.classList.add('gris'); // Deshabilitar
                }
            });
        }, 2000); // Duración de la animación (2 segundos)*/
    }

    // Función para manejar la selección de una casilla
    function seleccionarCasilla(event) {
        const casilla = event.target.closest('.box');
        if (!casilla || !casilla.classList.contains('clicable')) {
            return; // Ignorar clic en casillas no válidas
        }

        // Mostrar la pregunta
        const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
        preguntaTexto.innerText = pregunta.texto;
        preguntaCaja.classList.add('visible');

        aceptarBoton.onclick = () => {
            const respuesta = respuestaInput.value.trim();
            if (respuesta.toLowerCase() === pregunta.respuesta.toLowerCase()) {
                puntajes[turnoActual] += 10;
                puntuacion.innerText = `${puntajes[turnoActual]} ptos`;
                alert('Respuesta correcta!');
            } else {
                alert('Respuesta incorrecta!');
            }
            preguntaCaja.classList.remove('visible');
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



