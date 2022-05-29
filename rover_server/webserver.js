var express = require('express');
var server = express();
var bodyParser= require('body-parser');
var htmlParser = require('node-html-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));


server.get('/',function(req,res){
    res.sendFile('home/ubuntu/RoverSite/rover_server/index.html');
});
// Serve interface

server.get('/controller/get/json', function(req,res){
    res.writeHead(200,{'Content-Type': 'application/json'});
    let resJSON= require('home/ubuntu/RoverSite/rover_server/testing.json')
    let strJSON= JSON.stringify(resJSON);
    res.end(strJSON);
});

server.post('/controller/post/json', function(req,res){
    
})

// server.post('controller/post/json', function(req,res){
//     const jsonData = req.body;
//     const responseContent = ""
//     let jsonTree= JSON.parse();
//     res.writeHead(200, {'Content-Type':'application/json'})
// });
console.log('Server is running on port 3000');
server.listen(3000, '0.0.0.0');
