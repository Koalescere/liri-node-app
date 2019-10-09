require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require("twitter");

var request = require("request");

var axios = require("axios");

var moment = require("moment");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var fs = require ("fs");


//twitter npm
var getMyTweets = function (){
    var client = new Twitter(keys.twitterKeys);

    var params = {screen_name:  "Koalescere@GavinMa95613931"};
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (!error) {
           console.log(tweets);
            for(var i=0; i<tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log("");
                console.log(tweets[i].text);
            }
        }
    });
}

//requests npm
var getMeMovie = function (movieName) {
    request("http://www.omdbapi.com/?s=" + movieName + "&apikey=3f7c5ae3", function (error, response, body){
        if (!error && response.statusCode == 200){  
        var jsonData = JSON.parse(body);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', jsonData); 
            // for(var i=0; i<jsonData.length; i++) {
        console.log("Title: " + jsonData.Search[0].Title);
        console.log("Year: " + jsonData.Search[0].Year);
        console.log("IMDB Rating: " + jsonData.Search[0].imdbRating);
                //console.log("Rotten Tomatoes Rating: " + jsonData.Search[0].Source[1]);
        console.log("Country: " + jsonData.Search[0].Country);
        console.log("Language: " + jsonData.Search[0].Language);
        console.log("Plot: " + jsonData.Search[0].Plot);
        console.log("Actors: " + jsonData.Search[0].Actors);
            // }    
        }
    })
}

//spotify npm
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
    for(var i=0; i<3; i++){
        console.log(i);
        console.log("artist(s):" + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song:" + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("--------------------------------------------------");
    }   
  });
}

//fs native npm in node
var doWhatItSays = function (){
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
        //console.log(data);
        var dataArr = data.split(",");
        if (dataArr.length ==2){
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length ==1) {
            pick(dataArr[0]);
            spotifyThis();
        }
    });
}

//axios npm for bands in town
var concertThis = function (artistName){
    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(function(response) {
    for (var i=0; i<3; i++){
    // console.log(JSON.stringify(response.data[i], null, 2),
    console.log("The Name of the venue: " + response.data[i].venue.name ),
    console.log("The venue location (city, country): " + response.data[i].venue.city + ", " + response.data[i].venue.country),
    // console.log("Date of the event (MM/DD/YYYY): "  + response.data[i].datetime),
    console.log("Date of the event (MM/DD/YYYY): " + moment(response.data[i].datetime).format("MM/DD/YYYY")),
    console.log("-----------------------------------------------------------------")
    // );
    }
    },
)};


//switch case function between functions for servcies
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
                doWhatItSays();
            case "concert-this":
                concertThis(functionData);             
            default:    
            console.log ("LIRI does not know that");    
    }
}
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

