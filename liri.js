//all requires
require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var axios = require('axios');


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
    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
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
      console.log(results); 
      });
}

//bands in town api function
function concertThis(){
    axios.get('https://rest.bandsintown.com/artists/' + process.argv[3] + '/events?app_id=codingbootcamp')
    .then(function (response) {
      console.log(response.items);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//IMDB api function
function findMovie(){


}