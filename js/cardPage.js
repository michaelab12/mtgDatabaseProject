//async function used to get all card info with id
//uses input query and WOTC api to get
//resulting list of cards
//@param query: the search input by the user
async function getCards(id){
    try{
        let request = "https://api.scryfall.com/cards/" + id;
        const response = await fetch(request);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
          }
        const json = await response.json();
        setValues(json);
    }
    catch(error){
        console.log("An Error Occured");
    }
    return null;
}
//helper function used to set all the needed values
function setValues(json){
    let cardName = document.getElementById('cardName');
    cardName.textContent = json.name;
}

//function call used when program loads
//uses id from query to retrieve json
//and send it to the html page
function init(){
    let homepage = new URL(window.location.href);
    getCards(homepage.searchParams.get('id'));
}