import {animacionesSalidaNav,animacionesEntradaNav,animacionHeader} from '../js/animaciones.js';
import {getCookie,changeCSS} from '../js/cookies.js';

window.onload = function() {
        if (getCookie("alto-contraste")=="true"){
                changeCSS("../estilo/alto-contraste/estadisticas-ac.css", 1);
        }
        animacionesEntradaNav();
        animacionesSalidaNav();
        //Efecto header hacerse pequeño al deslizar
        animacionHeader();

}