"use-strict";

const allowBtn = document.querySelector(".section--2 .btn--allow");
const videoFeed = document.querySelector(".video--feed"); 
var videoStream;

function getVoices() {
    let voices = speechSynthesis.getVoices();
    if(!voices.length) {
        let utterance = new SpeechSynthesisUtterance(" ");
        speechSynthesis.speak(utterance);
        voices = speechSynthesis.getVoices();
    }
    return voices;
}

function speak(text, voice, rate, pitch, volume){
    let speakData = new SpeechSynthesisUtterance();
    speakData.text = text;
    speakData.voice = voice;
    speakData.rate = rate;
    speakData.pitch = pitch;
    speakData.volume = volume;
    speakData.lang = "pt-br"

    speechSynthesis.speak(speakData);
    return speakData;
}

setTimeout(() => {
    let voices = getVoices();
    // console.log(voices);
    speak("Antes de começar, precisamos de sua autorização para os seguintes recursos: Câmera; Cuuquis; Auto-Falantes. Autorizar? Clique no botão para confirmar!", voices.filter(x => x.lang === "pt-BR")[0], 1,1, 5);
}, 2000);

async function requestPermission() {
    videoStream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}, audio: false});
    while(!videoStream) {
        videoStream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}, audio: false});
        setSection(3);
    }
    setSection(3);
    videoFeed.srcObject = videoStream;
    videoFeed.play();
    if(!document.querySelector(`script[src="./scripts/section3.js"]`)) {
        const script = document.createElement("script");
        script.src = "./scripts/section3.js";
        script.setAttribute("defer", "");
        header.appendChild(script);
    }
    speechSynthesis.cancel();
}

allowBtn.addEventListener("click", requestPermission);
allowBtn.addEventListener("touchstart", requestPermission);