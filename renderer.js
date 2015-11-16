/**
 * Created by bhushan on 11/16/15.
 */
// function that handles reading of the files and merge/render on html
//read file and get string(username)
//render the data received from server on the html page

var fs = require('fs');

function mergeValues(values, content){
    for(var key in values){
        content = content.replace("{{" + key + "}}", values[key]);
    }
    return content;
}

function view(templateName, values, response){
    var fileContents = fs.readFileSync('./views/' + templateName + ".html", {encoding: "utf8"});
    fileContents = mergeValues(values, fileContents);
    response.write(fileContents);
}

module.exports.view = view;
