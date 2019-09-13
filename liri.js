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
// new instance
var spotify = new Spotify({
  id: keys.id,
  secret: keys.secret,
});

//User input specifying the type of command from terminal (0 and 1 are rubbish and garbage)
const cmdType = process.argv[2];
//User input specifying the artist/band, movie, or song search/request from the terminal
const userSearch = process.argv[3];

// divider will be used as a spacer between the data printed in log.txt
const divider = "\n------------------------------------------------------------\n\n";

//node liri.js concert-this <artist/band name here> will search Bands in Town API for the following: name of venue, venue location, date of event (i.e. moment.js "MM/DD/YYYY")

//need some sort of an argument or === or || so that it just captures the exact "concert-this" and returns default artist/band if no userSearch or error

// Create the Concert constructor - probably didn't need the constructor looking back on this....only returning 1 concert
const Concert = function () {

  // findBand takes in the name of a band or artist name and searches the spotify API
  this.findBand = function (band) {
    const bandUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp&date=upcoming";  //what is the error? -- needed another + after band to concatonate the rest of the URL

    axios.get(bandUrl)
      .then(function (response) {
        // Place the response.data into a variable, jsonData.
        if (response.data.length === 0) {
          console.log("No future concerts coming up");
        }

        const jsonData = response.data[0];
        // console.log(jsonData);

        // showData ends up being the string containing the show data we will print to the console
        const showEventData = [
          "Venue Name: " + jsonData.venue.name,  //not totally sure if I am drilling down right??
          "Location: " + jsonData.venue.city,   //.join(", "), - use this to join on region and country?
          "Date: " + jsonData.datetime,
        ].join("\n\n");

        // Append showEventData and the divider to log.txt, print showEventData to the console
        fs.appendFile("log.txt", showEventData + divider, function (err) {
          if (err) throw err;
          console.log(showEventData);
        });
      });
  };
}
if (cmdType === "concert-this") { //conditional statement (note to self....memorize if/else/return and re-review switch statements)
  const concert = new Concert();
  // console.log(";laksdjf;lkjiowaej");
  concert.findBand(userSearch);
}
//node liri.js spotify-this-song '<song name here> will show the following: artist, song name, preview link, album name, if no song.....default "The Sign" by Ace of Base
else if (cmdType === "spotify-this-song") {
  //spotify method search from npm documentation (not totally sure on how the err is working...)
  spotify.search({ type: 'track', query: userSearch }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else if (data) {
      const songs = data.tracks.items; ///OMG!!!!  this drill down thing sucks.....I gave up on preview link
      var songData = [
        "Artist: " + songs[0].artists[0].name,
        "Song Name: " + songs[0].name,
        "Preview Link: " + songs[0].preview_url,
        "Album: " + songs[0].album.name,
      ].join("\n\n");
      console.log(songData);
    };

    // Append Song Data and the divider to log.txt, print data to the console
    fs.appendFile("log.txt", songData + divider, function (err) {
      if (err) throw err;
      // console.log(songData);
    });
  });
}
//node liri.js movie-this '<movie name here>' will show the following: movie name, year, imdb rating, rotten rating, country produced, language, plot and actors, if no movie....'Mr. Nobody.' movie info block

const Movie = function () {
  // findmovie takes in the name of a movie and searches the OMDB API and requires axios
  this.findMovie = function (movie) {
    const movieUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";  //ok to use trilogy apikey

    axios.get(movieUrl).then(function (response) {
      // Place the response.data into a variable, jsonData.
      if (response.data.length === 0) {
        console.log("Mr. Nobody - movie block"); //need to work on the error portion
      } else {
        const jsonData = response.data;
        // console.log(jsonData);

        // showMovieData ends up being the string containing the data we will print to the console
        const showMovieData = [
          "Movie Name: " + jsonData.Title, //note to self: upper case matters on drill down....so painful
          "Year: " + jsonData.Year,
          "IMDB Rating: " + jsonData.Ratings[0].Value,
          "Rotten Rating: " + jsonData.Ratings[1].Value,
          "Country Produced: " + jsonData.Country,
          "Language: " + jsonData.Language,
          "Plot: " + jsonData.Plot,
          "Actors: " + jsonData.Actors,
        ].join("\n\n");

        // Append showEventData and the divider to log.txt, print showEventData to the console
        fs.appendFile("log.txt", showMovieData + divider, function (err) {
          if (err) throw err;
          console.log(showMovieData);
        });
      }
    });
  };
}
if (cmdType === "movie-this") {
  const movie = new Movie();
  // console.log(movie);
  movie.findMovie(userSearch);
}


//node liri.js do-what-it-says`
if (cmdType === "do-what-it-says") {
 //Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
 fs.readFile('random.txt', 'utf8', function(data){
  var dataArr = data.split(',');
  console.log(dataArr);
//It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//ok to copy/paste from above stuff again?? or how can I call it without having it here a second time?
  if (dataArr[0] === "spotify-this-song") {
    spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      else if (data) {
        const songs = data.tracks.items; ///OMG!!!!  this drill down thing sucks.....I gave up on preview link
        var songData = [
          "Artist: " + songs[0].artists[0].name,
          "Song Name: " + songs[0].name,
          "Preview Link: " + songs[0].preview_url,
          "Album: " + songs[0].album.name,
        ].join("\n\n");
        console.log(songData);
      };
  
      // Append Song Data and the divider to log.txt, print data to the console
      fs.appendFile("log.txt", songData + divider, function (err) {
        if (err) throw err;
        // console.log(songData);
      });
    });
  }
  }
  //Edit the text in random.txt to test out the feature for movie-this and concert-this
 )} 