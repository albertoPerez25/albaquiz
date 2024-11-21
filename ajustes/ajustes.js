import {animacionesSalidaNav,animacionesEntradaNav} from '../js/animaciones.js';
import {setCookie,getCookie,changeCSS} from '../js/cookies.js';

window.onload = function() {
        //getCookie("alto-contraste") == "true" ? changeCSS("../estilo/alto-contraste/ajustes-ac.css", 1) : changeCSS("../estilo/ajustes.css", 1);
        animacionesEntradaNav();
        animacionesSalidaNav();
        const btnIdioma = document.getElementById("idioma");
        const cajaIdioma = document.getElementById("cajaIdioma");
        const liIdioma = document.getElementsByClassName("liIdioma");
        const sContraste = document.getElementById("sContraste");
        const divContraste = document.getElementById("contraste");
        let contraste = (/true/).test(getCookie("alto-contraste"));
        let seleccionado = contraste;

        switch (contraste){
                case true:
                        sContraste.setAttribute("selected", "true");
                        changeCSS("../estilo/alto-contraste/ajustes-ac.css", 1);
                        break;
                case false:
                        sContraste.removeAttribute("selected");
                        changeCSS("../estilo/ajustes.css", 1);
                        break;
                default:
                        setCookie("alto-contraste", "false", 30);
                        sContraste.removeAttribute("selected");
                        break;
        }

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
                                //alert("Idioma cambiado a " + liIdioma[i].textContent);

                        }, 300);
                });
        }
        divContraste.addEventListener('click', () => {
                contraste = !contraste;
                if (contraste) {           
                        sContraste.setAttribute("selected", "true");
                        changeCSS("../estilo/alto-contraste/ajustes-ac.css", 1);
                        setCookie("alto-contraste", "true", 30);
                } else {
                        sContraste.removeAttribute("selected");
                        changeCSS("../estilo/ajustes.css", 1);
                        setCookie("alto-contraste", "false", 30);
                }
        });

}
