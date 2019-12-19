document.addEventListener("DOMContentLoaded", function () {
    let buttonStart = document.querySelector("#startGame");
    let newWord = document.querySelector('#newWord');
    buttons.addEventListener("click", startGame);

    let word = "tekst";
    let tab = [];
    let i, j, k;
    let counter = 13;
    let tempt = 1;

    $(document).keydown(function(e) {
        if (e.key === "Enter") { 
            clearGameBoard()
            //startGame();
            console.log("huj");
            
       }
    });

    function startGame() {
        document.querySelector(".conter-number").innerHTML = counter;
        document.querySelector("#counter").className = "counter";
        //Split word to letters
        for (i = 0; i < word.length; i++) {
            tab += [word.charAt(i)];
        };
        //Display letter in DOM
        for (j = 0; j < tab.length; j++) {
            document.querySelector('#word').innerHTML += '<div id="char' + j + '" class="char"></div>';
        }
    }
    //Testing if keyboard pressed key is in word
    document.onkeypress = function (evt) {
        evt = evt || window.event;
        let charCode = evt.keyCode || evt.which;
        let charStr = String.fromCharCode(charCode);
        console.log(charStr);

        for (k = 0; k < tab.length; k++) {
            if (tab[k] === charStr) {
                document.querySelectorAll("#char").innerHTML = tab[k];
                tempt = 1;
            }
            else {
                tempt = 0;
            }
        }
        if (tempt == 0) {
            counter--;
            document.querySelector("#counter").innerHTML = counter;
        }

    };





//Clearing game board

    function clearGameBoard(){
        let removeLetters = document.querySelectorAll(".char");
        if(removeLetters){
            console.log(removeLetters);
            removeLetters.parentNode.removeChild(removeLetters);
        }
    }


});