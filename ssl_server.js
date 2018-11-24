var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');




var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');
var certAth = fs.readFileSync('ca.crt', 'utf8');
var options = {
		key: privateKey, 
		cert: certificate, 
		ca: certAth,
		requestCert: true, 
		rejectUnauthorized: true		
		};


var secure_app = express();





// your express configuration here
secure_app.get('/', function(req,res) {
        res.send('encrypted channel!');
 	 console.log(new Date()+' '+ 
        req.connection.remoteAddress+' '+ 
        req.socket.getPeerCertificate().subject.CN+' '+ 
        req.method+' '+req.url); 
    });


secure_app.get('/fun', function(req,res) {
        res.send('****Insert funny message here*** so only encrypted and authenticated people can see it!');
    });




var httpsServer = https.createServer(options, secure_app);


httpsServer.listen(443);

console.log("Started listening on port 443");
