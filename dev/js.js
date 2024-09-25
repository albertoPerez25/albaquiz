



async function checkPermisoMovimiento(params) {
    //window.alert("Entro a checkPermisoMovimiento!")
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        window.alert("Entro al if!")
        await DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState == 'granted') {
                    // Hide special UI; no longer needed
                    btn_reqPermission.style.display = "none"
                    this.setMotionListeners()
                }
            })
            .catch( (error) => {
                window.alert("Error getting sensor permission: %O", error)
                // Show special UI to user, suggesting they should allow motion sensors. The tap-or-click on the button will invoke the permission dialog.
                btn_reqPermission.style.display = "block"
            })
    }else{
        window.alert("No hay permiso!")
        this.setMotionListeners()
    }
}

async function setMotionListeners(){
    // ORIENTATION LISTENER
    await window.addEventListener('orientation', event => {
        console.log('Device orientation event: %O', event)
    })

    await window.addEventListener('devicemotion', event => {
        console.log('Device motion event: %O', event)

        if ((event.rotationRate.alpha > 256 || event.rotationRate.beta > 256 || event.rotationRate.gamma > 256)) {
            this.output_message.innerHTML = "SE AGITAAAAAAAAA!"
            setTimeout(() => {
                this.message.innerHTML = null
            }, "2000")
        }
    })
}

/*var btn_reqPermission = document.getElementById("btn_reqPermission")
btn_reqPermission.addEventListener("click", () => { this.checkPermisoMovimiento() })
*/

//this.checkPermisoMovimiento()
this.setMotionListeners()