"use-strict";

const allowBtn = document.querySelector(".section--2 .btn--allow");

let videoStream;

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
    speak("Antes de começar, precisamos de sua autorização para os seguintes recursos: Câmera; Cuquis; Auto-Falantes. Autorizar?", voices.filter(x => x.lang === "pt-BR")[0], 1, 1, 5);

}, 1000);

async function requestPermission() {
    videoStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
}



allowBtn.addEventListener("click", requestPermission);
allowBtn.addEventListener("touchstart", requestPermission);