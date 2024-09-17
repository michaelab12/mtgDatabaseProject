//window.addEventListener('keydown', startSearch ,false);
//api requests begin with this
var t = "https://api.magicthegathering.io/v1/";


//listener used to listen for search
//activates either when the search button is pressed or
//enter is pressed with text box selected
//activated api call function if valid
function keyboardListener(event){
    key = event.key;
    var active = document.activeElement.id;
    if(key == "Enter" && active == "search"){
        let query = document.getElementById('search').value;
        getCards(query);
    }
}

//used when the button is pressed
//for now only used to call async api function
//may change later
function buttonListener(){
    let query = document.getElementById('search').value;
    getCards(query);
}

//async function used to get card results
//uses input query and WOTC api to get
//resulting list of cards
//@param query: the search input by the user
async function getCards(url){
    try{
        const response = await fetch("https://api.magicthegathering.io/v1/cards" + "");
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
          }
        const json = await response.json();
        console.log(json);
    }
    catch(error){
        console.log("An Error Occured");
    }
    return null;
}

//helper function used to create out query
//splits the string into tokens and appends
//then to url object
function urlHelper(query){
    let arr = query.split(" ");
    for(const ell of arr){
        console.log(ell);
    }
}

urlHelper("the test query");
let j = "https://api.scryfall.com/cards/search?q=Alania+c:U";
const e = encodeURI(j);
console.log(e);
const uri = 'https://mozilla.org/?x=шеллы';
const encoded = encodeURI(uri);
console.log(encoded);