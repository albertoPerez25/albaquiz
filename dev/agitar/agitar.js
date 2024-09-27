async function setMotionListeners(func){
    window.addEventListener('devicemotion', function(){detectar(event,func)});
}

function detectar(event,func) {
    //window.alert("llego a detectar");
    if ((Math.absolute(event.rotationRate.alpha > 900) || 
        Math.absolute(event.rotationRate.beta > 900) || 
        Math.absolute(event.rotationRate.gamma > 900))) 
    {
        document.getElementById('output_message').innerHTML = "SE AGITAAAAAAAAA!";
        document.body.style.backgroundColor = "red";
        func();
    }
}

function resetear(){
    window.alert("llego a resetear");
    setTimeout(() => {
        document.getElementById('output_message').innerHTML = null;
        document.body.style.backgroundColor = "grey";
    }, 2500)
}

this.setMotionListeners(resetear);