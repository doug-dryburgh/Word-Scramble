$(document).ready(function () {
    var gameLetters = ["Y", "W", "K", "V", "X", "Z", "J", "Q", "F", "F", "B", "B", "G", "G", "H", "H", "M", "M", "L", "L", "L", "C", "C", "C", "U", "U", "U", "D", "D", "D", "P", "P", "P", "N", "N", "N", "E", "E", "E", "E", "A", "A", "A", "A", "R", "R", "R", "R", "I", "I", "I", "I", "O", "O", "O", "O", "T", "T", "T", "T", "S", "S", "S", "S"]
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
        console.log(letter);
        console.log(gameLetters);
    }
    //console.log(Math.floor(Math.random() * gameLetters.length));    
});