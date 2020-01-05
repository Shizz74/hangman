document.addEventListener("DOMContentLoaded", function () {


    // {
    //     buttons.addEventListener("click", function() {
    //         fetch("http://api.wordnik.com/v4/words.json/randomWord?api_key=n727snhb1o62rha1onsq6xrkvee2s44b0hj9z85ryicflb6yi")
    //         .then(resp => resp.json())    
    //         .then(resp => {
    //                 word = resp.word;
    //                 console.log("Podmieniona " + word);
    //                 startGame();
    //             })
    //     })
    // }


    function newSingeWord() {
        fetch("http://api.wordnik.com/v4/words.json/randomWord?api_key=n727snhb1o62rha1onsq6xrkvee2s44b0hj9z85ryicflb6yi")
            .then(resp => resp.json())
            .then(resp => {
                word = resp.word;
                console.log("Podmieniona " + word);
            })
    }


    let buttonStart = document.querySelector("#startGame");
    let newWord = document.querySelector('#newWord');

    buttonStart.addEventListener("click", startGame);
    newWord.addEventListener("click", clearGameBoard);

    let word = "test";
    let tab = [];
    let i, k;
    let counter = 13;
    let goodLetter = 0;
    let startGameCounter = 0;




    $(document).keydown(function (e) {
        if (e.key === "Enter") {
            if(startGameCounter == 0){
                console.log("startGameCounter wynosi: " + startGameCounter)
                startGame();
                startGameCounter = 1;
                console.log("startGameCounter wynosi: " + startGameCounter);
            }
            else {
                clearGameBoard();
                console.log("startGameCounter wynosi: " + startGameCounter)
            }
        }
    });

    // Start game with first word
    function startGame() {
        //newSingeWord();
        document.querySelector(".conter-number").innerHTML = counter;
        document.querySelector("#counter").className = "counter";
        //Split word to letters and display letter in DOM
        for (i = 0; i < word.length; i++) {
            tab += [word.charAt(i)];
            document.querySelector('#word').innerHTML += '<div id="char' + i + '" class="char">' + tab[i] + '</div>';
        };
        buttonStart.classList.add('dis-none')

        //Testing if keyboard pressed key is in word
        document.onkeypress = function (evt) {
            evt = evt || window.event;
            let charCode = evt.keyCode || evt.which;
            let charStr = String.fromCharCode(charCode);
            console.log(charStr);

            for (k = 0; k < tab.length; k++) {
                if (tab[k] === charStr) {
                    document.querySelectorAll("#char").innerHTML = tab[k];
                    goodLetter++;
                    console.log("dobrze " + tab[k] + " " + goodLetter)
                };
            };

            if (goodLetter == 0) {
                counter--;
                document.querySelector("#counter").innerHTML = counter;
            };

            goodLetter = 0;

        };
        //------------------------------------------------
    }
    //-----------------------------------------





    //Clearing game board and start new one

    function clearGameBoard() {
        let removeLetters = document.querySelector("#word");
        console.log("Czyszczenie");
        word = "";
        tab = [];
        console.log("Czyszczenie worda, słowo: " + word)
        word = "12345678";
        console.log("Dodanie cyfr jako slowo: " + word)
        while (removeLetters.firstChild) {
            removeLetters.removeChild(removeLetters.firstChild);
        }
        startGame();
    }
    //-------------------------------


//To do
// Enter change word but cunters is down. He need to be reset. 
// At 0 point it's need to be display a popup about lose and option to play again 
// Display keyboard after start the game, ane disamble them when user use that letters
// show word if user click right one.
// Display message about win, and option to play again. 
// And more.

});