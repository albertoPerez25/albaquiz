//const casilla = document.querySelector('.box');


window.onload=function(){
    const casilla = document.getElementById('ejemplo');
    const pregunta = document.getElementById('cajaPregunta');
    const respuestaInput = document.getElementById('respuesta');
    const aceptarBoton = document.getElementById('aceptar');

    casilla.addEventListener('click', () => {
        //pregunta.style.display = 'block';
        pregunta.classList.add('visible');
    });
    
    aceptarBoton.addEventListener('click', () => {
        const answer = respuestaInput.value;
        pregunta.classList.remove('visible');
        //pregunta.style.display = 'none';
    });
}

