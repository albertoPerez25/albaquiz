import {animacionesSalidaNav,animacionesEntradaNav} from '../js/animaciones.js';

function changeCSS(cssFile, cssLinkIndex) {
        document.getElementById('stylesheet').href=cssFile;
/*
    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(cssLinkIndex).replaceChild(newlink, oldlink);*/
}

window.onload = function() {
        animacionesEntradaNav();
        animacionesSalidaNav();
        const btnIdioma = document.getElementById("idioma");
        const cajaIdioma = document.getElementById("cajaIdioma");
        const liIdioma = document.getElementsByClassName("liIdioma");
        const sContraste = document.getElementById("sContraste");
        const divContraste = document.getElementById("contraste");
        let contraste = false;

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
                } else {
                        sContraste.removeAttribute("selected");
                        changeCSS("../estilo/ajustes.css", 1);
                }
        });
}
