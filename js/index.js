import {animacionesSalidaNav,animacionesEntradaNav} from './animaciones.js';
import {getCookie,changeCSS} from '../js/cookies.js';

window.onload = function() {
        //Si es alto contraste está activado usamos su css
        if (getCookie("alto-contraste")=="true"){
                changeCSS("./estilo/alto-contraste/styles-ac.css", 1);
        }
        //Animacion al cargar la pagina
        document.querySelector('body').style.opacity = 1;
        animacionesEntradaNav();
        animacionesSalidaNav();
        const btnJugar = document.getElementsByClassName("play-button")[0];
        btnJugar.addEventListener('click', () => {
                setTimeout(function() { 
                document.querySelector('body').style.opacity = 0;
                document.querySelector('body').style.background = '#fefff0';
                setTimeout(function() { 
                        window.location.href = btnJugar.getAttribute('enlace');
                }, 200)},200)
        });
}