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
const Spotify = require("node-spotify-api"); //why does npm documentation capitalize Spotify?? This doesn't look like a constructor...
const spotify = new Spotify(keys.spotify); 

//How does this mix in with the env and keys.js?? copied from npm docs
var spotify = new Spotify({
  id:81fc3562f62e451bb39d0e0ff23296f1,
  secret:7279e7eefbba4ebf9bad9898e04b9fc0,
});

//User input specifying movie, concert, song from terminal (0 and 1 are rubbish and garbage)
const cmdType = process.argv[2];
//User input specifying the artist/band, movie, or song search from the terminal
const userSearch = process.argv[3];

//node liri.js concert-this <artist/band name here> will search Bands in Town API for the following: name of venue, venue location, date of event (i.e. moment.js "MM/DD/YYYY")
//npm docs say that you can use either method with spotify (search or request)....what is the difference?
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});


(`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) 

//node liri.js spotify-this-song '<song name here> will show the following: artist, song name, preview link, album name, if no song.....default "The Sign" by Ace of Base
const getEvents = function (input1) {
  if (input2 === "" || typeof input2 === typeof undefined) {
    input2 = "Estelle";
  }
}
// (https://www.npmjs.com/package/node-spotify-api)


//node liri.js movie-this '<movie name here>' will show the following: movie name, year, imdb rating, rotten rating, country produced, language, plot and actors, if no movie....'Mr. Nobody.' movie info block
// Grab the movieName which will always be the third node argument.
var movieName = process.argv[2];

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
  })
  .catch(function(error) {

axios.get("http://www.omdbapi.com/?t=" + input3 "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log(response);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });


//If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//It's on Netflix!

  //node liri.js do-what-it-says`

  //Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  //It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

  //Edit the text in random.txt to test out the feature for movie-this and concert-this.