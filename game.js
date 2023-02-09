var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    level++
    $("h1").text("Level " + level)
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 600)
        }
    } else {
        console.log("wrong")
        var wrong_sound = new Audio("static/sounds/wrong.mp3")
        wrong_sound.play()

        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
}

function makeSound(colour) {

    switch (colour) {
        case "red":
            var red_sound = new Audio("static/sounds/red.mp3");
            red_sound.play();
            break;
        case "blue":
            var blue_sound = new Audio("static/sounds/blue.mp3");
            blue_sound.play();
            break;
        case "green":
            var green_sound = new Audio("static/sounds/green.mp3");
            green_sound.play();
            break;
        case "yellow":
            var yellow_sound = new Audio("static/sounds/yellow.mp3");
            yellow_sound.play();
            break;
    }
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

$(".btn").click(function () {
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
})

$(document).keypress(function () {
    if (level === 0) {
        nextSequence()
    }
})