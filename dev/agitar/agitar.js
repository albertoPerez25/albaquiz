function setMotionListeners(func){
    window.addEventListener('devicemotion', detectar(func));
}

function detectar(func) {
    if ((detectar.rotationRate.alpha > 900 || detectar.rotationRate.beta > 900 || detectar.rotationRate.gamma > 900)) {
        this.output_message.innerHTML = "SE AGITAAAAAAAAA!";
        document.body.style.backgroundColor = "red";
        func();
    }
}

function resetear(){
    setTimeout(() => {
        document.getElementById('output_message').innerHTML = null;
        document.body.style.backgroundColor = "grey";
    }, 2500)
}

this.setMotionListeners(resetear);