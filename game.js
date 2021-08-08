var buttonColors=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var toggle=false;
var clickCount=0;

document.addEventListener("keydown",function(){
    if(!toggle){
        nextSequence();
    }
});

$("div.btn").on("click",function(e){
    clickCount++;
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playChosenColorAudio(userChosenColor);
    checkAnswer(clickCount - 1);
});

function nextSequence(){
    toggle=true;
    level++;
    $("h1").text("Level "+level);
    var randomNUmber = Math.round(Math.random() * 3);
    var randomChosenColor=buttonColors[randomNUmber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut();
    $("#"+randomChosenColor).fadeIn();
    playChosenColorAudio(randomChosenColor);
}

function playChosenColorAudio(chosenColor){
    var audio = new Audio("sounds/"+chosenColor+".mp3");;
    audio.play();
}

function animatePress(clickedColor){
    $("#"+clickedColor).addClass("pressed");
    setTimeout(function(){
        $("#"+clickedColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(clickCount==level){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
                clickCount=0;
            },1000);    
        }
    }else{
        $("body").addClass("game-over");
        playChosenColorAudio("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
        },200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern=[];
    toggle=false;
    clickCount=0;
    userClickedPattern=[];
}