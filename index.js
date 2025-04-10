var sound_names=["red","green","blue","yellow"];
var gameSequence=[];
var userSequence=[];
var level=0;
var started=false;
$(document).keypress(function (){
    if(!started){
    started=true;
    nextButton();
    }
});

function nextButton(){
    $("h1").text("Level "+(++level));
    userSequence=[];
    var curr=sound_names[Math.floor(Math.random()*4)];
    setTimeout(function(){
        makeSound(curr);
        gameSequence.push(curr);
        $("#"+curr).fadeOut(50).fadeIn(50);
    },80);     
}

$("button").click(function(){
    var chosen=$(this).attr("id");
    makeSound(chosen);
    $(this).addClass("pressed");
    setTimeout(function(){
        $("#"+chosen).removeClass("pressed");
    },100);
    userSequence.push(chosen);
    checkAnswer(userSequence.length-1);
});

function checkAnswer(currentIndex){
    if(userSequence[currentIndex]===gameSequence[currentIndex]){
        if(userSequence.length===gameSequence.length){
            setTimeout(nextButton,500);
        }
    }
    else{
        gameOver();
    }
}

function gameOver(){
    gameSequence=[];
    userSequence=[];
    makeSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key To Restart"); 
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    level=0;
    started=false;
}

function makeSound(id){
    switch(id){
        case "red":
            var audio=new Audio("./sounds/red.mp3");
            audio.play();
            break;
        case "green":
            var audio=new Audio("./sounds/green.mp3");
            audio.play();
            break;
        case "yellow":
            var audio=new Audio("./sounds/yellow.mp3");
            audio.play();
            break;
        case "blue":
            var audio=new Audio("./sounds/blue.mp3");
            audio.play();
            break;
        case "wrong":
            var audio=new Audio("./sounds/wrong.mp3");
            audio.play();
            break;
        default:
            alert("There is a problem");
}
}