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
var gamesPlayed = 0;
var totalCorrectAnswers = 0;
var localTimeout;
var progressBarTimer = 0;
var localInterval;

// functions

function updateCard ( cardData) {
    $("#question").html( cardData.question);
    $("#a0").html( cardData.a0);
    $("#a1").html( cardData.a1);
    $("#a2").html( cardData.a2);
    $("#a3").html( cardData.a3);

}

// update the progress bar timing the question
function updateProgressBar(){
    progressBarTimer += 5;
    
    var progressString = String(progressBarTimer) + "%";
    console.log("Timer " + progressBarTimer + " " + progressString);
    $("#progressBar").css( "width", progressString);
    if (progressBarTimer === 100) {
        //stop timer
        clearInterval( localInterval);
        $("#progressBar").css( "width", "0%");
    }
}

function nextQuestion () {
    console.log("show next question card " + cardNumber);
    answerSelected = "";
    updateCard( questionCards[cardNumber]);
    $("#startScreen").hide();
    $("#answerScreen").hide();
    $("#gameScreen").show();

    localTimeout = setTimeout( resultScreen, 5000);
    // set up timer to update status bar
    progressBarTimer = 0;
    $("#progressBar").css( "width", "0%");
    localInterval = setInterval( updateProgressBar, 250);


}

// game has finished, this shows stats and button for next game
function summaryScreen() {

    // check to see of game was won - all answers correct
    if( questionsRight === questionCards.length){
        // won
        gamesWon ++;
    }
    else {
        gamesLost ++;
    }
    gamesPlayed ++;
    // update summary screen
    $("#summaryGames").text("Games played: " + gamesPlayed);
    $("#summaryGamesWon").text("Games won : " + gamesWon);
    $("#summaryGamesLost").text("Games Lost : " + gamesLost);
    $("#summaryQuestions").text("No of questions asked : " + questionCards.length);
    $("#summaryRight").text("No of answers correct : " + questionsRight);
    $("#summaryWrong").text("No of answers wrong : " + questionsWrong);

    $("#startScreen").hide();
    $("#answerScreen").hide();
    $("#gameScreen").hide();
    $("#summaryScreen").show();
}
function resultScreen (){
    console.log("show result screen");
    // update results in answer screen
    // stop timers
    clearInterval( localInterval);
    $("#resultQuestion").text("Question was: " +  questionCards[cardNumber].question);
    if ( answerSelected !== "") {
        $("#result").text("Your answer was: " + questionCards[cardNumber][answerSelected]);
    }
    else {
        $("#result").text("You didn't answer the question"); 
    }
    var c = questionCards[cardNumber].correctAnswer;
    $("#resultAnswer").text("Correct answer was: " + questionCards[cardNumber][c]);
    if ( answerSelected === "") {
        // timed out
        console.log("timed out");
        $("#answerBanner").text("You waited too long");
        questionsWrong ++;
    }
    else if ( answerSelected === questionCards[cardNumber].correctAnswer ){
        // correct answer
        console.log( "correct");
        $("#answerBanner").text("Your answer was correct !");
        questionsRight ++;
    }
    else {
        // wrong answer
        console.log("incorrect");
        $("#answerBanner").text("Your answer was wrong");
        questionsWrong ++;
    }
    $("#gameScreen").hide();
    $("#answerScreen").show();

    // next question
    cardNumber++;
    if( cardNumber === questionCards.length) {
        // seen all the questions so finish
        console.log("All questions answered");
        clearTimeout( localTimeout);
        localTimeout = setTimeout( summaryScreen, 3000);
    }
    else {
        // wait 3 seconds for user to see answers
        clearTimeout( localTimeout);
        localTimeout = setTimeout( nextQuestion, 3000);
        
    } 
}

// set up events on answer buttons
$(".answerButton").on("click", function() {
    answerSelected = this.id;
    console.log("pressed button " + answerSelected);
    // Stop counting time when user selects an answer
    clearTimeout( localTimeout);
    resultScreen();
    
});

$(".startButtonClass").on("click", function() {
    
    console.log("started game");
    // reset some variables
    cardNumber = 0;
    answerSelected = "";
    questionsRight = 0;
    questionsWrong = 0;
    updateCard( questionCards[cardNumber]);
    $("#startScreen").hide();
    $("#summaryScreen").hide
    ();
    $("#gameScreen").show();

    localTimeout = setTimeout( function(){
        resultScreen();
    }, 5000);

    // set up timer to update status bar
    progressBarTimer = 0;
    localInterval = setInterval( updateProgressBar, 250);
    
});
});