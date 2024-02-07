// Set of number images
var numberImages = [
    "/rhemsis.github.io/HomePage/apple.png", // Replace with your own number image paths
    "/rhemsis.github.io/HomePage/banana.png",
    https://rhemignacio.github.io/rhemsis.github.io/HomePage/cherry.png,
    "https://rhemignacio.github.io/rhemsis.github.io/HomePage/grapes.png",
    "https://rhemignacio.github.io/rhemsis.github.io/HomePage/orange.png"
    // Add more number images as needed
];

var score = 0;
var questionCount = 0;

// Generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a math problem and display it on the page
function generateProblem() {
    if (questionCount >= 8) {
        endGame();
        return;
    }

    var numIndex = getRandomNumber(0, numberImages.length - 1);
    var num1 = getRandomNumber(1, 5); // Range of numbers for image selection
    var num2 = getRandomNumber(1, 5); // Range of numbers for image selection
    var operator = getRandomNumber(0, 1); // 0 for addition, 1 for subtraction

    var question = "";
    var num1ImagesHtml = "";
    var num2ImagesHtml = "";
    var operatorImageSrc = "";

    if (operator === 0) {
        question = num1 + " + " + num2 + " = ";
        answer = num1 + num2;
        operatorImageSrc = "https://rhemignacio.github.io/rhemsis.github.io/HomePage/plus.png"; // Replace with your addition operator image
    } else {
        // Ensure num1 is always greater than or equal to num2 for subtraction
        num1 = Math.max(num1, num2);
        question = num1 + " - " + num2 + " = ";
        answer = num1 - num2;
        operatorImageSrc = "https://rhemignacio.github.io/rhemsis.github.io/HomePage/minus.png"; // Replace with your subtraction operator image
    }

    for (var i = 0; i < num1; i++) {
        num1ImagesHtml += "<img class='math-image' src='" + numberImages[numIndex] + "' alt='Number Image'>";
    }

    for (var j = 0; j < num2; j++) {
        num2ImagesHtml += "<img class='math-image' src='" + numberImages[numIndex] + "' alt='Number Image'>";
    }

    document.getElementById("question").innerHTML = question;
    document.getElementById("num1Images").innerHTML = num1ImagesHtml;
    document.getElementById("operatorImage").src = operatorImageSrc;
    document.getElementById("num2Images").innerHTML = num2ImagesHtml;
}

// Check the user's answer and display the result
function checkAnswer() {
    var userAnswer = parseInt(document.getElementById("answer").value);
    var result = "";

    if (userAnswer === answer) {
        result = "Correct!";
        document.getElementById("result").classList.add("correct");
        score += 10;
    } else {
        result = "Incorrect. Try again!";
        document.getElementById("result").classList.add("incorrect");
        score -= 5;
    }

    document.getElementById("result").innerHTML = result;
    document.getElementById("answer").value = "";
    document.getElementById("score").innerHTML = "Score: " + score;

    setTimeout(function () {
        document.getElementById("result").innerHTML = "";
        document.getElementById("result").classList.remove("correct", "incorrect");
    }, 1500);

    generateProblem(); // Generate a new problem after checking the answer
    questionCount++;
}

// End the game and display the final score
function endGame() {
    document.getElementById("question").innerHTML = "Game Over";
    document.getElementById("answer").disabled = true;
    document.getElementById("result").innerHTML = "Final Score: " + score;
}

// Initialize the game
function initializeGame() {
    generateProblem(); // Generate the first problem
}

// Call the initializeGame function when the page loads
window.onload = initializeGame;
