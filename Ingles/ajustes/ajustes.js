import {animacionesSalidaNav,animacionesEntradaNav,animacionHeader} from '../../js/animaciones.js';
import {setCookie,getCookie,changeCSS} from '../../js/cookies.js';

window.onload = function() {
        animacionesEntradaNav();
        animacionesSalidaNav();
        const btnIdioma = document.getElementById("idioma");
        const cajaIdioma = document.getElementById("cajaIdioma");
        const liIdioma = document.getElementsByClassName("liIdioma");
        const sContraste = document.getElementById("sContraste");
        const divContraste = document.getElementById("contraste");
        const fondoPopup = document.getElementById("fondoPopup");
        const sDaltonismo = document.getElementById("sDaltonismo");
        const divDaltonismo = document.getElementById("daltonismo");
        const divCambiarFicha = document.getElementById("cambiarFicha");
        //Cookies
        let contraste = (/true/).test(getCookie("alto-contraste"));
        let daltonismo = (/true/).test(getCookie("daltonismo"));

        switch (contraste){
                case true:
                        sContraste.setAttribute("selected", "true");
                        changeCSS("../estilo/alto-contraste/ajustes-ac.css", 1);
                        sDaltonismo.setAttribute("disabled", "true");
                        divDaltonismo.classList.add("disabled");
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

        switch (daltonismo){
                case true:
                        sDaltonismo.setAttribute("selected", "true");
                        sContraste.setAttribute("disabled", "true");
                        divContraste.classList.add("disabled");
                        break;
                case false:
                        sDaltonismo.removeAttribute("selected");
                        break;
                default:
                        setCookie("daltonismo", "false", 30);
                        sDaltonismo.removeAttribute("selected");
                        break;
        }

        //Efecto header hacerse pequeño al deslizar
        animacionHeader();

        btnIdioma.addEventListener('click', () => {
                cajaIdioma.classList.add('visible');
                fondoPopup.classList.add('visible');
        });

        for (let i = 0; i < liIdioma.length; i++) {
                liIdioma[i].addEventListener('click', () => {
                        setTimeout(function() { 
                                cajaIdioma.classList.remove('visible');
                                fondoPopup.classList.remove('visible');
                                // Verificar si el idioma seleccionado es "Inglés"
                                if (liIdioma[i].textContent.trim() === "Spanish") 
                                        window.location.href = "../../ajustes/ajustes.html";
                                //alert("Idioma cambiado a " + liIdioma[i].textContent);
                        }, 300);
                });
        }

        fondoPopup.addEventListener('click', () => {
                cajaIdioma.classList.remove('visible');
                fondoPopup.classList.remove('visible');
        });

        divContraste.addEventListener('click', () => {
                if(!daltonismo){
                        contraste = !contraste;
                        if (contraste) {           
                                sContraste.setAttribute("selected", "true");
                                changeCSS("../estilo/alto-contraste/ajustes-ac.css", 1);
                                setCookie("alto-contraste", "true", 30);
                                sDaltonismo.setAttribute("disabled", "true");
                                divDaltonismo.classList.add("disabled");
                        } else {
                                sContraste.removeAttribute("selected");
                                changeCSS("../estilo/ajustes.css", 1);
                                setCookie("alto-contraste", "false", 30);
                                sDaltonismo.removeAttribute("disabled");
                                divDaltonismo.classList.remove("disabled");
                        }
                }
        });

        divDaltonismo.addEventListener('click', () => {
                if (!contraste){
                        daltonismo = !daltonismo;
                        if (daltonismo) {           
                                sDaltonismo.setAttribute("selected", "true");
                                setCookie("daltonismo", "true", 30);
                                sContraste.setAttribute("disabled", "true");
                                divContraste.classList.add("disabled");
                        } else {
                                sDaltonismo.removeAttribute("selected");
                                setCookie("daltonismo", "false", 30);
                                sContraste.removeAttribute("disabled");
                                divContraste.classList.remove("disabled");
                        }
                }
        });

        divCambiarFicha.addEventListener('click', () => {
                document.querySelector('#pantalla').style.opacity = 0;
                setTimeout(function() { 
                        window.location.href = divCambiarFicha.getAttribute('enlace');
                }, 100);
        });
}