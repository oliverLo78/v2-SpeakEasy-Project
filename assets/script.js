var recentDrinks = [];
var drink;
var input;
var requestDrink;
var apiRootCocktailURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';
var requestVideo;
var apiRootYouTubeURL = 'https://www.googleapis.com/youtube/v3/search?maxResults=3&safeSearch=moderate&videoEmbeddable=true&type=video&part=snippet&key=AIzaSyC5toGw1SSB32wE6uogT2Hk25_CWavryVo&';
var youTubeVid1;
var youTubeVid2;
var youTubeVid3;
var youTubeRoot = 'https://www.youtube.com/embed/';
var searchResultsVid1;
var searchResultsVid2;
var searchResultsVid3;

$(document).ready(function(){
    
$('input').keyup(function(e){
    e.preventDefault();
    input = $('input#userInput').val();
});

// Reload page function
// $('#reloadPage').click(function(){
//     location.reload(true);
// });

function storeDrink (){
    var t = input.toUpperCase();
    recentDrinks.unshift(t);
    localStorage.setItem('drinks',JSON.stringify(recentDrinks));
}

    function init(){
    if (recentDrinks = null) {
        return;
    } else {
        recentDrinks = JSON.parse(localStorage.getItem('drinks'));
        var slice = recentDrinks.slice(0,3);
        const iterator = slice.values();
        var d = document.createElement('p');
        var e = document.createTextNode('Recent Searches');
        d.append(e);
        d.setAttribute('class','has-text-centered');
        document.getElementById('cocktailSearch').append(d);
        for (const input of iterator) {
        var x = document.createElement('button');
        var z = document.createTextNode(input);
        x.setAttribute('class','has-text-centered');
        x.setAttribute('class','ml-6');
        x.setAttribute('style','width: 255px');
        x.appendChild(z);
        document.getElementById('cocktailSearch').append(x);
    }
}
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
    // $('div#cocktailSearch').css('display','none');
    // $('div#anotherDrink').css('display','block');
});

// $('#search').click(function videoParams(){
//     var paramsString = 'q={search term}';
//     var searchParams = new URLSearchParams(paramsString);
//     searchParams.set('q', 'recipe'+input);
//     var x = searchParams.toString();
//     requestVideo = apiRootYouTubeURL+x;
//     console.log(requestVideo);
//     getVideo(requestVideo);
// });

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
