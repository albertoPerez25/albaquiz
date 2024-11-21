import {animacionesSalidaNav,animacionesEntradaNav} from '../js/animaciones.js';

window.onload = function() {
        animacionesEntradaNav();
        animacionesSalidaNav();
        const btnIdioma = document.getElementById("idioma");
        const cajaIdioma = document.getElementById("cajaIdioma");
        const liIdioma = document.getElementsByClassName("liIdioma");
        btnIdioma.addEventListener('click', () => {
                cajaIdioma.classList.add('visible');
        });
        for(let i = 0; i < liIdioma.length; i++){
                liIdioma[i].addEventListener('click', () => {
                        setTimeout(function() { 
                                cajaIdioma.classList.remove('visible');
                                alert("Idioma cambiado a " + liIdioma[i].textContent);
                        }, 300)
                });
        }
}