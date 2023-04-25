"use-strict";

const qrHeight = Number.parseFloat(getComputedStyle(videoFeed).height);
const qrWidth = Number.parseFloat(getComputedStyle(videoFeed).width)
const messageDisplay = document.querySelector(".message--display");
const canvas1 = document.createElement("canvas");
const canvas2 = document.createElement("canvas");
[canvas1, canvas2].forEach(c => c.height = qrHeight);
[canvas1, canvas2].forEach(c => c.width = qrWidth);
const ctx1 = canvas1.getContext("2d", {willReadFrequently: true});
const ctx2 = canvas2.getContext("2d", {willReadFrequently: true});
let count = 0;
let motionTimer;


function displayMessage(message, color) {
    messageDisplay.textContent = `${message}`;
    messageDisplay.style.color = color;
    return true;
}

motionTimer = setInterval(() => {
    ctx1.clearRect(0, 0, qrWidth, qrHeight);
    ctx2.clearRect(0, 0, qrWidth, qrHeight);

    ctx1.drawImage(videoFeed, 0, 0, qrWidth, qrHeight);
    setTimeout(() => {
        ctx2.drawImage(videoFeed, 0, 0, qrWidth, qrHeight);
        
        const data1 = ctx1.getImageData(0, 0, qrWidth, qrHeight);
        const data2 = ctx2.getImageData(0, 0, qrWidth, qrHeight);
        let imgScore = 0;
        
        for(let i = 0; i<data1.data.length; i+=4) {
            let r = Math.abs(data1.data[i] - data2.data[i])*10;
            let g = Math.abs(data1.data[i+1] - data2.data[i+1])*10;
            let b = Math.abs(data1.data[i+2] - data2.data[i+2])*10;

                    const pixelScore = (r+g+b)/3;
                    if(pixelScore>250) {
                        imgScore++;
                    }

            }
        
            if(imgScore>15000) {
                displayMessage("Tente deixar o celular mais parado...", "red");
                count = 0;
            } else {
                displayMessage("Perfeito", "green");
                count++;
                if(count>10) {
                    clearInterval(motionTimer);
                    // lerQrCode()
                    //se der certo => prosseguir
                    //senão reativar o timer
                }
            }
    }, 50);
}, 200);