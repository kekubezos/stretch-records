// Number of requests made to the server

//Number of Requests = 20;

/*
style.css
script.js
johnny-cash.jpg
*/

/*Uncaught (in promise) SyntaxError: Unexpected token ',', ..."03" },
  ,
]
" is not valid JSON
*/

const artist = {
  name: "Pinkfong",
  genre: "Children's music",
  total: "11:31",
};

console.log(JSON.stringify(artist)); // Convert the artist object to a JSON string

console.log(JSON.parse(JSON.stringify(artist)).genre); // Convert the JSON string back to an object

// The client is the browser loading the website
// The server is Live Server, serving files from the stretch-records project.
// The request: fetch("artists.json") asks the server for the artists.json file containing the artists.
// The response: the server sends back the raw text of artists.json.
// response.json() parses that text into a JavaScript array of
// artist objects, which is given to the renderCards(artists) to build
// the cards on the page.
