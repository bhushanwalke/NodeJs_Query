/**
 * Created by bhushan on 11/15/15.
 */
var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");

function homeRoute(request, response){
    if(request.url === '/') {
        if(request.method.toLowerCase() === "get") {
            response.writeHead(200, {'Content-Type':'text/html'});

            renderer.view("header", {}, response);
            renderer.view("Search", {}, response);
            renderer.view("Footer", {}, response);
            response.end();
        }
        else{
            request.on("data", function (postBody) {
                query = querystring.parse(postBody.toString());
                console.log(query['username']);
                response.writeHead(303, {'Location' : "/" + query['username']});
                response.end();
            });
        }
    }
}



function userRoute(request, response){
    var username = request.url.replace("/", "");
    if(username.length > 0){
        response.writeHead(200, {'Content-Type': 'text/html'});
        renderer.view("header", {}, response);

        var studentProfile = new Profile(username);
        studentProfile.on("end", function (profilejson) {
           var values = {
               avatar : profilejson.gravatar_url,
               username : profilejson.profile_name,
               badge : profilejson.badges.length,
               point : profilejson.points.JavaScript
           }

            renderer.view("profile", values, response);
            renderer.view("footer", {}, response);
            response.end();
        //response.write(values.username + "has" + values.badge + "and" + values.point + "points" + "\n");
        //response.end("Footer \n");
        });


        studentProfile.on("error", function (error) {
            renderer.view("error", {errorMessage: error.message}, response);
            renderer.view("Search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });
    }
}



module.exports.home = homeRoute;
module.exports.user = userRoute;
