const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const htmlParser = require('node-html-parser');
//nedb is a subset of mongodb, very lightweight
const Datastore = require('nedb');
const cors = require('cors');
const {response} = require('express');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors({origin: '*'}));


server.get('/', function (req, res) {
    res.sendFile('/Users/nikhilnarayanan/Desktop/temp/RoverSite/rover_backend_testing/controller.html');
});
// Serve interface

server.get('/controller/get/json', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let resJSON = require('./data/testing')
    let strJSON = JSON.stringify(resJSON);
    res.end(strJSON);
});

const database_contr = new Datastore('data_controller.db');
database_contr.loadDatabase();
//load the existing database into memory. If it isn't such a database, it will create a new one

//used to visualise data retrieved by rover
server.get('rover.html', function (req, res) {
    res.sendFile('/Users/nikhilnarayanan/Desktop/temp/RoverSite/rover_backend_testing/rover.html');
});

//this is to get the latest entry of controller
server.get('/rover/get/json', function (req, res) {
    database_contr.find({}).sort({id: -1}).limit(1).exec(function (err, data) {
        res.json(data);
        console.log(data);
    });

    // database_contr.count({}, function (err, count){ 
    //     let searchId= count-1;
    // database_contr.find({id: searchId},(err,data)=>{
    // if (err){
    //     response.end();
    //     return;
    // }
    // res.json(data);
    // console.log(data);
    // })
});


server.post('/controller/post/json', function (req, res) {
    console.log('Post Request Recieved')
    console.log(req.body);
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database_contr.insert(data);
    res.setHeader('Access-Control-Allow-Origin', '*')
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

server.listen(5000, "0.0.0.0");
console.log("Listening on port " + 5000);