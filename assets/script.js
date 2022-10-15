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
