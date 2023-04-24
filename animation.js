"use-strict"

// SECTION-1 -> LOGO SECTION--------------------

const logo1 = document.querySelector(".logo--icon-1");
const logo2 = document.querySelector(".logo--icon-2");
const logo3 = document.querySelector(".logo--icon-3");
const iconContainer = document.querySelector(".container--icon");
const arrowContainer = document.querySelector(".container--icon-arrow");
let animationTimer;

(function() {
    logo1.style.left = 0+"px";
    logo1.style.top = (Number.parseFloat(getComputedStyle(iconContainer).height)/2)-(Number.parseFloat(getComputedStyle(logo1).height)/2)+"px";
    
    logo3.style.left = Number.parseFloat(getComputedStyle(iconContainer).width) - Number.parseFloat(getComputedStyle(logo3).width)+"px";
    logo3.style.top = (Number.parseFloat(getComputedStyle(iconContainer).height)/2)-Number.parseFloat(getComputedStyle(logo3).height)/2+"px";
})()

function animation() {
    const initialWidth = 25;
    const finalWidth = 65;
    let i = initialWidth;
    animationTimer = setInterval(() => {
        arrowContainer.style.width = `${i}%`;
        if(i===finalWidth) {
            let deg = 0;
            let stop = false;
            clearInterval(animationTimer);
            animationTimer = setInterval(() => {
                if(!stop){
                    arrowContainer.style.transform = `rotate(${deg}deg)`
                    deg+=2;
                } else {
                    if(deg%360===0) {
                        arrowContainer.style.transform = `rotate(${deg}deg)`
                        deg+=2;
                        clearInterval(animationTimer);
                        const initialWidth = 65;
                        const finalWidth = 45;
                        let i = initialWidth;
                        animationTimer = setInterval(() => {
                            arrowContainer.style.width = `${i}%`;
                            i--;
                            if(i===finalWidth) {
                                clearInterval(animationTimer);
                                let translation = 0;
                                const textContainer = document.querySelector(".container--text");
                                textContainer.style.filter = "opacity(0)";
                                textContainer.style.position = "absolute";
                                textContainer.classList.remove("hidden");
                                let opacity = 0;
                                animationTimer = setInterval(() => {
                                    [logo1, logo2, logo3].forEach(x => {
                                        x.style.transform = `translateX(${translation}px)`
                                    })
                                    textContainer.style.top = (Number.parseFloat(getComputedStyle(document.querySelector(".container--logo")).height)/2)-(Number.parseFloat(getComputedStyle(textContainer).height)/2)+"px";
                                    textContainer.style.filter = `opacity(${opacity})`;
                                    opacity = opacity >= 1? 1: opacity+0.001; 
                                    if(translation+Number.parseFloat(getComputedStyle(iconContainer).width)/2 < 30) {
                                        clearInterval(animationTimer);
                                        animationTimer = setInterval(() => {
                                            textContainer.style.filter = `opacity(${opacity})`;
                                            opacity = opacity >= 1? 1: opacity+0.005; 
                                            
                                            if(opacity >= 1) {
                                                clearInterval(animationTimer);

                                                animationTimer = setInterval(() => {
                                                    //animar botão
                                                }, 10)
                                            }

                                        }, 5)
                                    }
                                    translation--;
                                }, 5);
                            }
                        }, 10);
                    } else {
                        arrowContainer.style.transform = `rotate(${deg}deg)`
                        deg+=2;
                    }
                }
                if(document.readyState === "complete") {
                    stop=true;
                }
            }, 5);
        }
        i++;
    }, 20);
}

animation();