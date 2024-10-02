const texts = document.querySelector(".texts");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "es-ES";

let p = document.createElement("p");

recognition.addEventListener("result", (e) => {
  console.log(e);
  document.getElementById("texto").innerHTML = e;
  });

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();
