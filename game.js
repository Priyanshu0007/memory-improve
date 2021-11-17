var gamePattern=[];
var buttonColors=["red","blue","green", "yellow"];
var userClickedPattern=[];
var started = false;
var level = 0;

$(".masterButton").click (function(){
if(!started){
  $("#level-title").text("Level " + level);
  newSequence();
  started=true;
  }
});

$(".btn").click(function(event){
  var userChosenColour =event.currentTarget.getAttribute("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function playSound(color){
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}
function newSequence(){
  level++;
  document.querySelector(".masterButton").innerHTML="Level "+ level;
  userClickedPattern=[];
  var randomVariables=Math.floor(4*Math.random());
  var randomChosenColor=buttonColors[randomVariables];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);

}
function animatePress(currentColor){
  var activeButton = document.getElementsByClassName(currentColor);
  activeButton[0].classList.add("pressed");
  setTimeout(function(){
    activeButton[0].classList.remove("pressed");
  },100);
}
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
      if(userClickedPattern.length === gamePattern.length){
    setTimeout( newSequence, 1000);
    nextSequence();
    }
  }
  else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body")[0].classList.add("game-over");
    setTimeout(function(){
    $("body")[0].classList.remove("game-over");
    },200);
    document.querySelector(".masterButton").innerHTML="Game Over";
    startOver();
  }
}
function startOver(){
  gamePattern=[];
  level=0;
  started=false;
}
