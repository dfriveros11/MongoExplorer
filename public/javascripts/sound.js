console.log("holi");

const submitBoton = document.querySelector("#boton button");

function audio(e) {
  let rep = new Audio();
  rep.src = e;
  rep.play();
}

submitBoton.addEventListener("sound", audio);
audio("../sounds/submitAudio.mp3");
