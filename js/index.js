import {animacionesSalidaNav,animacionesEntradaNav} from './animaciones.js';


window.onload = function() {
        //Animacion al cargar la pagina
        document.querySelector('body').style.opacity = 1;
        animacionesEntradaNav();
        animacionesSalidaNav();
}