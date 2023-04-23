var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;



function nextSequence(){
	userClickedPattern = [];
	level++;
	$("h1").text("Level "+level);
	var randomNumber = Math.floor(Math.random()*4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	console.log(gamePattern);
	$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	
	playSound(randomChosenColour);
	
}



$(".btn").on("click",function(){
		var userChosenColour = $(this).attr("id");
		userClickedPattern.push(userChosenColour);
		console.log(userClickedPattern);
		playSound(userChosenColour);
		animatePress(userChosenColour);
		var indexOfTheLastAnswer = (userClickedPattern.length) - 1;
		checkAnswer(indexOfTheLastAnswer);
	
	});


function playSound(name){
	var audio = new Audio("sounds/"+name+".mp3");
		audio.play();
	// switch (name){
	// 	case "blue":
	// 		var audio = new Audio("sounds/blue.mp3");
	// 		audio.play();
	// 		break;

	// 	case "green":
	// 		var audio = new Audio("sounds/green.mp3");
	// 		audio.play();
	// 		break;

	// 	case "red":
	// 		var audio = new Audio("sounds/red.mp3");
	// 		audio.play();
	// 		break;

	// 	case "yellow":
	// 		var audio = new Audio("sounds/yellow.mp3");
	// 		audio.play();
	// 		break;

	// 	default:
	// 		console.log(randomChosenColour);
	// }
}

function animatePress(currentColour){
		$("."+currentColour).addClass("pressed");
		setTimeout(function() {
    	$("."+currentColour).removeClass("pressed");
    	}, 100);
}

$(document).keypress(function(){
	nextSequence();
});




function checkAnswer(currentLevel){
	
	
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
	}
	else{
		var audio = new Audio("sounds/wrong.mp3");
			audio.play();
		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
		},200);
		$("h1").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}

function startOver(){
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
}