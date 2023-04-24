"use-strict"

// SECTION-1 -> LOGO SECTION--------------------

const logo1 = document.querySelector(".logo--icon-1");
const logo2 = document.querySelector(".logo--icon-2");
const logo3 = document.querySelector(".logo--icon-3");
const iconContainer = document.querySelector(".container--icon");
const arrowContainer = document.querySelector(".container--icon-arrow");
const logoContainer = document.querySelector(".container--logo");
const mainContainer = document.querySelector(".container--main");
const header = document.head;
let speech;

const btnStart = document.querySelector(".btn--start");
let animationTimer;

currentSection = 1;

(function() {
    logo1.style.left = 0+"px";
    logo1.style.top = (Number.parseFloat(getComputedStyle(iconContainer).height)/2)-(Number.parseFloat(getComputedStyle(logo1).height)/2)+"px";
    
    logo3.style.left = Number.parseFloat(getComputedStyle(iconContainer).width) - Number.parseFloat(getComputedStyle(logo3).width)+"px";
    logo3.style.top = (Number.parseFloat(getComputedStyle(iconContainer).height)/2)-Number.parseFloat(getComputedStyle(logo3).height)/2+"px";
})()

function setSection(sectionNum) {
    let currentSection = sectionNum;
    mainContainer.style.transform = `translateX(-${100*(currentSection-1)}vw)`;
}

function animation() {
    const initialWidth = 25;
    const finalWidth = 65;
    let i = initialWidth;
    // Opening Arrow Animation
    animationTimer = setInterval(() => {
        arrowContainer.style.width = `${i}%`;
        if(i===finalWidth) {
            let deg = 0;
            let stop = false;
            clearInterval(animationTimer);
            //Rotating Animation
            animationTimer = setInterval(() => {
                if(!stop){
                    arrowContainer.style.transform = `rotate(${deg}deg)`
                    deg+=2;
                } else {
                    if(deg%360===0) {
                        arrowContainer.style.transform = `rotate(${deg}deg)`
                        deg+=2;
                        clearInterval(animationTimer);
                        //Closing Arrow Animation
                        const initialWidth = 65;
                        const finalWidth = 45;
                        let i = initialWidth;
                        animationTimer = setInterval(() => {
                            arrowContainer.style.width = `${i}%`;
                            i--;
                            if(i===finalWidth) {
                                clearInterval(animationTimer);
                                //Animation Arrow Icon Translation and Text Appearance
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
                                    textContainer.style.top = (Number.parseFloat(getComputedStyle(logoContainer).height)/2)-(Number.parseFloat(getComputedStyle(textContainer).height)/2)+"px";
                                    textContainer.style.filter = `opacity(${opacity})`;
                                    opacity = opacity >= 1? 1: opacity+0.001; 
                                    if(translation+Number.parseFloat(getComputedStyle(iconContainer).width)/2 < 30) {
                                        clearInterval(animationTimer);
                                        //Animation Finishing Text Appearance
                                        animationTimer = setInterval(() => {
                                            textContainer.style.filter = `opacity(${opacity})`;
                                            opacity = opacity >= 1? 1: opacity+0.005; 
                                            
                                            if(opacity >= 1) {
                                                clearInterval(animationTimer);
                                                translation = 0;
                                                //Animation Arrow Icon and Text Translation upwards
                                                animationTimer = setInterval(() => {
                                                    logoContainer.style.transform = `translateY(${translation}%)`;
                                                    translation-=2;
                                                    if(translation < -100) {
                                                        clearInterval(animationTimer)
                                                        let scale = 0;
                                                        opacity = 0;
                                                        //Animation Button Scale and Opacity also, finishing the translation of logo
                                                        animationTimer = setInterval(() => {
                                                            logoContainer.style.transform = `translateY(${translation}%)`;
                                                            translation-=2;
                                                            btnStart.style.transform = `scale(${scale})`;
                                                            btnStart.style.filter = `opacity(${opacity})`;
                                                            scale = scale >= 1? 1: scale + 0.05;
                                                            opacity = opacity >= 0.5? 0.5: scale + 0.05;
                                                            if(translation < -180) {
                                                                clearInterval(animationTimer);
                                                                //Animation finishing the logo translation and logo opacity
                                                                animationTimer = setInterval(() => {    
                                                                    btnStart.style.filter = `opacity(${opacity})`;
                                                                    opacity = opacity >= 1? 1: scale + 0.05;
                                                                    if(opacity === 1) {
                                                                        function nextSection() {
                                                                            setSection(2);
                                                                            speech = new SpeechSynthesisUtterance('hello');
                                                                            speech.volume = 0;
                                                                            speechSynthesis.speak(speech);
                                                                        }
                                                                        btnStart.addEventListener("mousedown", nextSection);
                                                                        btnStart.addEventListener("touchend", nextSection);
                                                                        const script = document.createElement("script");
                                                                        script.src = "./section2.js";
                                                                        script.setAttribute("defer", "");
                                                                        header.appendChild(script);
                                                                        clearInterval(animationTimer);
                                                                    }
                                                                }, 2);
                                                            }
                                                        }, 8);
                                                    }
                                                }, 5);
                                            }

                                        }, 5);
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
