class Founder{
    displayQuote(data) {
        fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => {
            const containerEl = document.querySelector('#ogQuote');
    
            const quoteEl = document.createElement('div');
            quoteEl.classList.add('quote');
            const authorSpan = document.createElement('span');
    
            quoteEl.textContent = "\"" + data.content;
            quoteEl.style.fontSize = '1.5rem';

            authorSpan.textContent = " - " + data.author;
            authorSpan.style.fontSize = '1rem';
            const quoteMarkSpan = document.createElement('span');
            quoteMarkSpan.textContent = '"';
            quoteMarkSpan.style.fontSize = '1.5rem';
            
            authorSpan.appendChild(quoteMarkSpan);
            quoteEl.appendChild(authorSpan);
            containerEl.appendChild(quoteEl);
        });
    }
}

const founder = new Founder();
founder.displayQuote();
