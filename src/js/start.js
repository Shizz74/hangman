document.addEventListener('DOMContentLoaded', function () {

    let hero = {
        name: "Tomirox",
        stats: {
            strength: 5,
            agility: 5,
            stamina: 5,
            intellect: 5,
            luck: 5
        },
        eq: {
            helemet: {
                val: 0,
                name: "",
                armor: 0,
                bonus: 0,
                minus: 0,
            },
            chest: {
                val: 0,
                name: "",
                armor: 0,
                bonus: 0,
                minus: 0,
            },
            gloves: {
                val: 0,
                name: "",
                armor: 0,
                bonus: 0,
                minus: 0,
            },
            legs: {
                val: 0,
                name: "",
                armor: 0,
                bonus: 0,
                minus: 0,
            },
            boots: {
                val: 0,
                name: "",
                armor: 0,
                bonus: 0,
                minus: 0,
            },
            weapon: {
                damage: 0,
                bonus: 0,
                minus: 0
            }
        }

    }



    document.querySelector("#startGame").addEventListener("click", startGame);
    const heroName = document.querySelector("#heroName").value;

    function startGame() {
        const heroName = document.querySelector("#heroName").value;
        if(heroName){
            hero.name = heroName;
        }
        
        localStorage.setItem('HeroStats', JSON.stringify(hero));
        document.querySelector('.start-container').className = "none";
        document.querySelector('.game-container').className = "vis";

    }


});