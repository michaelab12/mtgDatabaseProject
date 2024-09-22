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
    document.title = json.name;
    let cardName = document.getElementById('cardName');
    cardName.textContent = json.name;
    let cardImage = document.getElementById('cardImage');
    let image = '<img src="' + json.image_uris.normal + '"width="488" height ="680">';
    cardImage.innerHTML = image;
    let typeLine = document.getElementById('typeLine');
    typeLine.textContent = json.type_line;
    let desc = document.getElementById('description');
    desc.textContent = json.oracle_text;
    //only do if it has power and toughness
    if(json.power == null || json.toughness == null){
        document.getElementById('powerToughness').remove();
    }
    else{
        let powerToughness = document.getElementById('powerToughness');
        powerToughness.textContent = json.power + '/' + json.toughness;
    }
}

//helper function 
function addImage(){

}

//function call used when program loads
//uses id from query to retrieve json
//and send it to the html page
function init(){
    let homepage = new URL(window.location.href);
    getCards(homepage.searchParams.get('id'));
}