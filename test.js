
const semicolon = "%3A";

async function testAPI(t){
    try{
        const response = await fetch("https://api.scryfall.com/cards/search?q=Alania+c:R", {
            headers: {
              "User-Agent": "sudoScryfall/0.1",
              "Accept": "*/*",
            },
          });
          
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
          }
        const json = await response.json();
        console.log(json);
        console.log(json.total_cards);
    }
    catch(error){
        console.log("An Error Occured");
    }
    return null;
}

testAPI("who_cares");