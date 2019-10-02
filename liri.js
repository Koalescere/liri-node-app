require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require("twitter");

var request = require('request');

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var getMyTweets = function (){
    var client = new Twitter(keys.twitterKeys);

    var params = {screen_name:  "Koalescere@GavinMa95613931"};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        //   console.log(tweets);
            for(var i=0; i<tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log("");
                console.log(tweets[i].text);
            }
        }
    });
}

var getMeMovie = function (movieName) {
    request("http://www.omdbapi.com/?s=" + movieName + "&apikey=3f7c5ae3", function (error, response, body){
        if (!error && response.statusCode == 200){  
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body) // Print the HTML for the Google homepage.
        console.log("Title: " + data.Title);
        // console.log("Year: " + body.Year);
        // console.log("IMDB Rating: " + body.imdbRating);
        // // console.log("Rotten Tomatoes Rating: " + body.Ratings.Source[1].value);
        // console.log("Country: " + body.Country);
        // console.log("Language: " + body.Language);
        // console.log("Plot: " + body.Plot);
        // console.log("Actors: " + body.Actors);

        }
    })
}

var getArtistNames = function (artist){
    return artist.name;
}

var getMeSpotify =function (songName){
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
        console.log('Error occurred: ' + err);
        return;
        }
   
    var songs = data.tracks.items;
    for(var i=0; i<songs.length; i++){
        console.log(i);
        console.log("artist(s):" + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song:" + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("--------------------------------------------------");
    }   
  });
}
var doWhatItSays = function (){
    fs.readFile("./random.txt", function (err, data) {
        if (err) throw err;
        //console.log(data);
        var dataArr = data.split(",");
        if (dataArr.length ==2){
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length ==1) {
            pick(dataArr[0]);
        }
    });
}
var pick = function(caseData, functionData) {
    switch(caseData) {
            case "my-tweets" :
                getMyTweets();
                break;
            case "spotify-this-song":
                getMeSpotify(functionData);
                break;
            case "movie-this":
                getMeMovie(functionData);
                break;
            case "do-what-it-says":
                doWhatItSays(functionData);        
            default:    
            console.log ("LIRI does not know that");    
    }
}
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

