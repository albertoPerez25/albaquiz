async function setMotionListeners(){
    // ORIENTATION LISTENER
    /*await window.addEventListener('orientation', event => {
        console.log('Device orientation event: %O', event)
    })*/

    await window.addEventListener('devicemotion', event => {
        console.log('Device motion event: %O', event)

        if ((event.rotationRate.alpha > 256 || event.rotationRate.beta > 256 || event.rotationRate.gamma > 256)) {
            this.output_message.innerHTML = "SE AGITAAAAAAAAA!"
            document.body.style.backgroundColor = "red"
            setTimeout(() => {
                this.message.innerHTML = null
                document.body.style.backgroundColor = "white"
            }, "1000")
        }
    })
}

this.setMotionListeners()