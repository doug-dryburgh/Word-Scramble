$(document).ready(function () {
    var gameLetters = ["K", "J", "X", "Q", "Z", "F", "H", "V", "W", "Y", "B", "C", "M", "P", "G", "D", "D", "D", "U", "U", "U", "S", "S", "S", "L", "L", "L", "T", "T", "T", "T", "R", "R", "R", "R", "N", "N", "N", "N", "O", "O", "O", "O", "O", "A", "A", "A", "A", "A", "A", "I", "I", "I", "I", "I", "I", "E", "E", "E", "E", "E", "E", "E", "E"];
    var score = 0;
    //GENERATE GAME SQUARES
    for (var i = 1; i <= 64; i++) {
        $("#gameContainer").append('<div id="' + i + '" class="gameSquare"><h3></h3></div>');
    }
    //ASSIGN SQUARE
    for (var j = 1; j <= 64; j++) {
        var letter = gameLetters[Math.floor(Math.random() * gameLetters.length)];
        $("#" + j + " > h3").html(letter);
        var index = gameLetters.indexOf(letter);
        gameLetters.splice(index, 1);
    }
    //START
    $("#start").click(function () {
        $("#welcome").fadeOut();
        setTimeout(function () {
            $("#gameContainer").fadeIn();
            $("#gameContainer").css("display", "flex");
            $("#leftBar").fadeIn();
            $("#leftBar").css("display", "flex");
            $("#actionBar").fadeIn();
            $("#actionBar").css("display", "flex");
            startTime();
        }, 400);
    });
    //PLAY AGAIN
    $("#playAgain").click(function () {
        $("#scoreScreen").fadeOut();
        setTimeout(function () {
            $("#gameContainer").fadeIn();
            $("#gameContainer").css("display", "flex");
            $("#leftBar").fadeIn();
            $("#leftBar").css("display", "flex");
            $("#actionBar").fadeIn();
            $("#actionBar").css("display", "flex");
            startTime();
        }, 400);
        clearAll();
    });
    //TIMER
    function startTime() {
        var minutes = 4;
        var seconds = 0;
        $("#timer").html(minutes + ":0" + seconds);
        var clock = setInterval(function () {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(clock);
                    setTimeout(function () {
                        $("#gameContainer").fadeOut();
                        $("#leftBar").fadeOut();
                        $("#actionBar").fadeOut();
                        $("#finalScore").html(score + " points");
                        setTimeout(function () {
                            $("#scoreScreen").fadeIn();
                            $("#scoreScreen").css("display", "flex");
                        }, 400);
                    }, 1000);
                }
                else {
                    minutes--;
                    seconds = 59;
                }
            }
            else {
                seconds--;
            }
            if (seconds > 9) {
                $("#timer").html(minutes + ":" + seconds);
            }
            else {
                $("#timer").html(minutes + ":0" + seconds);
            }
        }, 1000);
    }
    //WORD SELECT
    var myWord = "";
    var squareSelected = [];
    var direction;
    $(".gameSquare").click(function () {
        var selected = parseInt(this.id);
        //SELECT ANYTHING AS NOTHING HAS BEEN CHOSEN
        if (squareSelected.length < 1) {
            selectWord();
        }
        //ALLOWS SELECTING 4 DIRECTIONS FOR 2ND LETTER
        else if (squareSelected.length === 1) {
            if (selected == squareSelected[0] + 1) {
                direction = "across";
                selectWord();
            }
            if (selected == squareSelected[0] + 8) {
                direction = "down";
                selectWord();
            }
            if (selected == squareSelected[0] - 7) {
                direction = "diagUp";
                selectWord();
            }
            if (selected == squareSelected[0] + 9) {
                direction = "diagDn";
                selectWord();
            }
        }
        //ONLY ALLOWS SELECTION IN THE SAME DIRECTION AS STARTED
        else if (squareSelected.length > 1) {
            if (direction == "across" && parseInt(selected) == parseInt(squareSelected[squareSelected.length - 1]) + 1) {
                selectWord();
            }
            if (direction == "down" && parseInt(selected) == parseInt(squareSelected[squareSelected.length - 1]) + 8) {
                selectWord();
            }
            if (direction == "diagUp" && parseInt(selected) == parseInt(squareSelected[squareSelected.length - 1]) - 7) {
                selectWord();
            }
            if (direction == "diagDn" && parseInt(selected) == parseInt(squareSelected[squareSelected.length - 1]) + 9) {
                selectWord();
            }
        }

        function selectWord() {
            $("#" + selected).addClass("highlight");
            myWord += $("#" + selected + "> h3").text();
            $("#word").append($("#" + selected + "> h3").text());
            squareSelected.push(selected);
        }
    });
    //CLEAR
    function clearHighlight() {
        for (var i = 1; i < 65; i++) {
            $("#" + i).removeClass("highlight");
        }
        myWord = "";
        squareSelected = [];
        $("#word").html("");
    }

    function clearAll() {
        for (var j = 1; j < 65; j++) {
            $("#" + j).removeClass("highlight");
            $("#" + j).removeClass("selected");
        }
        myWord = "";
        squareSelected = [];
        $("#word").html("");
        $("#acceptedWords").html("");
        score = 0;
        $("#score").html(score);
    }
    $("#clear").click(function () {
        clearHighlight();
    });
    //SUBMIT
    $("#submit").click(function () {
        //will check word in dictionary if accepted add to list/score, otherwise tell the player it's not a valid word.
        var index = wordSearch(myWord.toLocaleLowerCase());
        if (index < 0) {
            console.log("not a word");
            clearHighlight();
        }
        else {
            console.log("word brah");
            for (var k = 0; k < squareSelected.length; k++) {
                $("#" + squareSelected[k]).removeClass("highlight");
                $("#" + squareSelected[k]).addClass("selected");
            }
            scoreUpdate();
            clearHighlight();
        }
    });
    //SCORE
    $("#score").html(score);

    function scoreUpdate() {
        var wordLength = squareSelected.length;
        switch (wordLength) {
        case 2:
            score += 1;
            break;
        case 3:
            score += 2;
            break;
        case 4:
            score += 3;
            break;
        case 5:
            score += 5;
            break;
        case 6:
            score += 8;
            break;
        case 7:
            score += 13;
            break;
        case 8:
            score += 21;
        }
        $("#score").html(score);
        $("#acceptedWords").append("<li>" + myWord + "</li>");
    }
});