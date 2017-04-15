// Require the 'inquirer' package
var inquirer = require('inquirer');

// Import the flash cards constructor implementations
var flashCards = require('./flashCards.js');
// Import the full list of questions
var questionsCloze = require('./questionsCloze.js').questionsCloze;
var questionsBasic = require('./questionsBasic.js').questionsBasic;

// Variable that holds the cloze-deleted questions list
var clozeQuestions = [];
var basicQuestions = [];



// Populate the cloze-deleted questions list
for (var i = 0; i < questionsCloze.length; i++) {
	var q = new flashCards.ClozeCard(questionsCloze[i].full, questionsCloze[i].cloze);
	clozeQuestions.push(q);
}

// Populate the basic questions list
for (var i = 0; i < questionsBasic.length; i++) {
	var qb = new flashCards.BasicCard(questionsBasic[i].front, questionsBasic[i].back);
	basicQuestions.push(qb);
}

// What question the user is currently on
var currentQuestion = 0;

var start = function() {
  inquirer.prompt({
    name: "BasicOrCloze",
    type: "rawlist",
    message: "Would you like to play with [Basic] or [Cloze] flashcards?",
    choices: ["BASIC", "CLOZE"]
  }).then(function(answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.BasicOrCloze.toUpperCase() === "CLOZE") {
      cloze();
    }
    else {
      basic();
    }
  });
};
start();


function cloze() {
	inquirer.prompt([
		{
			type: 'input',
			message: clozeQuestions[currentQuestion].partial + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');

		// Check if the user has guessed correctly
		if (answers.userGuess.toLowerCase() === clozeQuestions[currentQuestion].cloze.toLowerCase()) {
			console.log('Correct!');

		} else {
			console.log('Incorrect!');

		}

		// Show the correct answer
		console.log(clozeQuestions[currentQuestion].full);
		console.log('-------------------------------------\n');

		// Advance to the next question
		if (currentQuestion < clozeQuestions.length - 1) {
			currentQuestion++;
			cloze();
		} else {
			console.log('Game Over!');
			console.log('-------------------------------------\n');

			// Prompt the user to play again
			playagain();
		}
	})
}

function basic() {
	inquirer.prompt([
		{
			type: 'input',
			message: basicQuestions[currentQuestion].front + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');

		// Check if the user has guessed correctly
		if (answers.userGuess.toLowerCase() === basicQuestions[currentQuestion].back) {
			console.log('Correct!');

		} else {
			console.log('Incorrect!');

		}

		// Show the correct answer
		console.log(basicQuestions[currentQuestion].back);
		console.log('-------------------------------------\n');

		// Advance to the next question
		if (currentQuestion < basicQuestions.length - 1) {
			currentQuestion++;
			basic();
		} else {
			console.log('Game Over!');
			console.log('-------------------------------------\n');

			// Prompt the user to play again
			playagain();
		}
	})
}

function playagain() {
	inquirer.prompt([
		{
			type: 'confirm',
			message: 'Would you like to play again?',
			name: 'playAgain'
		}
	]).then(function (answers) {
		if (answers.playAgain) {
			// Reset the game
			currentQuestion = 0;

			// Begin asking the questions!
			start();
		} else {
			// Exit the game
			console.log('Thanks for playing! Goodbye!');
		}
	})
}
// Begin asking the questions!
