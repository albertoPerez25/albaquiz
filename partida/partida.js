window.onload = function () {
    const atras = document.getElementById('btnAtras');
    const cajaSalida = document.getElementById('cajaSalida');
    const no_salir = document.getElementById('no_salir');
    const si_salir = document.getElementById('si_salir');
    const fondoSalida = document.getElementById('fondoSalida');
    const dado = document.getElementById('dado');
    const amarillo = getComputedStyle(document.documentElement).getPropertyValue('--amarillo');
    const azul = getComputedStyle(document.documentElement).getPropertyValue('--azul');
    const rojo = getComputedStyle(document.documentElement).getPropertyValue('--rojo');
    const colors = [amarillo, azul, rojo];
    let dadoActivo = true; // Control para evitar múltiples clics durante la animación

    atras.addEventListener('click', () => {
        cajaSalida.classList.add('visible');
        fondoSalida.classList.add('visible');
        window.navigator.vibrate([30, 50, 30]);
    });

    no_salir.addEventListener('click', () => {
        cajaSalida.classList.remove('visible');
        fondoSalida.classList.remove('visible');
    });

    si_salir.addEventListener('click', () => {
        document.querySelector('body').style.background = '#b3e5fc';
        document.querySelector('body').style.opacity = 0;
        setTimeout(function () {
            window.location.href = '../index.html';
        }, 200);
    });

    dado.addEventListener('click', () => {
        if (!dadoActivo) return; // Evitar múltiples clics durante la animación

        dadoActivo = false; // Bloquea el clic mientras se realiza la animación
        dado.classList.add('seleccionando');

        let iterationCount = 12; // Número de iteraciones para el cambio de colores
        let currentIteration = 0;
        let finalColor = null; // Almacena el color final

        function changeColorWithCustomDelay() {
            if (currentIteration >= iterationCount) {
                // Finaliza la animación, deja el último color
                dado.style.backgroundColor = finalColor;
                dado.classList.remove('seleccionando');
                dadoActivo = true; // Permite clics nuevamente
                return;
            }

            window.navigator.vibrate(30);

            // Selección de un color aleatorio
            finalColor = colors[Math.floor(Math.random() * colors.length)];
            dado.style.backgroundColor = finalColor;

            currentIteration++;
            // Cálculo del retraso personalizado
            const delay = 10 + (currentIteration / 4 * 50) * (currentIteration / 4);

            setTimeout(changeColorWithCustomDelay, delay);
        }

        changeColorWithCustomDelay();
    });

    document.querySelector('body').style.opacity = 1;
};

