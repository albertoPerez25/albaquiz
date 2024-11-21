//Funciones para gestionar cookies mas facilmente
export function setCookie(nombre, valor, diasLimite){
    const fecha = new Date();
    fecha.setTime(fecha.getTime() +  (diasLimite * 24 * 60 * 60 * 1000));
    let expira = "expires=" + fecha.toUTCString();
    document.cookie = `${nombre}=${valor}; ${expira}; path=/`;
}

export function deleteCookie(nombre){
    setCookie(nombre, null, null);
}

export function getCookie(nombre){
    const cDecod = decodeURIComponent(document.cookie);
    const cArray = cDecod.split("; ");
    let resultado = null;  

    cArray.forEach(element => {
        if(element.indexOf(nombre) == 0){
            resultado = element.substring(nombre.length + 1)
        }
    })
    return resultado;
}
//Para cambiar el css
export function changeCSS(cssFile, cssLinkIndex) {
    document.getElementById('stylesheet').href=cssFile;
}