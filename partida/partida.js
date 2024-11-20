//const casilla = document.querySelector('.box');
var sleep = function(ms){
    var esperarHasta = new Date().getTime() + ms;
    while(new Date().getTime() < esperarHasta) continue;
};

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
    const dado = document.getElementById('dado');
    const amarillo = getComputedStyle(document.documentElement)
                    .getPropertyValue('--amarillo');
    const azul = getComputedStyle(document.documentElement)
                    .getPropertyValue('--azul');      
    const rojo = getComputedStyle(document.documentElement)
                    .getPropertyValue('--rojo');  
    const colors = [amarillo, azul, rojo];

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
        document.querySelector('body').style.background = '#b3e5fc';
        document.querySelector('body').style.opacity = 0;
        setTimeout(function() { 
            window.location.href = '../index.html';
        }, 200)
    });

    dado.addEventListener('click', () => {
        dado.classList.add('seleccionando');

        
        let iterationCount = 12;
        let currentIteration = 0;
        let lastColor = null;
    
        function changeColorWithCustomDelay() {
            if (currentIteration >= iterationCount) {
                //dado.classList.add('terminado'); 
                dado.classList.remove('seleccionando');

                dado.style.backgroundColor = rojo;
                return;
            }
            
            window.navigator.vibrate(30);

            const colorsAvailable= colors.filter(color => color !== lastColor);
            const randomColor = colorsAvailable[Math.floor(Math.random() * colorsAvailable.length)];
            dado.style.backgroundColor = randomColor;
            lastColor = randomColor;

            currentIteration++;
            // Custom delay calculation
            const delay = 10 + (currentIteration/4 * 50) * currentIteration/4;
            
            setTimeout(changeColorWithCustomDelay, delay);
        }
    
        changeColorWithCustomDelay();
    });
    document.querySelector('body').style.opacity = 1;
}