var drink;
var drinkInput;
var requestDrink;
var apiRootCocktailURL = 'http://www.thecocktaildb.com/api/json/v1/1/search.php?';
// var requestVideo;
// var apiRootYouTubeURL = '';

$('input').keyup(function(e){
    e.preventDefault();
    drinkInput = $('input#drinkInput').val();
    console.log(drinkInput);
});

$('#drinkSearch').click(function drinkParams(){
    var paramsString = 's=margarita';
    var searchParams = new URLSearchParams(paramsString);
    searchParams.set('s', drinkInput);
    var x = searchParams.toString();
    requestDrink = apiRootCocktailURL+x;
    console.log(requestDrink);
    getDrink(requestDrink);
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
