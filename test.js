
var placeholder = "https://api.magicthegathering.io/v1";
//window.addEventListener('keydown', test2 ,false);
async function testAPI(testPath){
    try{
        const response = await fetch("https://api.magicthegathering.io/v1/cards");
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

function test1(){
    const val = document.getElementById('val');
    const valText = val.textContent; // grabs "0" from the val span
    let valNum = Number(valText); // converts "0" to numeric 0
    valNum += 1; // adds 1 to valNum changing it from 0 to 1
    val.textContent = valNum; // puts it back in the HTML
}

function test2(event){
    var key = event.key;
    var active = document.activeElement.id;
    if(key == "Enter"){
        const val = document.getElementById('changeable');
        let t = document.getElementById('search').value;
        val.textContent = t;
    }
}

function test3(){
    url = new URL("https://api.scryfall.com/cards/search")
    url.searchParams.append("q", "testValue");
    console.log(url.toString());
    url2 = new URL(url.toString());
    url2.searchParams.set("q", "different value");
    console.log(url2.toString());
}

test3();