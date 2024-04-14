// alert("Hey!");
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var debugMode = false;
var levelNumber = 0;
var randomChosenColor;

// Adding Audio
const audiogreen  = new Audio('./sounds/green.mp3');
const audioyellow = new Audio('./sounds/yellow.mp3');
const audiored    = new Audio('./sounds/red.mp3');
const audioblue   = new Audio('./sounds/blue.mp3');
const audioGameOver = new Audio("./sounds/wrong.mp3");

// Choosing random colour
// if (debugMode){  console.log(buttonColours);}

// Keydown event - initialise game 
$("body").on("keydown",generateFirstColour);

// Click listener - only runs code after the game started
$(".btn").on("click",function(){
  // Only when the level is not 0
  if (levelNumber != 0) {
    // store selected color
    var clickedColour = $(this).attr("id");

    // add user click to the pattern
    userClickedPattern.push(clickedColour);
    
    // if (debugMode){console.log("play: " + clickedColour);}
    if (debugMode){console.log("clicked pattern: " + userClickedPattern);}

    animateButton(clickedColour);
    playSound(clickedColour);

    // at each click, check if the answer is correct
    if (checkAnswer(userClickedPattern.length)){

     // if it is correct & fully entered the sequence, then generate a new colour
      if (userClickedPattern.length == gamePattern.length){
       // generate next colour after 2seconds
       setTimeout(generateNextColour, 1000)
      }
;
    } 
    // if not correct, game over, reset the game
    else {
      gameOver();
    }

  }
});

// game over
function gameOver(){
  if (debugMode){console.log("game over! " + levelNumber);}
  gameOverAnimation();
  levelNumber = 0;
}

function gameOverAnimation(){

  $("h1").text("Game Over, bebbie!");
  $("h1").after("<h2 id='sub-title'>Press any key to start again</h2>");
   audioGameOver.play();
   $("body").addClass("game-over");
   setTimeout(function(){
              $("body").removeClass("game-over");
              },200);
}

// check Answer
// userClickedPattern has to be checked against gamePattern
// the input is the current level, also the position of the last colour in the gamePattern
function checkAnswer(lastUserColour){

  // by default the result is false
  var index = lastUserColour - 1;
  var result = false;
  if (debugMode){console.log("start checking answer for lastUserColour: " + lastUserColour);}

  // answer in this position are the same
  if (debugMode){console.log("gamePattern: " + gamePattern[index]
                            + " userClickedPattern: " + userClickedPattern[index]);}

  if (gamePattern[index] == userClickedPattern[index]){
    result = true;
  }
  else {
    result = false;
  }

  if (debugMode){console.log("done checking user entry: " + result);}
  return result;
}

// Functions
// first colour
function generateFirstColour(){
  if (debugMode){
    console.log("initialise game: " + levelNumber)
  }
  // this happens both at the start as well as after a click
  if (levelNumber == 0){

    // saving andom generate colour 
          
        levelNumber = 0; 
        randomChosenColor =  nextSequence();
        gamePattern = [];
        userClickedPattern = []; 
            
  
    
        // add the colour to the game pattern array
        gamePattern.push(randomChosenColor);  
  
  
        if (debugMode){
          console.log("start game pattern: " + gamePattern)
        }
  
    }
}

// next colour
function generateNextColour(){
  // this happens both at the start as well as after a click
  if (levelNumber >= 0){

    // saving andom generate colour 
        randomChosenColor =  nextSequence();
  
      //  if (debugMode){    console.log("chosen colour = " + randomChosenColor)}:
  
        // add the colour to the game pattern array
        gamePattern.push(randomChosenColor);  
  
  
        if (debugMode){
          console.log("game pattern: " + gamePattern)
        }

        // every time a new color is generated, the userClickedPattern has to be completely re-entered
        if (debugMode){
          console.log("empty userClickedPattern.....")
        }
        userClickedPattern = []; 
  
    }
}

// Play sound
function playSound(colour){
    switch(colour){
      case "red": 
                  audiored.play();
                  break;
      case "yellow": 
                  audioyellow.play();
                  break;     
      case "green": 
                  audiogreen.play();
                  break;
      case "blue": 
                  audioblue.play();
                  break;  
      default:  
                break;                                                         
    }  ;
}

// Animation of Button 
function animateButton(choice){
  
  //if (debugMode){console.log("Starting animation for: " + choice)};
  $("#" + choice).addClass("pressed");
  setTimeout(removeAnimation,100,choice);
 
}

function removeAnimation(choice){
 //  if (debugMode){console.log("removing anumation: " + choice)};
  $("#" + choice).removeClass("pressed");
}

// Generate sequence - returns the color itself
function nextSequence(){
  
  // if (debugMode){console.log("Starting nextSequence")};
  var randomNumber = Math.floor(Math.random() * 4);

  // map color number to the actual colour name
  var randomColor = buttonColours[randomNumber];

 // if (debugMode){console.log("randomNumber = " + randomNumber + " = " + randomColor)};

  // Play animation & sound of random colour
  animateButton(randomColor);
  playSound(randomColor);

  // level +1
  levelNumber++;
  // change h1 
  $("h1").text("Level " + levelNumber);

  return randomColor;
}

