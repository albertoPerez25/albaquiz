import {animacionesSalidaNav,animacionesEntradaNav} from './animaciones.js';
import {getCookie,changeCSS} from '../js/cookies.js';

window.onload = function() {
        const botonesNav = document.getElementsByClassName('menuNotSelectedA');
        const colorFondo = getComputedStyle(document.documentElement)
        .getPropertyValue('--colorFondoPagina');
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
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        let palabra = "";
        recognition.interimResults = false; //Nose que es, pero funciona
        recognition.lang = "es-ES";
        recognition.addEventListener("result", (textoReconocido) => {
                console.log(textoReconocido.results[textoReconocido.results.length - 1][0].transcript);
                palabra = textoReconocido.results[textoReconocido.results.length - 1][0].transcript;
                switch (palabra) {
                        case "jugar":
                                btnJugar.click();
                                break;
                        case "ajustes":
                                //botonesNav[2].click();
                                document.querySelector('body').style.background = colorFondo;
                                document.querySelector('#pantalla').style.opacity = 0;
                                setTimeout(function() { 
                                        window.navigator.vibrate(10);
                                        window.location.href = botonesNav[1].getAttribute('enlace');
                                }, 200)
                                break;
                        case "estadísticas":
                                //botonesNav[1].click();
                                document.querySelector('body').style.background = colorFondo;
                                document.querySelector('#pantalla').style.opacity = 0;
                                setTimeout(function() { 
                                        window.navigator.vibrate(10);
                                        window.location.href = botonesNav[0].getAttribute('enlace');
                                }, 200)
                                break;
                        default:
                                break;
                }
        //Con el + se añade a lo que ya estaba las nuevas palabras, sin el + se sustituye
        });
        const btnmicro = document.getElementById("mic-button-on");
        btnmicro.addEventListener('click', () => {
                recognition.start()
        });
}