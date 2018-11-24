var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');




var privateKey  = fs.readFileSync('myclient.key', 'utf8');
var certificate = fs.readFileSync('myclient.crt', 'utf8');
var certAth = fs.readFileSync('ca.crt', 'utf8');
var options = {
		key: privateKey, 
		cert: certificate, 
		ca: certAth,
		requestCert: true, 
		rejectUnauthorized: true,
 		hostname: 'dpvm1.northeurope.cloudapp.azure.com', 
    		port: 443, 
    		path: '/', 
    		method: 'GET'		
		};



    
  


var req = https.request(options, function(res) { 
    res.on('data', function(data) { 
        process.stdout.write(data); 
	console.log('Requesting data from https server');
    }); 
}); 
