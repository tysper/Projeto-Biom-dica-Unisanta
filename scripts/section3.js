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
let mX, mY;

function displayMessage(message, color) {
    messageDisplay.textContent = `${message}`;
    messageDisplay.style.color = color;
    return true;
}

window.addEventListener("mousemove", (e) => {
    mX = e.clientX;
    mY = e.clientY;
})


function displayCopy() {
    const notification = document.createElement("div");
    notification.innerHTML = "<span>Copiado!</span>";
    notification.style.padding = "10px 5px";
    notification.style.borderRadius = "5px";
    notification.style.backgroundColor = "white";
    notification.style.color = "black";
    notification.style.position = "absolute";
    notification.style.top = `${mY-30}px`;
    notification.style.left = `${mX}px`;
    notification.style.boxShadow = "0 0 20px 5px rgba(0,0,0,0.2)";
    document.body.appendChild(notification);
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 1000);
}

function motionAnalyzer() {
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
        
            if(imgScore>18000) {
                displayMessage("Tente deixar o celular mais parado...", "red");
                count = 0;
            } else {
                displayMessage("Perfeito", "green");
                count++;
                if(count>10) {
                    clearInterval(motionTimer);

                    QrScanner.scanImage(videoFeed)
                    .then(result => {
                        let credentials = result.split(";").filter(e => e.includes("S:") || e.includes("P:")).map(e => e.split(":")[e.split(":").length-1]);;
                        let message = document.querySelector(".section--3 .message--display");
                        let title = document.querySelector(".section--3 .title--text");
                        let checkmark = document.querySelector(".animation--checkmark");

                        document.querySelector(".pseudo--styles").innerHTML=""
                        videoFeed.srcObject = new MediaStream();
                        videoFeed.parentNode.style.borderRadius = "600px";
                        videoFeed.parentNode.style.backgroundColor = "transparent";
                        message.style.filter = "opacity(0)";
                        title.style.filter = "opacity(0)";


                        setTimeout(() => {
                            checkmark.play();
                            checkmark.addEventListener("complete", () => {
                                checkmark.style.filter = "opacity(0)";
                                document.querySelector(".container--credentials").classList.remove("hidden");

                                const clipBtn = document.querySelector(".section--3 .btn--clipboard");
                                const fakeInputs = document.querySelectorAll(".section--3 .fake-input");

                                fakeInputs.forEach((e, i) => {
                                    e.textContent = credentials[i];
                                })

                                clipBtn.addEventListener("click", () => {
                                    navigator.clipboard.writeText((fakeInputs[1].textContent).trim());
                                    displayCopy();
                                })
                                clipBtn.addEventListener("touchend", () => {
                                    navigator.clipboard.writeText((fakeInputs[1].textContent).trim());
                                })
                            })
                        }, 300);
                    })
                    .catch(error => {
                        displayMessage("Nenhum QR Code encontrado", "red")
                        count = 0;
                        setTimeout(() => motionTimer = setInterval(motionAnalyzer, 200), 2000);
                    });
                    
                    
                }
            }
    }, 50);
}

motionTimer = setInterval(motionAnalyzer, 200);