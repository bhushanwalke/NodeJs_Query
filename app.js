// Create a web server
//handle http route GET /
    //if url == "/" && GET
    //show search field
    //if url == "/" && POST
    //redirect to username

// hangle post /
//handle http route GET /username
    //if url == "/...."
    //get json from treehouse
        //on "end" show profile
        //on "error show error


var router = require('./router.js');
var http  = require("http");

http.createServer(function(request, response){
    router.home(request, response);
    router.user(request, response);
}).listen(3000);

console.log('Server Running');
