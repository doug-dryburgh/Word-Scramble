$(document).ready(function () {
    var gameLetters = ["Y", "W", "K", "V", "X", "Z", "J", "Q", "F", "F", "B", "B", "G", "G", "H", "H", "M", "M", "L", "L", "L", "C", "C", "C", "U", "U", "U", "D", "D", "D", "P", "P", "P", "N", "N", "N", "E", "E", "E", "E", "A", "A", "A", "A", "R", "R", "R", "R", "I", "I", "I", "I", "O", "O", "O", "O", "T", "T", "T", "T", "S", "S", "S", "S"];
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
            $("#timer").fadeIn();
            $("#word").fadeIn();
            startTime();
        }, 400);
    });
    //TIMER
    function startTime() {
        var minutes = 4;
        var seconds = 0;
        $("#timer > h3").html(minutes + ":0" + seconds);
        var clock = setInterval(function () {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(clock);
                    setTimeout(function () {
                        $("#gameContainer").fadeOut();
                        $("#timer").fadeOut();
                        $("#word").fadeOut();
                        setTimeout(function () {
                            $("#score").fadeIn();
                            $("#score").css("display", "flex");
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
                $("#timer > h3").html(minutes + ":" + seconds);
            }
            else {
                $("#timer > h3").html(minutes + ":0" + seconds);
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
            $("#word > h3").append($("#" + selected + "> h3").text());
            squareSelected.push(selected);
        }
    });
    //CLEAR
    $("#clear").click(function () {
        for (var i = 1; i < 65; i++) {
            $("#" + i).removeClass("highlight");
        }
        myWord = "";
        squareSelected = [];
        $("#word > h3").html("");
    });
});