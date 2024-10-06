const texts = document.querySelector(".texts");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "es-ES";

let p = document.createElement("p");

recognition.addEventListener("result", (e) => {
  console.log(e);
  document.getElementById("texto").innerHTML = e.results[0][0].transcript;
  document.getElementById("texto2").innerHTML += e.results[e.results.length - 1][0].transcript;
  //Con el + se añade a lo que ya estaba las nuevas palabras, sin el + se sustituye
  });

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();
