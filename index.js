/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
    
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");
    
        // add the class game-card to the list
        gameCard.classList.add("game-card");
    
        // set the inner HTML using a template literal to display some info 
        // about each game, including the image
        gameCard.innerHTML = `
            <div class="game-img">
                <img src="${game.img}" alt="${game.name}" id="game-image">
            </div>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;
    
        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// grab the contributions card element
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set the inner HTML using a template literal and toLocaleString to get a number with commas
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
// set inner HTML using template literal
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let games = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(games);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let games = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(games);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

function searchGames() {
    deleteChildElements(gamesContainer);

    // grab the search input element
    const searchInput = document.getElementById("search-bar");

    // use filter() to get a list of games that have met or exceeded their goal
    let games = GAMES_JSON.filter(game => game.name.toLowerCase().includes(searchInput.value.toLowerCase()));

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(games);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const searchBtn = document.getElementById("search-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
searchBtn.addEventListener("click", searchGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
let numUnfundedGames = unfundedGames.length;


// create a string that explains the number of unfunded games using the ternary operator
const underfundedGamesString = `Currently $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} game${GAMES_JSON.length === 1 ? "" : "s"}. Currently, ${numUnfundedGames} game${numUnfundedGames === 1 ? "" : "s"} remain unfunded. We need your help to fund these amazing games!.`;

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = underfundedGamesString;
descriptionContainer.appendChild(descriptionElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...remainingGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("div");
firstGameElement.innerHTML = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("div");
secondGameElement.innerHTML = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

// current key: toLocaleString<div>1ivy