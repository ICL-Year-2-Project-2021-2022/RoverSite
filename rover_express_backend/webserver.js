var express = require('express');
var server = express();
var bodyParser= require('body-parser');
var htmlParser = require('node-html-parser');
//nedb is a subset of mongodb, very lightweight
var Datastore = require('nedb');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));


server.get('/',function(req,res){
    res.sendFile('/home/marcochan/Desktop/Github_MarsRover/RoverSite/rover_express_backend/index.html');
});
// Serve interface

server.get('/controller/get/json', function(req,res){
    res.writeHead(200,{'Content-Type': 'application/json'});
    let resJSON= require('/home/marcochan/Desktop/Github_MarsRover/RoverSite/rover_express_backend/testing.json')
    let strJSON= JSON.stringify(resJSON);
    res.end(strJSON);
});

const database = new Datastore('database.db');
database.loadDatabase();

//load the existing database into memory. If it isn't such a database, it will create a new one

server.post('/controller/post/json', function(req,res){
    console.log('Post Request Recieved')
    console.log(req.body);
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    res.json({
        'status': 'success',
        'id': data.id,
        'countfor': data.countfor,
        'countback': data.countback,
        'countleft': data.countleft,
        'countright': data.countright,
        'timestamp': timestamp
    });
    
});

// server.post('controller/post/json', function(req,res){
//     const jsonData = req.body;
//     const responseContent = ""
//     let jsonTree= JSON.parse();
//     res.writeHead(200, {'Content-Type':'application/json'})
// });

server.listen(3000, "0.0.0.0");
console.log("Listening on port " + 3000);