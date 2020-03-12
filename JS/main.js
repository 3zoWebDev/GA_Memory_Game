/* -------------------------------------- Section one  for variables Declaration -------------------------------------- */


let allcards = document.querySelectorAll(".card");  // Store all Cards inside an Array
let card_Opened = [];    // to store opened cards and checking if matched or not
let img_cards = [];
let arr = [
"../../assets/img/cards/1.png",
"../../assets/img/cards/2.png",
"../../assets/img/cards/3.png",
"../../assets/img/cards/4.png",
"../../assets/img/cards/5.png",
"../../assets/img/cards/6.png",
"../../assets/img/cards/7.png",
"../../assets/img/cards/8.png",
"../../assets/img/cards/1.png",
"../../assets/img/cards/2.png",
"../../assets/img/cards/3.png",
"../../assets/img/cards/4.png",
"../../assets/img/cards/5.png",
"../../assets/img/cards/6.png",
"../../assets/img/cards/7.png",
"../../assets/img/cards/8.png",
];      //stroe all the img_card inside an array to shuffle them

let mov = document.querySelector('.moves');
let numMoves = 0;

let star = document.querySelectorAll('.fa-star');
let numStars = 5;

let second = 0, minute = 0;
let timer = document.querySelector(".timer"); //select the timer class
let interval;  //for setinterval to make the time strat after a secound

let restart = document.querySelector('.restart');
let matchedCard = [];

/* -- store all img inside a img_cards Array by using the Childeren inside the Class card -- */

 allcards.forEach(card => {
     let img = card.children[0];
     img_cards.push(img);
 });




/***************** Declare function to hide all cards and shuffle them to change the postion for each card ********************************/


function HideCard(){
       for(i of img_cards){
           $(i).hide();
       }
       shuffleCard();
 }

 /*************** Declare function to shuffle cards (imges) ******************************* */

function shuffle(array) {  //The Algorithm took from https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    let newPostion;
    let temp ;

   for(let i = array.length-1 ; i >= 0 ; i--){
    newPostion = Math.floor(Math.random() * (i+1));
    temp = array[i];
    array[i] = array[newPostion];
    array[newPostion] = temp;

   }
    return array;
}


function shuffleCard(){

    img_cards = shuffle(img_cards); // reasign the new shuffle to img_cards after change the old one
    //arr = shuffle(arr);

// now the shuffling not appear in my mockup html to make the shuffling apper in the UI ??
    for(let i =0 ; i < arr.length ; i++){
        img_cards[i].setAttribute("src",arr[i]);
    }


}
/*************************** check the cards when clicked if mached or Not ***************************************************/

 function cardClicked (){
    allcards.forEach(card => {
        card.addEventListener('click',(e)=>{
            let x = e.target.children[0];
            if(card_Opened.length < 2){
                $(x).css("display","block");
                card_Opened.push(x);
            }
            if(card_Opened.length == 2){
                setTimeout(matched, 500);
                moves();
            }
        });
    });
 }

function matched(){
    if(card_Opened[0].getAttribute("src") === card_Opened[1].getAttribute("src")){
        matchedCard.push(1);
        $(card_Opened[0]).show();
        $(card_Opened[1]).show();

    }else {
        $(card_Opened[0]).hide();
        $(card_Opened[1]).hide();
    }
    card_Opened = [];
    congratulations();
}




/***************Coding the score-panel ********************************** */

function moves(){
        mov.textContent = ++numMoves;
        stars();
        if (numMoves == 1) {
            second = 0;
            minute = 0;
            the_timer();
        }
}
function stars(){
    if (numMoves > 5 && numMoves < 10) {
         star[4].style.visibility = "collapse";
    }
    else if (numMoves >=10 && numMoves < 15 ) {
        star[3].style.visibility = "collapse";
    }
    else if (numMoves >=15 && numMoves < 20 ) {
        star[2].style.visibility = "collapse";
    }else if (numMoves >=20&& numMoves < 30 ) {
        star[1].style.visibility = "collapse";
    }

}
function the_timer(){
    interval = setInterval(function () {
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
    }, 1000);
 }

/***********************************************************************/
function  HideCardsAndRestThegame(){
    HideCard();
    numMoves = 0 ;
    mov.textContent = numMoves;
    second = 0;
    minute = 0;
    hour = 0;
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    for (let i = 0; i < star.length; i++) {
        star[i].style.visibility = "visible";
    }

}






/*******************************  Congrats Model *************************************/

//modal
let modal = document.getElementById("popup1")
//stars list
 let starsList = document.querySelectorAll(".stars li");
//close icon in modal
 let closeicon = document.querySelector(".close");
//congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 8){
        clearInterval(interval);
        finalTime = timer.innerHTML;
    //show congratulations modal
    modal.classList.add("show");
    //declare star rating variable
    let starRating = document.querySelector(".stars").innerHTML;
    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = numMoves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    //closeicon on modal
    closeModal();
    };
}

/*************************Close Model *********************/

//close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        HideCardsAndRestThegame();
    });
}
//for player to play Again
function playAgain(){
    modal.classList.remove("show");
    HideCardsAndRestThegame();
}


/****************************** To Start the Game ******************************************************* */
HideCardsAndRestThegame();
cardClicked();
restart.addEventListener('click', HideCardsAndRestThegame);



/******************************************************************/