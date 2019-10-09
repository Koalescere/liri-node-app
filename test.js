require("dotenv").config();



//*************************************************************************************** */

// *****TEST FOR OMDB API*****
// var request = require("request");


//  //request("http://www.omdbapi.com/?s=" + movieName + "&apikey=3f7c5ae3", function (error, response, body){
// request("http://www.omdbapi.com/?s=batman&apikey=3f7c5ae3", function (error, response, body){


//     if (!error && response.statusCode == 200){ 
//             var info = JSON.parse(body);
//             console.log(info);
//             console.log("Title: " + info.Search[0].Title);
//         }
//     });        

//*************************************************************************************** */

// *****TEST FOR TWITTER*****
// var keys = require("./keys.js");
// var Twitter = require("twitter");

// var client = new Twitter(keys.twitterKeys);


// var params = {screen_name:  "Koalescere@GavinMa95613931"};
// client.get("statuses/user_timeline", function(error, tweets, response) {    
//     if (error) throw error;
//     console.log(tweets);
//     //console.log(response);
        
// });            
