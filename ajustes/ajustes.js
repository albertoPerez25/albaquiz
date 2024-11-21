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

        for (let i = 0; i < liIdioma.length; i++) {
                liIdioma[i].addEventListener('click', () => {
                        setTimeout(function() { 
                                cajaIdioma.classList.remove('visible');
                                
                                // Verificar si el idioma seleccionado es "Inglés"
                                if (liIdioma[i].textContent.trim() === "Inglés") 
                                        window.location.href = "../Inglés/ajustes/ajustesIngles.html";
                                alert("Idioma cambiado a " + liIdioma[i].textContent);

                        }, 300);
                });
        }
}
