require("dotenv").config();
var keys =  require("./keys"); 
var fs = require("fs");
var request = require('request');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var spotify = new Spotify({
    id:keys.spotify.id,
    secret:keys.spotify.secret
}); 

var command = process.argv[2];
var searched = process.argv[3];

evaluate();

function evaluate(){
    switch(command){
        case "concert-this":
        concert();
        break;
        
        case "spotify-this-song":
        spot();
        break;
        
        case "movie-this":
        movie();
        break;
        
        case "do-what-it-says":
        justDo();
        break;
    }
    logIt("\n"+"\n"+"\n"
        +"COMMAND RUN: "+command+"\n"+"USER INPUT: "+searched+"\n");
}

function spot(){
    //node liri.js spotify-this-song fashion
    
    if(searched===undefined){
        searched="The Sign Ace of Base";
    }
    
    //spotify search only limited by "limit" parameter. if that changes, the function would provide more results
    spotify.search({type:'track',query:searched, limit: 1},function(error, response){
        if(error) throw error;

        let tracks = response.tracks.items;
    
        for (let index = 0; index < tracks.length; index++) {
            const track = tracks[index];
            
            //neatly formats the artists since each is returned as an Object
            var artist;
            artist="";
            for(let i=0;i<track.artists.length;i++){
                artist+=track.artists[i].name;
                if(i!=track.artists.length-1){
                    artist+=", "
                }
            }

            if(track.preview_url===null){
                track.preview_url="Preview Not Available"
            }

            let result=(
                "*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*"
                +"\n"+"----------"
                +"\n"+("----------      TITLE:      "+track.name)
                +"\n"+("----------      ARTIST:     "+artist)
                +"\n"+("----------      ALBUM:      "+track.album.name)
                +"\n"+("----------      PREVIEW:    "+track.preview_url)
                +"\n"+"----------"
                +"\n"+"*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*"
            )
            console.log(result);
            logIt(result);
            
        }
        
    });
}

function concert(){
    request("https://rest.bandsintown.com/artists/" + searched + "/events?app_id=codingbootcamp", function(error, response, body){
        if(error) throw error;
        //node liri.js concert-this amine
        
        console.log(JSON.parse(body).length);
        
        for (let index = 0; index < 5; index++) {
            const event = JSON.parse(body)[index];
            
            var location = event.venue.city+", "+event.venue.country
            

         let result=(
                "^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^"
          +"\n"+"----------"
          +"\n"+("----------      VENUE:      "+event.venue.name)
          +"\n"+("----------      LOCATION:   "+location)
          +"\n"+("----------      DATE:       "+moment(event.datetime).format("MM/DD/YYYY"))
          +"\n"+"----------"
          +"\n"+"^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^-=-v-=-^"
          )
          console.log(result);
          logIt(result);

        }
    })
}

function movie(){

if(searched===undefined){
    searched="Mr. Nobody";
}

request("http://www.omdbapi.com/?apikey=trilogy&t=" + searched +"&type=movie", function(error, response, body){
    if(error) throw error;
    //node liri.js movie-this matrix

    console.log("searched= "+searched)

    
    var movie = JSON.parse(body);
    var rottenScore="N/A"
    for (let index = 0; index < movie.Ratings.length; index++) {
        const rating = movie.Ratings[index];
        
        if(rating.Source==="Rotten Tomatoes"){
            rottenScore=rating.Value;
        }
    }

    let result=(
          "|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|"
    +"\n"+"*****"
    +"\n"+("*****      TITLE:          "+movie.Title)
    +"\n"+("*****      YEAR:           "+movie.Year)
    +"\n"+("*****      IMDB RATING:    "+movie.imdbRating)
    +"\n"+("*****      ROTTEN RATING:  "+rottenScore)
    +"\n"+("*****      COUNTRY:        "+movie.Country)
    +"\n"+("*****      LANGUAGE:       "+movie.Language)
    +"\n"+("*****      PLOT:           "+movie.Plot)
    +"\n"+("*****      ACTORS:         "+movie.Actors)
    +"\n"+"*****"
    +"\n"+"|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|*|"
    )
    console.log(result);
    logIt(result);
    
})
}

function justDo(){
    //node liri.js do-what-it-says

    fs.readFile("./random.txt","utf8",function(error,data){
        if (error) throw error;
        var words=data.split(",");
        
        command=words[0];
        searched=words[1];
        
        console.log(words);
        console.log("command = "+command);
        console.log("searched = "+searched);
        evaluate();
        
    })
}

function logIt(content){
    fs.appendFile("./log.txt",content+"\n",function(error){
        if(error) throw error;
    })
}