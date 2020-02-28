var numCorrect = 0;
var numWrong = 0;

$(document).ready(function () {

  function startPage() {
    var startButton = $("<button>");
    startButton.addClass("start-button");
    startButton.html("<h3>Start</h3>");

    $(".start-button").append(startButton);
  }
  startPage();

  $(".start-button").click(function (event) {
    event.stopPropagation();
    console.log("function called");
    $(".start-button").empty();

    var timerDiv = $("<div>");
    timerDiv.addClass("row justify-content-md-center timerDiv");
    $(".time-body").append(timerDiv);


    function buildTrivia() {
      $(".trivia").css("display", "block");
      $("#submit").css("display", "block");
      console.log("Build Trivia called");
      const output = [];

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
          output.push(
            `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join('')} </div>`
          );
        }
      );
      triviaContent.innerHTML = output.join('');
    }

    function showResults() {

      const answerContainers = triviaContent.querySelectorAll('.answers');


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
      console.log(numCorrect);
      console.log(numWrong);
      gameOver();
    }

    const triviaContent = document.getElementById('trivia-content');
    const submitButton = $("#submit");

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

    buildTrivia();

    submitButton.on("click", showResults);

    timeStart();

    var clockRunning = false;
    function timeStart() {
      $(".timerDiv").text("Time Remaining: " + time + " Seconds");

      if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
      }
    }
    var time = 30;
    function count() {
      time--;
      $(".timerDiv").text("Time Remaining: " + time + " Seconds");

      if (time === 0) {
        showResults();
      }
    }

  })
});

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