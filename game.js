const buttonColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
var started = false;
let level = 0;
let levelTitle = document.querySelector("#level-title");

document.addEventListener("keypress",(btn)=>{
    if(!started)
    {
        levelTitle.innerText = `Level ${level}`;
        nextSequence();
        started=true;
    }
});

let buttons = document.querySelectorAll(".btn");
buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        let userClickedButton =  button.getAttribute("id");
        userClickedPattern.push(userClickedButton);
        playSound(userClickedButton);
        animatePress(userClickedButton);
        checkAnswer(userClickedPattern.length-1);
    });
});

let checkAnswer = (currentlevel)=>{
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel])
    {
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("Failed");
        playSound("wrong");
        let bodyColor = document.querySelector("body");
        bodyColor.classList.add("game-over");
        setTimeout(()=>{
            bodyColor.classList.remove("game-over");
        },200);
        levelTitle.innerText = "Game Over, Press Any Key to Restart";
        startOver();
    }
};

let nextSequence = ()=>{
    userClickedPattern = [];
    level++;
    levelTitle.innerText = `Level ${level}`;
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    let element = document.getElementById(randomChosenColour);
    element.style.opacity = "0";
    setTimeout(()=>{
        element.style.opacity = "1";
    },100);
    setTimeout(()=>{
        element.style.opacity = "0";
    },200);
    setTimeout(()=>{
        element.style.opacity = "1";
    },300);
    playSound(randomChosenColour);
};

let playSound = (element)=>{
    var audio = new Audio(`sounds/${element}.mp3`);
    audio.play();
};

let animatePress = (currentColor)=>{
    let color = document.getElementById(currentColor);
    color.classList.add("pressed");
    setTimeout(()=>{
        color.classList.remove("pressed");
    },50)
};

let startOver = ()=>{
    level=0;
    gamePattern = [];
    started = false;
};