const quote = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('button');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loading
function loading() {
    loader.hidden = false;
    quote.hidden = true;
}

//hide loading
function complete() {
    if(!loader.hidden) {
        quote.hidden=false;
        loader.hidden=true;
    }
}

// Get Quote from API
async function getQuote(){
    loading();
    const proxyurl = 'https://warm-lake-56356.herokuapp.com/'
    const url ='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
       const response = await fetch(proxyurl + url);
       const data = await response.json();
       if (data.quoteAuthor === ''){
        quoteAuthor.innerText = 'Unknown';
       }
       else {
        quoteAuthor.innerText = data.quoteAuthor;
       }
       if (data.quoteText.length > 120){
        quoteText.classList.add('long-quote');
       }
       else {
           quoteText.classList.remove('long-quote');
       }
       quoteText.innerText = data.quoteText;
       // stop Loader, show Quote
       complete();
    }catch(error){
        getQuote();
      
    }
}

function tweetQuote() {
    const quote1 = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote1} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listerners
newQuoteButton.addEventListener('click',getQuote);
twitterButton.addEventListener('click',tweetQuote);
// On Load
getQuote();
//loading();