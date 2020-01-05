document.addEventListener("DOMContentLoaded", function () {
    
    // {
    //     buttons.addEventListener("click", function() {
    //         fetch("http://api.wordnik.com/v4/words.json/randomWord?api_key=n727snhb1o62rha1onsq6xrkvee2s44b0hj9z85ryicflb6yi")
    //         .then(resp => resp.json())    
    //         .then(resp => {
    //                 console.log("Przykład 1:");
    //                 console.log(resp.word);
    //                 word = resp.word;
    //                 console.log("Podmieniona " + word);
                    
    //             })
    //     })
    // }
    
    let buttonStart = document.querySelector("#startGame");
    let newWord = document.querySelector('#newWord');
    
    buttons.addEventListener("click", startGame);

    let word = "Test";
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
            document.querySelector('#word').innerHTML += '<div id="char' + j + '" class="char"></div>';
        };
        //Display letter in DOM
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