// API Keys (Replace with your actual keys)
const COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const YOUTUBE_API_KEY = 'AIzaSyALVeo-GPPH2Qiw0MJbnfqwwjmFzHCLu1I';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsSection = document.getElementById('resultsSection');
const drinkName = document.getElementById('drinkName');
const drinkImg = document.getElementById('drinkImg');
const drinkIngredients = document.getElementById('drinkIngredients');
const drinkInstructions = document.getElementById('drinkInstructions');
const youtubeResults = document.getElementById('youtubeResults');
const commentForm = document.getElementById('commentForm');
const recentSearches = document.getElementById('recentSearches');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.querySelector('.close');

// Global variables
let recentDrinks = JSON.parse(localStorage.getItem('recentDrinks')) || [];

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
commentForm.addEventListener('submit', handleCommentSubmit);
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Add event listeners to recommendation cards
document.querySelectorAll('.recommendation').forEach(card => {
    card.addEventListener('click', () => {
         searchInput.value = card.getAttribute('data-drink');
            handleSearch();
    });
});
        


function init(){
    console.log(localStorage.getItem('drinks'));
    if (localStorage.getItem('drinks') === null) {
        return;
    } else {
        recentDrinks = JSON.parse(localStorage.getItem('drinks'));
        var slice = recentDrinks.slice(0,3);
        // const iterator = slice.values();
        var d = document.createElement('p');
        var e = document.createTextNode('Recent Searches');
        d.append(e);
        d.setAttribute('class','recent-searches');
        document.getElementById('cocktailSearch').append(d);
        console.log(slice);
            for (i = 0; i < slice.length; i++){
            let x = document.createElement('button');
            x.innerHTML = slice[i];
            x.setAttribute('id',slice[i]);
            x.setAttribute('type','button');
            x.setAttribute('class','custom-button-class');
            x.addEventListener('click', function() {
                searchRecentDrinks(x.innerHTML);
                });
            document.getElementById('cocktailSearch').append(x);
        }
    }
}

function searchRecentDrinks(input){
    document.getElementById("drinkPhoto").innerHTML = "";
    document.getElementById("drinkName").innerHTML = "";
    document.getElementById("drinkInst").innerHTML = "";
    document.getElementById("drinkIngr").innerHTML = "";
    document.getElementById("youTubeVid1").innerHTML = "";

    var paramsString = 's={drink name}';
    var searchParams = new URLSearchParams(paramsString);
    searchParams.set('s', input);
    var x = searchParams.toString();

    requestDrink = apiRootCocktailURL+x;
    console.log(requestDrink);
    getDrink(requestDrink);
    
    var paramsString = 'q={search term}';
    var searchParams = new URLSearchParams(paramsString);
    searchParams.set('q', 'recipe'+input);
    var x = searchParams.toString();
    requestVideo = apiRootYouTubeURL+youtubeApiKey+x;
    console.log(requestVideo);
    getVideo(requestVideo);
}

$('#search').click(function drinkParams(){
    var paramsString = 's={drink name}';
    var searchParams = new URLSearchParams(paramsString);
    searchParams.set('s', input);
    var x = searchParams.toString();
    requestDrink = apiRootCocktailURL+x;
    console.log(requestDrink);
    getDrink(requestDrink);
    storeDrink();
});

$('#search').click(function videoParams(){
    var paramsString = 'q={search term}';
    var searchParams = new URLSearchParams(paramsString);
    searchParams.set('q', 'recipe'+input);
    var x = searchParams.toString();
    requestVideo = apiRootYouTubeURL+youtubeApiKey+x;
    console.log(requestVideo);
    getVideo(requestVideo);
});

function getDrink(requestDrink){
    fetch(requestDrink)
        .then(function(response){
        return response.json()
        })
        .then(function(data){
            console.log(data.drinks);
            var drinkName = document.createElement('h1');
            drinkName.textContent = data.drinks[0].strDrink;
            $('h1#drinkName').append(drinkName);
            var drinkIng1 = document.createElement('li');
            drinkIng1.textContent = data.drinks[0].strIngredient1;
            var drinkIng2 = document.createElement('li');
            drinkIng2.textContent = data.drinks[0].strIngredient2;
            var drinkIng3 = document.createElement('li');
            drinkIng3.textContent = data.drinks[0].strIngredient3;
            var drinkIng4 = document.createElement('li');
            drinkIng4.textContent = data.drinks[0].strIngredient4;
            var drinkIng5 = document.createElement('li');
            drinkIng5.textContent = data.drinks[0].strIngredient5;
            var a = document.createElement('ul');
            $(a).append(drinkIng1);
            $(a).append(drinkIng2);
            $(a).append(drinkIng3);
            $(a).append(drinkIng4);
            $(a).append(drinkIng5);
            $('div#drinkIngr').append(a);
            var drinkInst = document.createElement('p');
            drinkInst.textContent = data.drinks[0].strInstructions;
            $('div#drinkInst').append(drinkInst);
            var thumbNail = data.drinks[0].strDrinkThumb;
            var drinkPhoto = document.createElement('img');
            drinkPhoto.setAttribute('src',thumbNail);
            $('figure#drinkPhoto').append(drinkPhoto);
        });
}

function getVideo(requestVideo){
    fetch(requestVideo)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
        searchResultsVid1 = data.items[0].id.videoId;
        youTubeVid1 = youTubeRoot + searchResultsVid1;
        var a1 = document.createElement('iframe');
        a1.setAttribute('class','has-ratio');
        a1.setAttribute('width','640');
        a1.setAttribute('height','360');
        a1.setAttribute('src',youTubeVid1);
        var b1 = document.createElement('figure');
        b1.setAttribute('class','image is-16by9');
        $(b1).append(a1);
        $('div#youTubeVid1').append(b1);    
    });
}
init();
});


// ****************************** Handlers ***************************************************** //
// Select increment and decrement button elements
// var count = 0;
// var btnSearchEl = document.querySelector("#increment");
// var countEl = document.querySelector("#count");
// // var hideCardsEl = document.querySelector("#hideCards");

// // Updates count on page
// function setCounterText() {
//     countEl.textContent = count;
// }

// function increment(event) {
//     console.log(event);
//     //
// }


// // Attach event listener to increment button element
// btnSearchEl.addEventListener("click", increment);
// // Attach event listener to decrement button element
// hideCardsEl.addEventListener("click", hideCardsEl);
