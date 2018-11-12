# liri-node-app

## Video Demo of application: 
https://www.youtube.com/watch?v=v1YlpV6kAkc&feature=youtu.be

## Flow:

* as soon as the app loads, all necessary packages are called and assigned to variables
    * fs
    * request
    * moment
    * spotify-api-npm
    * dotenv

* the command and search query are assigned to variables

* the **evaluate()** function is run, which is just a switch statement to call the correct function based on whatever was passed in and assigned to "command" variable. at the end of the function, the command and search query are logged in the log.txt file. 

    * **concert()** - calls the Bands in Towns API using the search query. parses the returned body and sets for loop to go through 5 results and console/log the venue, location, and date. Moment package was used to format date. 

    *  **spot()** - first checks if the search query is undefined. if so, it assigns it to "The Sign" by Ace of Base as per homework instructions. 
        * A request is made to the spotify api using the spotify package (limited to one response as per instructions. uses For loops to handle more than one result so it is scalable) 
        * A for loop goes through the response 
        * artists are returned as objects so empty string is created for formatting. for loop goes through artist objects and adds names to empty string.
        * many songs do not have previews. instead of getting "null", there is if statement to change null to "Preview Not Available"
        * formats result and logs it to console and log.txt
    
    *  **movie()** - first checks if the search query is undefined. if so, it assigns it to "Mr. Nobody" as per homework instructions. 
        * request is made to OMDB api using search query as parameter.
        * response is parsed and for loop goes through each movie to display:
            * title
            * year released
            * IMDB rating
            * Rotten Tomatoes rating
            * country produced in
            * language
            * plot
            * actors
        * result is formatted and logged to console and log.txt

    * **justDo()** - uses fs package to read random.txt file
        * splits result by comma and assigns first item in array to "command" and second to "searched". 
        * calls evaluate() function

    