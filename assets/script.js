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
