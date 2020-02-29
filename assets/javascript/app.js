// Stores amount of answers correct and incorrect
var numCorrect = 0;
var numWrong = 0;

// When webpage loads
$(document).ready(function () {

  // Function that creates starting page
  function startPage() {
    var startButton = $("<button>");
    startButton.addClass("start-button");
    startButton.html("<h3>Start</h3>");

    $(".start-button").append(startButton);
  }
  startPage(); // Calls for starting page to be made

  // Function that runs when start button is clicked
  $(".start-button").click(function (event) {
    // Prevents duplicate clicking
    event.stopPropagation();
    // Empties div to allow new information
    $(".start-button").empty();

    // Creates div to show time left
    var timerDiv = $("<div>");
    timerDiv.addClass("row justify-content-md-center timerDiv");
    $(".time-body").append(timerDiv);

    // Function that outputs all trivia info from questions object
    function buildTrivia() {
      // Reveals information
      $(".trivia").css("display", "block");
      $("#submit").css("display", "block");
      console.log("Build Trivia called");
      const output = [];

      // Runs through questions object and puts them into HTML elements
      questionsObject.forEach(
        (currentQuestion, questionNumber) => {
          const answers = [];

          for (letter in currentQuestion.answers) {
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
                </label>`
            );
          }
          // Pushes HTML elements to page
          output.push(
            `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join('')} </div>`
          );
        }
      );
      triviaContent.innerHTML = output.join('');
    }

    // Function that will find how many answers were chosen right or wrong
    function showResults() {

      const answerContainers = triviaContent.querySelectorAll('.answers');


      // Checks each element in the object for correctness
      questionsObject.forEach((currentQuestion, questionNumber) => {

        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
          numCorrect++;
        }
        else {
          numWrong++;
        }
      });
      // Calls game over function to end program
      gameOver();
    }

    // Storese element of button and trivia section
    const triviaContent = document.getElementById('trivia-content');
    const submitButton = $("#submit");

    // Stores all questions and answers in an object to be read later
    const questionsObject = [
      {
        question: "Which band is known for 'defining' heavy metal?",
        answers: {
          a: "Yes",
          b: "Genesis",
          c: "Black Sabbath",
          d: "The Beatles"
        },
        correctAnswer: "c"
      },
      {
        question: "Who was the lead singer for the band Led Zeppelin?",
        answers: {
          a: "Robert Plant",
          b: "John Paul Johns",
          c: "Jimmy Page",
          d: "John Bonham"
        },
        correctAnswer: "a"
      },
      {
        question: "Who played bass for the band Yes?",
        answers: {
          a: "Rick Wakeman",
          b: "Chris Squire",
          c: "Jon Anderson",
          d: "Bill Bruford"
        },
        correctAnswer: "b"
      },
      {
        question: "Which Beatles album contained the infamous song 'Helter Skelter'?",
        answers: {
          a: "The Beatles",
          b: "Yellow Submarine",
          c: "Abbey Road",
          d: "Please Please me"
        },
        correctAnswer: "a"
      },
      {
        question: "Who was the original vocalist for AC/DC?",
        answers: {
          a: "Angus Young",
          b: "Ozzy Osbourne",
          c: "Brian Johnson",
          d: "Bon Scott"
        },
        correctAnswer: "d"
      },
    ]
    
    // Calls for trivia to be built
    buildTrivia();

    // Calls for game to be ended when done button is clicked
    submitButton.on("click", showResults);

    // Starts time countdown
    timeStart();

    // Function that creates interval and prevents it from speeding up
    var clockRunning = false;
    function timeStart() {
      $(".timerDiv").text("Time Remaining: " + time + " Seconds");

      if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
      }
    }
    // Function that decrements time and outputs it
    var time = 30;
    function count() {
      time--;
      $(".timerDiv").text("Time Remaining: " + time + " Seconds");

      // Calls for game end if timer hits 0
      if (time === 0) {
        showResults();
      }
    }

  })
});

// Function that shows end game stats
function gameOver() {
  $(".game").empty();
  clearInterval(intervalId);
  clockRunning = false;

  var gameStatus = $("<div>");
  gameStatus.addClass("row justify-content-md-center");
  gameStatus.html("<h2>All done!</h2>");

  var gameData1 = $("<div>");
  gameData1.addClass("row justify-content-md-center h2");
  gameData1.text("Correct Answers: " + numCorrect);

  var gameData2 = $("<div>");
  gameData2.addClass("row justify-content-md-center h2");
  gameData2.text("Incorrect Answers: " + numWrong);

  $(".game").append(gameStatus);
  $(".game").append(gameData1);
  $(".game").append(gameData2);
}