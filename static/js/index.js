let quotes, currentQuote, currentAuthor;

var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

function RequestQuotes() {
  return $.ajax({
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: (data) => {
      let JSONdata = JSON.parse(data)
      if (JSONdata['quotes']) {
        quotes = JSONdata["quotes"];
      } 
    }
  });
}

function SetQuote () {
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;  
  $("#tweet-quote").attr('href','https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='
   + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));  
  $("#container").animate({'background-color': randomColor}, 1000);
  $(".button").animate({'background-color': randomColor}, 1000);
  $("#quote-box").animate({'color': randomColor}, 1000);
  $("#quote-text").animate({'opacity': 0}, 500, function () {
    $(this).animate({ opacity: 1, color: randomColor }, 500);
    $("#text").html(currentQuote);
  })
  $("#quote-author").animate({'opacity': 0}, 500, function () {
    $(this).animate({ opacity: 1, color: randomColor }, 500);
    $("#author").html(currentAuthor);
  })  
}

$(document).ready(function () {
  RequestQuotes().then(() => {
    SetQuote();
  });
  $("#new-quote").on('click', SetQuote)
});