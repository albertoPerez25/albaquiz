//const casilla = document.querySelector('.box');


window.onload=function(){
    /*
    const casilla = document.getElementsByClassName('box');
    //const casilla = document.getElementById('ejemplo');
    const pregunta = document.getElementById('cajaPregunta');
    const respuestaInput = document.getElementById('respuesta');
    const aceptarBoton = document.getElementById('aceptar');

    for(let i = 0; i < casilla.length; i++){
        casilla[i].addEventListener('click', () => {
            //pregunta.style.display = 'block';
            pregunta.classList.add('visible');
        });
    }
    
    aceptarBoton.addEventListener('click', () => {
        const answer = respuestaInput.value;
        pregunta.classList.remove('visible');
        //pregunta.style.display = 'none';
    });

    ////////////////*/
    const atras = document.getElementById('btnAtras');
    const cajaSalida = document.getElementById('cajaSalida');
    const no_salir = document.getElementById('no_salir');
    const si_salir = document.getElementById('si_salir');
    const fondoSalida = document.getElementById('fondoSalida');

    atras.addEventListener('click', () => {
        cajaSalida.classList.add('visible');
        fondoSalida.classList.add('visible');
        window.navigator.vibrate([30, 50, 30])
    });
    no_salir.addEventListener('click', () => {
        cajaSalida.classList.remove('visible');
        fondoSalida.classList.remove('visible');
    });
    si_salir.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}
