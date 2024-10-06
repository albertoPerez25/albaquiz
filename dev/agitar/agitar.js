//Necesita https

async function setMotionListeners(func){
    
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        await DeviceMotionEvent.requestPermission()
        .catch( (error) => {
            console.log("Error getting sensor permission: %O", error);
            return;
        })
    }

    window.addEventListener('devicemotion', function(){detectar(eventData,func)});
}

    function detectar(event,func) {
        document.getElementById('sensor').innerHTML = "alpha: " + event.rotationRate.alpha + "<br>beta: " + event.rotationRate.beta + "<br>gamma: " + event.rotationRate.gamma;
        //window.alert("llego a detectar");
        if ((Math.abs(event.rotationRate.alpha > 300) || 
            Math.abs(event.rotationRate.beta > 300) || 
            Math.abs(event.rotationRate.gamma > 300))) 
        {
            document.getElementById('output_message').innerHTML = "SE AGITAAAAAAAAA!";
            document.body.style.backgroundColor = "red";
            func();
        }
    }

function resetear(){
    //window.alert("llego a resetear");
    setTimeout(() => {
        document.getElementById('output_message').innerHTML = null;
        document.body.style.backgroundColor = "grey";
    }, 2500)
}

this.setMotionListeners(resetear);