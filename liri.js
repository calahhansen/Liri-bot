// Include the axios npm package (run "npm install axios") *Use axios package to acess Bands in Town and OMDB.
const axios = require("axios");
//Include fs package/module? but already in node and don't need to install. Can use fs module to read, create, update, delete and rename files.
const fs = require("fs");
//Include moment npm package (run "npm install moment")
const moment = require("moment");
//Include the env npm package (run "npm install dotenv")
require("dotenv").config();

//Include the keys.js file *code required to import the `keys.js` file and store it in a variable
const keys = require("./keys.js");

//Include the spotify npm package (run "npm install --save node-spotify-api")
const Spotify = require("node-spotify-api"); //Spotify Constructor

//User input specifying the type of command from terminal (0 and 1 are rubbish and garbage)
const cmdType = process.argv[2];
//User input specifying the artist/band, movie, or song search/request from the terminal
const userSearch = process.argv[3];

//node liri.js concert-this <artist/band name here> will search Bands in Town API for the following: name of venue, venue location, date of event (i.e. moment.js "MM/DD/YYYY")

//need some sort of an argument or === or || so that it just captures the "concert-this" and returns default artist/band if no userSearch or error

// Create the Concert constructor
const Concert = function() {
  // divider will be used as a spacer between the tv data we print in log.txt
  const divider = "\n------------------------------------------------------------\n\n";

  // findBand takes in the name of a band or artist name and searches the spotify API
  this.findBand = function(band) {
    const bandUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp&date=upcoming";  //what is the error? -- needed another + after band to concatonate the rest of the URL

    axios.get(bandUrl).then(function(response) {
      // Place the response.data into a variable, jsonData.
      // if response === [];
      // return ("No future concerts coming up");
      
      const jsonData = response.data[0];
      console.log(jsonData);

      // showData ends up being the string containing the show data we will print to the console
      const showEventData = [
        "Venue Name: " + jsonData.venue.name,  //not totally sure if I am drilling down right??
        "Location: " + jsonData.venue.city,   //.join(", "), - use this to join on region and country?
        "Date: " + jsonData.datetime,
      ].join("\n\n");

      // Append showEventData and the divider to log.txt, print showEventData to the console
      fs.appendFile("log.txt", showEventData + divider, function(err) {
        if (err) throw err;
        console.log(showEventData);
      });
    });
  };
}
const concert = new Concert();
console.log(";laksdjf;lkjiowaej")
concert.findBand(userSearch)
console.log(";laksdjf;lkjiowaej")

//node liri.js spotify-this-song '<song name here> will show the following: artist, song name, preview link, album name, if no song.....default "The Sign" by Ace of Base

//need some sort of argument to recognize the "spotify-this-song" and give error or default if blank
//need some variables and a function??

// Create the Song constructor
const Spotify = function() {
  // const spotify = new Spotify(keys.spotify); 
  // divider will be used as a spacer between the spotify data we print in log.txt
  const divider = "\n------------------------------------------------------------\n\n";

  // findSong takes in the name of the song and searches the spotify API
  this.findSong = function(song) {
    const spotifyUrl = "https://open.spotify.com/song/" + song;

    axios.get(spotifyUrl).then(function(response) {
      // Place the response.data into a variable, jsonData.
      // if response === [];
      // return ("No future concerts coming up");
      
      const jsonData = response.data[0];
      console.log(jsonData);

      // showData ends up being the string containing the show data we will print to the console
      const showSongData = [
        "Artist: " + jsonData., //figure out drill down stuff from docs
        "Song Name: " + jsonData.,   //.join(", "), - use this to join on region and country?
        "Preview Link: " + jsonData.,
        "Album Name: " +jsonData.,
      ].join("\n\n");

      // Append showEventData and the divider to log.txt, print showEventData to the console
      fs.appendFile("log.txt", showSongData + divider, function(err) {
        if (err) throw err;
        console.log(showSongData);
      });
    });
  };
}
const song = new Song();
console.log(";laksdjf;lkjiowaej")
song.findSong(userSearch)
console.log(";laksdjf;lkjiowaej")

// Example from Spotify API docs
// var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
// });
 
// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

//node liri.js movie-this '<movie name here>' will show the following: movie name, year, imdb rating, rotten rating, country produced, language, plot and actors, if no movie....'Mr. Nobody.' movie info block
// Grab the movieName which will always be the third node argument.
// var movieName = process.argv[2];

// Then run a request with axios to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);

// axios.get(queryUrl).then(
//   function(response) {
//     console.log("Release Year: " + response.data.Year);
//   })
//   .catch(function(error) {

// axios.get("http://www.omdbapi.com/?t=" + input3 "&y=&plot=short&apikey=trilogy").then(
//   function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log("---------------Data---------------");
//       console.log(error.response.data);
//       console.log("---------------Status---------------");
//       console.log(error.response.status);
//       console.log("---------------Status---------------");
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an object that comes back with details pertaining to the error that occurred.
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });


//If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//It's on Netflix!

  //node liri.js do-what-it-says`

  //Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  //It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

  //Edit the text in random.txt to test out the feature for movie-this and concert-this.