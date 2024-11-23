import {animacionesSalidaNav,animacionesEntradaNav} from '../../js/animaciones.js';

window.onload = function() {
        animacionesEntradaNav();
        animacionesSalidaNav();

        atras.addEventListener('click', () => {
                window.navigator.vibrate([30, 50, 30])
                setTimeout(function() { 
                        window.location.href = '../ajustes.html';
                    }, 200)
            });
}