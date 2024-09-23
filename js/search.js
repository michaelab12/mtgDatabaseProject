window.addEventListener('keydown', keyboardListener ,false);
const href = window.location.href;

//listener used to listen for search
//activates either when the search button is pressed or
//enter is pressed with text box selected
//activated api call function if valid
function keyboardListener(event){
    key = event.key;
    var active = document.activeElement.id;
    if(key == "Enter" && active == "searchBox"){
        let query = document.getElementById('searchBox').value;
        let newPage = new URL(window.location.href);
        newPage.searchParams.set('search', query);
        window.location.href = newPage.toString();
    }
}

//used when the button is pressed
//for now only used to call async api function
//may change later
function buttonListener(){
    let query = document.getElementById('searchBox').value;
    let newPage = new URL(window.location.href);
    newPage.searchParams.set('search', query);
    window.location.href = newPage.toString();
}

//async function used to get card results
//uses input query and WOTC api to get
//resulting list of cards
//@param query: the search input by the user
async function getCards(url){
    try{
        const response = await fetch(url.toString());
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
          }
        const json = await response.json();
        return json;
    }
    catch(error){
        console.log("An Error Occured");
    }
    return null;
}

//function used when user makes a search request
//splits the string into tokens and appends
//then to url object
async function searchResults(query){
    url = new URL("https://api.scryfall.com/cards/search")
    url.searchParams.append("q", query);
    json = await getCards(url);
    let result = document.getElementById('result');
    if(json == null){
        result.textContent = "No results found";
    }
    else{
        result.textContent = query + " results: "+ json.total_cards;
        displayResult(json);
    }
}

//function used to display the results
//to the html page
function displayResult(json){
    console.log(json);
    let data = json.data;
    let list = '<ul>';
    data.forEach(element => {
        list += '<li><a href="./html/card.html?id='+element.id +'">'+ element.name + '</a></li>';
    });
    list += '</ul>';
    let result = document.getElementById('resultList');
    result.innerHTML = list;
}


function init(){
    let homepage = new URL(window.location.href);
    //used to determine if search query was given
    //if not, load normally
    //otherwise, contact scryfall api for search results
    if(homepage.searchParams.has('search')){
        searchResults(homepage.searchParams.get('search'));
    }
}
