export function animacionesSalidaNav(){
    //Animaciones de la barra de navegacion
    const botonesNav = document.getElementsByClassName('menuNotSelectedA');
    const colorFondo = getComputedStyle(document.documentElement)
                            .getPropertyValue('--colorFondoPagina');

    for(let i = 0; i < botonesNav.length; i++){
        botonesNav[i].addEventListener('click', () => {
            document.querySelector('body').style.background = colorFondo;
            document.querySelector('#pantalla').style.opacity = 0;
            setTimeout(function() { 
                window.navigator.vibrate(10);
                window.location.href = botonesNav[i].getAttribute('enlace');
            }, 200)
        });
    }
}
export function animacionesEntradaNav(){
    document.querySelector('#pantalla').style.opacity = 1;
}
//Efecto header hacerse pequeño al deslizar
export function animacionHeader(){
    window.addEventListener('scroll', function() {
        const title = document.getElementById('titulo');
        const scrollY = window.scrollY;
        
        if (scrollY > 30) {
                title.classList.add('fixed');
        } else {
                title.classList.remove('fixed');
        }
});

}
/*
document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
})*/