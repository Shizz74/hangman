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
    // let svgWood1 = document.querySelector('#wood-1');
    // let svgWood2 = document.querySelector('#wood-2');
    // let svgWood3 = document.querySelector('#wood-3');
    // let svgWood4 = document.querySelector('#wood-4');
    // let svgWood5 = document.querySelector('#wood-5');
    // let head = document.querySelector('#head-line');
    // let svgArmRight = document.querySelector('#arm-right');
    // let svgArmLeft = document.querySelector('#arm-left');
    // let svgLegLeft = document.querySelector('#leg-left');
    // let svgLegRight = document.querySelector('#leg-right');
    // let svgCorpse = document.querySelector('#corpse');
    const Svg = ['#wood-1', '#wood-2', '#wood-3', '#wood-4', '#wood-5', '#head-line', '#arm-right', '#arm-left', '#leg-left', '#leg-right', '#corpse']

    for(let i = 0; i<Svg.length; i++){
        document.querySelector(Svg[i]).classList.add('dis-none');
    }



    const apiUrl = "api_key=n727snhb1o62rha1onsq6xrkvee2s44b0hj9z85ryicflb6yi";
    const randomWordUrl = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=interjection%2Cpronoun%2Cpreposition%2Cabbreviation%2Caffix%2Carticle%2Cauxiliary-verb%2Cconjunction%2Cdefinite-article%2Cfamily-name%2Cgiven-name%2Cidiom%2Cimperative%2Cnoun-plural%2Cpast-participle%2Cproper-noun%2Cproper-noun-plural%2Csuffix%2Cverb-intransitive%2Cverb-transitive&";
    const wordDefinitionUrl = "https://api.wordnik.com/v4/word.json/" + word + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&";
    let word = "";
    let letterArray = [];
    let i, k;
    let counter = 11;
    let goodLetter = 0;
    let startGameCounter = 0;
    let useLetter = [];
    let letterWasUse = 0;
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'q', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let checkAlphabet = 0;
    let word2 = [];
    let word22;
    let definition;


    // ,noun-posessive
    // ,phrasal-prefix
    // ,proper-noun-posessive



    //buttonStart.addEventListener("click", startGame);
    //newWord.addEventListener("click", clearGameBoard);

    function newSingleWord() {
        fetch(randomWordUrl + apiUrl)
            .then(resp => resp.json())
            .then(resp => {
                word = resp.word;
                if(word) {
                    wordDefinition();
                    console.log(`odpalam ${word}`);
                }
                checkAlphabet = 0;
                console.log("Test: " + checkAlphabet);
                console.log("Słowo to: " + word);
                word = word.toLowerCase();
                console.log("Zmienjszone słowo to: " + word);
                word2 = [...word];
                word22 = word2.length;
                for (let w = 0; w < word2.length; w++) {
                    //console.log("word2[w]: " + word2[w])
                    for (let x = 0; x < alphabet.length; x++) {
                        if (word2[w] === alphabet[x]) {
                            //console.log("alphabet[x]: " + alphabet[x])
                            checkAlphabet += 1;
                        }
                    }
                }
                console.log(word2.length + " and " + checkAlphabet);
                console.log(word2);
                console.log("Podmieniona " + word);
                if (checkAlphabet !== word22 /*word22 its only for now, and it's words length*/) {
                    newSingleWord();
                    console.log("Odpałka");
                }
                console.log(`Definicja ${definition}`);
            })
    }


    function wordDefinition() {
        fetch(wordDefinitionUrl + apiUrl)
            .then(resp => resp.json())
            .then(resp => {
                definition = resp.text;
            })
    }
    

    newSingleWord();


    $(document).keydown(function (e) {
        if (e.key === "Enter") {
            if (startGameCounter == 0) {
                startGame();
                losePopup.classList.add('dis-none');
                winPopup.classList.add('dis-none');
                //document.querySelector(".conter-number").innerHTML = counter;
                startGameCounter = 1;
            }
            else {
                return false;
            }
        }
    });

    // Start game with first word
    function startGame() {
        console.log(Svg);
        document.onkeydown = function (e) {
            return true
        }
        createKeyboard();
        counter = 11;
        console.log("Słowo to: " + word);
        document.querySelector("#counter").className = "counter";
        //Split word to letters and display letter in DOM
        for (i = 0; i < word.length; i++) {
            letterArray += [word.charAt(i)];
            console.log("Przeliterowanie: " + word[i]);
            document.querySelector('#word').innerHTML += '<div class="char ' + word[i] + '"></div>';
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
                if (evt.keyCode >= 97 && evt.keyCode <= 122) {
                    for (k = 0; k < letterArray.length; k++) {
                        if (letterArray[k] === charStr) {
                           let displayLetters = []; 
                            displayLetters = document.querySelectorAll('.' + charStr);
                            for(let i = 0; i < displayLetters.length; i++){
                                displayLetters[i].innerHTML = charStr;
                            }
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
                    if (newLetterArray.length === 0) {
                        winTheGame();
                        document.onkeydown = function (e) {
                            if (e.key === "Enter") {
                                return true
                            }
                            else {
                                return false;
                            }
                        }
                    }




                    // Checking if life is 0 and user lose
                    if (goodLetter == 0) {
                        letter = document.querySelector('#' + charStr).classList.add('red');
                        counter--;
                        //document.querySelector(".conter-number").innerHTML = counter;

                        if (counter === 0) {
                            clearGameBoard();
                            startGameCounter = 0;
                            losePopup.classList.remove('dis-none');
                            document.onkeydown = function (e) {
                                if (e.key === "Enter") {
                                    return true
                                }
                                else {
                                    return false;
                                }
                            }
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
    function winTheGame() {
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
    //check if all of the letters is in en/pl dictionary from a-z
    // lowercase and display "-" as other objcet
    // Display letters in box when select letters by users is correct.
    // Display message about win, and option to play again. 
    // Hide api key
    // Add hint for 1/2 of points
    //download definition
    // And more.
});