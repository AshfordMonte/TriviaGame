$(document).ready(function () {

  function startPage() {
    var startButton = $("<button>");
    startButton.addClass("start-button");
    startButton.html("<h3>Start</h3>");

    $(".container-body").append(startButton);
  }
  startPage();
  $(".start-button").on("click", function (event) {
    $(".container-body").empty();

    var timerDiv = $("<div>");
    timerDiv.addClass("row justify-content-md-center timerDiv");
    $(".container-body").append(timerDiv);
    
    timeStart();


  })



});

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
  console.log(time);
  $(".timerDiv").text("Time Remaining: " + time + " Seconds");
}