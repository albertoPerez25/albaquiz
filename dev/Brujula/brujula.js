window.onload = function(){
    window.addEventListener('deviceorientation', (eventData) => {
        //direccion a donde apunta el dispositivo
        const grados = eventData.alpha;
        //Inclinar hacia izquierda o derecha. Hacia la derecha es positivo
        const IzqDer = eventData.gamma;
        //Inclinar hacia arriba o abajo. Hacia arriba es positivo
        const ArrAba = eventData.beta;

        document.getElementById('alpha').innerHTML = grados;
        document.getElementById('gamma').innerHTML = IzqDer;
        document.getElementById('beta').innerHTML = ArrAba;
        
    }, false );
    
}
