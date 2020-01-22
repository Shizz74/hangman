document.addEventListener("DOMContentLoaded", function () {

    // For now don't use this script. Use function newSingleWord()
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





    let buttonStart = document.querySelector("#startGame");
    let newWord = document.querySelector('#newWord');
    let losePopup = document.querySelector(".popup-container");

    let word = "test";
    let tab = [];
    let i, k;
    let counter = 13;
    let goodLetter = 0;
    let startGameCounter = 0;
    let useLetter = [];
    let letterWasUse = 0;


    //buttonStart.addEventListener("click", startGame);
    //newWord.addEventListener("click", clearGameBoard);

    function newSingleWord() {
        fetch("http://api.wordnik.com/v4/words.json/randomWord?api_key=n727snhb1o62rha1onsq6xrkvee2s44b0hj9z85ryicflb6yi")
            .then(resp => resp.json())
            .then(resp => {
                word = resp.word;
                console.log("Podmieniona " + word);
            })
    }
    newSingleWord();


    $(document).keydown(function (e) {
        if (e.key === "Enter") {
            if (startGameCounter == 0) {
                startGame();
                losePopup.classList.add('dis-none');
                document.querySelector(".conter-number").innerHTML = counter;
                startGameCounter = 1;
            }
            else {
                return false;
            }
        }
    });

    // Start game with first word
    function startGame() {
        createKeyboard();
        counter = 14; // Change value of counter from 13 to 14
        console.log("Słowo to: " + word);
        document.querySelector("#counter").className = "counter";
        //Split word to letters and display letter in DOM
        for (i = 0; i < word.length; i++) {
            tab += [word.charAt(i)];
            document.querySelector('#word').innerHTML += '<div id="char' + i + '" class="char">' + tab[i] + '</div>';
        };

        //Testing if keyboard pressed key is in word
        document.onkeypress = function (evt) {
            evt = evt || window.event;
            let charCode = evt.keyCode || evt.which;
            let charStr = String.fromCharCode(charCode);
            console.log(charStr);
            //Test if letter was pressed before
            for(let m = 0; m< useLetter.length; m++){
                if( charStr == useLetter[m]){
                    letterWasUse = 1;
                }
                else {
                    letterWasUse = 0;
                }
            };

            if(letterWasUse == 0){
                // Tested if pressed key is uppercase or lowercase and it's a letter
            if (event.keyCode >= 97 && event.keyCode <= 122) {
                for (k = 0; k < tab.length; k++) {
                    if (tab[k] === charStr) {
                        document.querySelectorAll("#char").innerHTML = tab[k];
                        goodLetter++;
                        console.log("dobrze " + tab[k] + " " + goodLetter)
                        useLetter += tab[k];
                        console.log(useLetter)
                    };
                };

                


                // Checking if life is 0 and user lose
                if (goodLetter == 0) {
                    counter--;
                    document.querySelector(".conter-number").innerHTML = counter;

                    if (counter === 0) {
                        clearGameBoard();
                        startGameCounter = 0;
                        losePopup.classList.add('visible');
                        losePopup.classList.remove('dis-none');
                    }
                };

                goodLetter = 0;

            };
            }
        }
        //------------------------------------------------
    }
    //-----------------------------------------

    //Clearing game board and start new one

    function clearGameBoard() {
        let removeLetters = document.querySelector("#word");

        console.log("Czyszczenie");
        tab = [];
        useLetter = [];
        word = "";
        while (removeLetters.firstChild) {
            removeLetters.removeChild(removeLetters.firstChild);
        };
        losePopup.classList.add('dis-none');
        newSingleWord();
    }
    //-------------------------------

    //Create and display keyboard on screen.
    function createKeyboard() {
        document.querySelector('#letters').innerHTML =
            '<div class="topKeys">' +
            '<ul class="lettersList">' +
            '<li id="q">Q</li>' +
            '<li id="w">W</li>' +
            '<li id="e">E</li>' +
            '<li id="r">R</li>' +
            '<li id="t">T</li>' +
            '<li id="y">Y</li>' +
            '<li id="u">U</li>' +
            '<li id="i">I</li>' +
            '<li id="o">O</li>' +
            '<li id="p">P</li>' +
            '</ul>' +
            '</div>' +
            '<dvi class="midKeys">' +
            '<ul class="lettersList">' +
            '<li id="a">A</li>' +
            '<li id="s">S</li>' +
            '<li id="d">D</li>' +
            '<li id="f">F</li>' +
            '<li id="g">G</li>' +
            '<li id="h">H</li>' +
            '<li id="j">J</li>' +
            '<li id="k">K</li>' +
            '<li id="l">L</li>' +
            '</ul>' +
            '</dvi>' +
            '<div class="botKeys">' +
            '<ul class="lettersList">' +
            '<li id="z">Z</li>' +
            '<li id="x">X</li>' +
            '<li id="c">C</li>' +
            '<li id="v">V</li>' +
            '<li id="b">B</li>' +
            '<li id="n">N</li>' +
            '<li id="m">M</li>' +
            '</ul>' +
            '</div>'
    }
    //-------------------------------------


    //To do 
    // Display keyboard after start the game, ane disamble them when user use that letters
    // show letter if user click right one.
    // Display message about win, and option to play again. 
    // And more.

});