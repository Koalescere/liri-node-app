require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");

var client = new Twitter(keys.twitterKeys);


var params = {screen_name:  "Koalescere@GavinMa95613931"};
client.get("statuses/user_timeline", function(error, tweets, response) {    
    if (error) throw error;
    console.log(tweets);
    //console.log(response);
        
});            
