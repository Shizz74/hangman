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
    let losePopup = document.querySelector("#losePopup");
    let winPopup = document.querySelector("#winPopup");

    let word = "";
    let letterArray = [];
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
                winPopup.classList.add('dis-none');
                document.querySelector(".conter-number").innerHTML = counter;
                startGameCounter = 1;
            }
            else {
                //return false;
                console.log("to tu");
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
            letterArray += [word.charAt(i)];
            document.querySelector('#word').innerHTML += '<div id="char' + i + '" class="char"></div>';
        };
        //let newLetterArray = letterArray.split(",");
        let newLetterArray = [...letterArray];


        //Testing if keyboard pressed key is in word
        document.onkeypress = function (evt) {
            evt = evt || window.event;
            let charCode = evt.keyCode || evt.which;
            let charStr = String.fromCharCode(charCode);
            console.log(charStr);
            //Test if letter was pressed before
            for (let m = 0; m < useLetter.length; m++) {
                charStr == useLetter[m] ? letterWasUse = 1 : letterWasUse = 0
            }

            if (letterWasUse == 0) {
                useLetter += charStr;
                // Tested if pressed key is uppercase or lowercase and it's a letter
                if (event.keyCode >= 97 && event.keyCode <= 122) {
                    for (k = 0; k < letterArray.length; k++) {
                        if (letterArray[k] === charStr) {
                            document.querySelectorAll("#char").innerHTML = letterArray[k];
                            goodLetter++;
                            letter = document.querySelector('#' + charStr).classList.add('green');
                        };
                        //Delete letter form letterArray
                        for (let z = 0; z < newLetterArray.length; z++) {
                            if (charStr == newLetterArray[z]) {
                                console.log("letterArray: " + letterArray);
                                newLetterArray.splice(z, 1);
                                console.log("newletterArray: " + newLetterArray);
                                console.log(newLetterArray.length)
                            }
                        }
                    };
                    if(newLetterArray.length === 0){
                        winTheGame();
                    }




                    // Checking if life is 0 and user lose
                    if (goodLetter == 0) {
                        letter = document.querySelector('#' + charStr).classList.add('red');
                        counter--;
                        document.querySelector(".conter-number").innerHTML = counter;

                        if (counter === 0) {
                            clearGameBoard();
                            startGameCounter = 0;
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

    //Check if user guess word

    function winTheGame(){
            winPopup.classList.remove("dis-none");
            startGameCounter = 0;
            clearGameBoard();
    }

    //Clearing game board and start new one

    function clearGameBoard() {
        let removeLetters = document.querySelector("#word");

        console.log("Czyszczenie");
        letterArray = [];
        useLetter = [];
        word = "";
        while (removeLetters.firstChild) {
            removeLetters.removeChild(removeLetters.firstChild);
        };
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
    // lowercase and display "-" as other objcet
    // Display letters in box when select letters by users is correct.
    // Display message about win, and option to play again. 
    // And more.

});