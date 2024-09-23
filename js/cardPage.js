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

//generic function for when we have the exact url to request from
async function getRequest(url){
    try{
        const response = await fetch(url);
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
    //set up purchase urls
    let purchaseLinks = document.getElementById('buyLinks');
    let purchaseLinksInner = '<a href="' + json.purchase_uris.tcgplayer + 'id="tcgplayer"">buy on tcgplayer</a>';
    purchaseLinksInner += '<br><a href="' + json.purchase_uris.cardmarket + 'id="cardmarket"">buy on cardmarket</a>';
    purchaseLinksInner += '<br><a href="' + json.purchase_uris.cardhoarder + 'id="cardhoarder"">buy on cardhoarder</a>';
    console.log(purchaseLinksInner);
    purchaseLinks.innerHTML = purchaseLinksInner;
    addRulings(json.rulings_uri);
}

//helper function 
async function addRulings(urlRuling){
    let rulings = await getRequest(urlRuling);
    if(rulings != null && rulings.data.length != 0){
        let data = rulings.data;
        let list = '<ul>';
        console.log(rulings);      
        data.forEach(element => {
            list +='<li>';
            list += '<div class="ruling">'+ element.comment + '</div>';
            list += '<div class= "rulingDate">' + element.published_at + '</div>';
            list += '</li>';
        });
        list += '</ul>';
        let rule = document.getElementById('rulings');
        rule.innerHTML = list;
        
    }
    else{
        console.log('no rulings');
        document.getElementById('rulings').remove();
    }
}

//function call used when program loads
//uses id from query to retrieve json
//and send it to the html page
function init(){
    let homepage = new URL(window.location.href);
    getCards(homepage.searchParams.get('id'));
}