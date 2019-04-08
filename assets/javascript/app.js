// Javascript file for trivia game

// Array of Objects containing card information

$(document).ready(function(){

var questionCards = [
    {question : "What is the capital of Iceland ?",
    a0 : "New York",
    a1 : "Greenland",
    a2 : "Reyljavic",
    a3 : "Reykjavik",
    correctAnswer : "a3"
    },
    {question : "Fill in the blank: Monty Python's _______ Circus",
    a0 : "Flying",
    a1 : "Crazy",
    a2 : "Floating",
    a3 : "wild",
    correctAnswer : "a0"
    },
    {question : "A trash panda is also known as a ",
    a0 : "Chinese Panda",
    a1 : "Red Panda",
    a2 : "Racoon",
    a3 : "Purple Panda",
    correctAnswer : "a2"
    }
];

// Global variables
var cardNumber = 0;
var answerSelected = "";
var questionsRight = 0;
var questionsWrong = 0;
var gamesWon = 0;
var gamesLost = 0;
var totalCorrectAnswers = 0;
var localTimeout;

// functions

function updateCard ( cardData) {
    $("#question").html( cardData.question);
    $("#a0").html( cardData.a0);
    $("#a1").html( cardData.a1);
    $("#a2").html( cardData.a2);
    $("#a3").html( cardData.a3);

}

function resultScreen (){
    console.log("show result screen");
    $("#gameScreen").hide();
    $("#answerScreen").show();
}

// set up events on answer buttons
$(".answerButton").on("click", function() {
    answerSelected = this.id;
    console.log("pressed button " + answerSelected);
    // Stop counting time when user selects an answer
    clearTimeout( localTimeout);
    resultScreen();
    if( cardNumber === cardNumber.length) {
        // seen all the questions so finish
    }
    localTimeout = setTimeout( function(){
        resultScreen();
    }, 5000);
});

$(".startButtonClass").on("click", function() {
    
    console.log("started game");
    // reset some variables
    cardNumber = 0;
    answerSelected = "";
    updateCard( questionCards[cardNumber]);
    $("#startScreen").hide();
    $("#gameScreen").show();

    localTimeout = setTimeout( function(){
        resultScreen();
    }, 5000);
    
});
});