var drink;
var input;
var requestDrink;
var apiRootCocktailURL = 'http://www.thecocktaildb.com/api/json/v1/1/search.php?';
var requestVideo;
var apiRootYouTubeURL = 'https://www.googleapis.com/youtube/v3/search?';

$('input').keyup(function(e){
    e.preventDefault();
    input = $('input#userInput').val();
    console.log(input);
});

$('#search').click(function drinkParams(){
    var paramsString = 's=margarita';
    var searchParams = new URLSearchParams(paramsString);
    searchParams.set('s', input);
    var x = searchParams.toString();
    requestDrink = apiRootCocktailURL+x;
    console.log(requestDrink);
    getDrink(requestDrink);
});

$('#search').click(function videoParams(){
    var paramsString = 'q={search term}&type=video&part=snippet&key=AIzaSyC5toGw1SSB32wE6uogT2Hk25_CWavryVo';
    var searchParams = new URLSearchParams(paramsString);
    searchParams.set('q', input);
    var x = searchParams.toString();
    requestVideo = apiRootYouTubeURL+x;
    console.log(requestVideo);
    getVideo(requestVideo);
});

function getDrink(requestDrink){
    fetch(requestDrink)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
        console.log(data);
        });
}

function getVideo(requestVideo){
    fetch(requestVideo)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
        console.log(data);
        });
}

// Create a div element to store API data
// var favoriteEl = document.createElement('div');

// Create ordered list elements for recipe
// var recipeEl = document.createElement('ol');

// Create ordered list for ingredients
// var li1 = document.createElement('li');
// var li2 = document.createElement('li');
// var li3 = document.createElement('li');
// var li4 = document.createElement('li');
// var li5 = document.createElement('li');

// Add text for list
// li1.textContent = "Pitbulls ";
// li2.textContent = "Sushi ";
// li3.textContent = "DR food ";
// li4.textContent = "Gym ";
// li5.textContent = "Jiu-Jitsu ";

// body.appendChild(favoriteEl);

// Put it on the page
// favoriteEl.appendChild(recipeEl);

// Add styling to list element change the background color
// recipeEl.setAttribute("style", "background: #333333; padding:20px;");

// Add styling to list items
// li1.setAttribute("style", "color:white; background: #666666; padding: 5px; margin-left: 35px;");
// li2.setAttribute("style", "color:white; background: #777777; padding: 5px; margin-left: 35px;");
// li3.setAttribute("style", "color:white; background: #888888; padding: 5px; margin-left: 35px;");
// li4.setAttribute("style", "color:white; background: #999999; padding: 5px; margin-left: 35px;");
// li5.setAttribute("style", "color:white; background: #555555; padding: 5px; margin-left: 35px;");


// ****************************** Handlers ***************************************************** //
// Select increment and decrement button elements
var count = 0;
var btnSearchEl = document.querySelector("#increment");
var countEl = document.querySelector("#count");
// var hideCardsEl = document.querySelector("#hideCards");

// Updates count on page
function setCounterText() {
    countEl.textContent = count;
}

function increment(event) {
    console.log(event);
    //
}


// Attach event listener to increment button element
btnSearchEl.addEventListener("click", increment);
// Attach event listener to decrement button element
hideCardsEl.addEventListener("click", hideCardsEl);


