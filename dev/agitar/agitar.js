//Necesita https
window.onload = function(){
    function setMotionListeners(func){
        window.addEventListener('devicemotion', function(){detectar(event,func)});
    }
    
    function detectar(event,func) {
        document.getElementById('sensor').innerHTML = "llego a detectar";
        if ((Math.abs(event.rotationRate.alpha > 900) || 
            Math.abs(event.rotationRate.beta > 900) || 
            Math.abs(event.rotationRate.gamma > 900))) 
        {
            document.getElementById('output_message').innerHTML = "SE AGITAAAAAAAAA!";
            document.body.style.backgroundColor = "red";
            func();
        }
    }
    
    function resetear(){
        document.getElementById('sensor').innerHTML = "llego a resetear";
        setTimeout(() => {
            document.getElementById('output_message').innerHTML = null;
            document.body.style.backgroundColor = "grey";
        }, 2500)
    }
    
    setMotionListeners(resetear);
}
