//all requires
require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');

var randomFormat = "MM/DD/YYYY";


var search = process.argv.slice(3).join(" ");
var seperator = "\n---------------------------------------------------------------------\n";
var spotify = new Spotify(keys.spotify);

var results = []

//switch statement that executes function based on process.argv[2]
switch(process.argv[2]){
    case "spotify_this_song":
    spotifySong();
    break;
    case "concert_this":
    concertThis();
    break;
    case "movie_this":
    findMovie();
    break;
}

//node spotify api function
function spotifySong(){
    spotify.search({ type: 'track', query: search}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Here are you results for: " + search)
        //push individual song details into empty array
        data.tracks.items.forEach(function(details){
            results.push({
                artist: details.artists[0].name,
                song: details.name,
                preview: details.external_urls.spotify,
                album: details.album.name
                });
            });
        //display results
        for(var i=0; i<results.length; i++){
          var displayResults = [
            "artist: " + results[i].artist,
            "song: " + results[i].song,
            "preview: " + results[i].preview,
            "album: " + results[i].album,
          ].join("\n\n")

          console.log(seperator + displayResults + seperator);
        }
      });
}

//bands in town api function
function concertThis(){
    axios.get('https://rest.bandsintown.com/artists/' + search + '/events?app_id=codingbootcamp')
    .then(function (response) {
      var output = response.data;

      for(var i=0; i<output.length; i++){

        var displayResults = [
          "name of venue: " + output[i].venue.name,
          "country of venue: " + output[i].venue.country,
          "city of venue: " + output[i].venue.city,
          "date of venue: " + moment(output[i].datetime).format(randomFormat),
        ].join("\n\n")

        console.log(seperator + displayResults + seperator);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

//IMDB api function
function findMovie(){

  axios.get('http://www.omdbapi.com/?t=' + search + '&apikey=58d2760e')
  .then(function (response) {
    var output = response.data

    var displayResults = [
      "Title of movie: " + output.Title,
      "year released: " + output.Year,
      "IMBD rating: " + output.imdbRating,
      "rotting tomatoes rating: " + output.Ratings[1].Value,
      "country produced: " + output.Country,
      "language of movie: " + output.Language[0],
      "actors: " + output.Actors,
      "plot: " + output.Plot,
    ].join("\n\n")

    console.log(seperator + displayResults + seperator);
  })
  .catch(function (error) {
    console.log(error);
  });
}
