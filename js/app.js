
$(document).ready(function(){
	var theNumber;
	var guessCount =0;
	var priorDifference;
	startGame();

	/*--- Display information modal box ---*/
	$(".what").click(function(){
		$(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

	$(".new").click(function(){
		startGame();
	})

	$("form").submit(function(event){
		event.preventDefault();
		var userGuess = $("#userGuess").val();
		if(validate(userGuess)){
			guessCount++;
			$('#count').text(guessCount);
			guess(userGuess);
			$('ul#guessList').append(
				"<li>"+
				userGuess
				+"</li>")
			priorDifference = difference(userGuess);
			$('#userGuess').val('');
		}
		else{
			$('#userGuess').val('');
		}
	})

	/* Function to start new game*/
	function startGame(){
		theNumber = Math.floor(Math.random()*100 +1);
		guessCount = 0;
		$('h2#feedback').text("Make your Guess!");
		$('#count').text(guessCount);
		$('ul#guessList').children().remove();	
	}
	/* Function for showing feedback*/
	function guess(number){	
		var currentDifference = difference(number);
		if (currentDifference >=50){
			$('h2#feedback').text("Ice cold");
		}
		else if (currentDifference >=30){
			$('h2#feedback').text("Cold");
		}
		else if (currentDifference >=20){
			$('h2#feedback').text("Warm");
		}
		else if (currentDifference >=10){
			$('h2#feedback').text("Hot");
		}
		else if (currentDifference >=1){
			$('h2#feedback').text("Very Hot");
		}
		else{
			$('h2#feedback').text("You Won! Click New Game to play again");
		}
		if(guessCount>1 && currentDifference!=0){
			if(priorDifference>currentDifference){
				$('h2#feedback').text("Warmer");	
			}
			else if (priorDifference==currentDifference){
				$('h2#feedback').text("That's the same number!");	
			}
			else{
				$('h2#feedback').text("Colder");	
			}
		}
	}

	function validate(number){
		if(isNaN(number)){
			alert("Not a number");
			return false;
		}
		else if(number<1 || number>100){
			alert("Out of Range - 1 to 100");
			return false;
		}
		else if(number%1!=0){
			alert("Only integers, please");
			return false;
		}
		else
			return true;
	}

	function difference(number){
		return Math.abs(number-theNumber);
	}

});


