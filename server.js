const http = require('http');
const fs = require('fs');
const port = 6789;

const server = http.createServer(function server(request, response){
    let file;

    switch (request.url){
        case "/":
            file = 'index.html';
            break;
        case "/ninjas":
            file = 'ninjas.html';
            break;
        case "/dojos":
            file = 'dojos.html';
            break;
        case "/style.css":
            file = "style.css";
            break;
        default:
        file = null;
        break;
    }

    if (file !== null){
        fs.readFile(`${file}`, 'utf8', function (errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        })
    }
    // request didn't match anything:
    else {
        response.writeHead(404);
        response.end('File Not Found');
    }
});


server.listen(port); // tell your server which port to run on
console.log(`Server running on localhost:${port}`); // print to terminal window
