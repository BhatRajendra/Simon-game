var buttonColors=["red","blue","green","yellow"];
var sequence=[];
var userClickedPattern=[];
var level=0;
var started=false;


//press any key to start

$(document).on("keydown",function(event){
    if(!started){
        started=true;
        $("h1").text("level "+level);
        nextSequence();
    }

});


function nextSequence()
{   
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    randomNo=Math.floor((Math.random()*4));
    randomChosenColor=buttonColors[randomNo];
    sequence.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    //generates next new box and adds a sound and css effect to chosen box
    //adds the new chosen box in the sequence array.
}


$("div.btn").click(function(){
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(latestPressedIndexByUser){
    if (userClickedPattern[latestPressedIndexByUser]===sequence[latestPressedIndexByUser]){
        //if user is pressing correctly according to the sequece from the beginning...you just wait.
        if (userClickedPattern.length ===sequence.length){
            //once u press all the correct btn as in sequence ..ie length of sequence and clicked pattern should 
            //match.
            setTimeout(function () {
                nextSequence();
                //inside nextsequence ..u r emptying the user clicked array...but sequence stays the same
                //one new box is added to existing sequence .
                //user has to click all the box in seqence from the beginning each time a box is pressed 
                //check answer is triggered..
            }, 1000);
        }
    } 
    else {
        $("h1").text("Game over!!! Press any key to restart the game..")
        var w=new Audio("./sounds/wrong.mp3");
        w.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function playSound(name){
    var sound=new Audio("./sounds/"+name+".mp3");
    sound.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");

    },100);
}




function startOver(){
    level=0;
    sequence=[];
    started=false;
}