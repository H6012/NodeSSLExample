var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');




var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var app = express();
var secure_app = express();





// your express configuration here

app.get('/', function(req,res) {
        res.send('non secure channel!!!, ');
    });


secure_app.get('/', function(req,res) {
        res.send('encrypted channel');
    });



var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, secure_app);

httpServer.listen(80);
httpsServer.listen(443);

console.log("Started listening on ports 80 and 443");
