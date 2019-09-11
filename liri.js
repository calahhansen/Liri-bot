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
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify); 



//User input 1 from terminal (0 and 1 are rubbish and garbage)
const input1 = process.argv[2];
//User input 2 from the terminal
const input2 = process.argv[3];

// Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
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