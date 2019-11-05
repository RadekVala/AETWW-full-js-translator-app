const inputEl = document.querySelector('#input');
const btnEl = document.querySelector('#btnTranslate');
const outputEl = document.querySelector('#output');

const historyEl = document.querySelector('#history');


var historyArray = [];

// nacteme historii z local storage
var historyLS = localStorage.getItem('history');
if(historyLS){
    historyArray = JSON.parse(historyLS);
    showHistory();
}

// funkce pro ulozeni do local storage
function storeToHistory(array){
    localStorage.setItem('history', JSON.stringify(array));
}

// funkce pro vypis historie do UL 
function showHistory(){
    var htmlHistory = '';

    historyArray.forEach( item => {
        htmlHistory+='<li class="list-group-item">';
        htmlHistory+=item;
        htmlHistory+='</li>';
    });

    historyEl.innerHTML = htmlHistory;
}

// obsluha kliku na tlacitko Translate
async function btnTranslateClicked(){
    // ziskame text zadany uzivatelem
    const userInput = inputEl.value;
    // zalogujeme jej do konzole
    console.log(userInput);

    // provedeme dotaz na prekladove API
    const url = 'https://api.mymemory.translated.net/get?q='
    + userInput +
    '&langpair=en|cs';
    const response = await fetch(url);
    const myJson = await response.json();
    console.log(myJson);

    // vypiseme vysledek do UI
    outputEl.value = myJson.responseData.translatedText;

    historyArray.unshift(userInput + ' -> ' + myJson.responseData.translatedText);
    // ulozime do local storage
    storeToHistory(historyArray);
    // zobrazime historii uzivateli
    showHistory();
    //debugger;
}

// nastavime obsluhu udalosti kliku na tlacitko
btnEl.onclick = btnTranslateClicked;