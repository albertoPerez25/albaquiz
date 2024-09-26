async function setMotionListeners(){
    await window.addEventListener('devicemotion', event => {
        if ((event.rotationRate.alpha > 400 || event.rotationRate.beta > 400 || event.rotationRate.gamma > 400)) {
            this.output_message.innerHTML = "SE AGITAAAAAAAAA!"
            document.body.style.backgroundColor = "red"
            resetear()
        }
    })
}

function resetear(){
    setTimeout(() => {
        document.getElementById('output_message').innerHTML = null;
        document.body.style.backgroundColor = "grey"
    }, 2000)
}

this.setMotionListeners()