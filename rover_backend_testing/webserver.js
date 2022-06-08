const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const htmlParser = require('node-html-parser');
//nedb is a subset of mongodb, very lightweight
const Datastore = require('nedb');
const cors = require('cors');
const {response} = require('express');
const resJSON = require("./data/testing");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors({origin: '*'}));


server.get('/', function (req, res) {
    res.sendFile('/Users/nikhilnarayanan/Desktop/temp/RoverSite/rover_backend_testing/controller.html');
});
// Serve interface

server.get('/controller/get/json', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let resJSON = require('./data/testing.json')
    let strJSON = JSON.stringify(resJSON);
    res.end(strJSON);
});

const database_contr = new Datastore('./data/data_controller.db');
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

const commandsDatabase = new Datastore('./data/command.db');
commandsDatabase.loadDatabase();
commandsDatabase.remove({}, {multi: true}, (err, numRemoved) => console.error('problem clearing DB: ' + err));
let commandOrder = 0;

server.post('/controller/command', (req, res) => {
    console.log('/controller/command');
    const command = req.body;
    command.order = commandOrder;
    commandOrder++;
    commandsDatabase.insert(command);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: "Command received"}));
});

server.post('/rover/command', (req, res) => {
    console.log('/controller/command');
    console.log(req.body);
    const order = parseInt(req.body.order);
    console.log(order);
    commandsDatabase.find({order: {$gt: order}}).sort({order: 1}).limit(1).exec((errs, docs) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        console.log(docs);
        if (docs[0]) {
            res.end(JSON.stringify(docs[0]));
        } else {
            res.end({message: "No command found"});
        }
    });
});

const database_map = new Datastore('./data/map.db');
database_map.loadDatabase();
database_map.remove({}, {multi: true}, (err, numRemoved) => console.error('problem clearing DB: ' + err));
let mapId = 0;

server.get('/controller/map', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    database_map.find({}).sort({id: -1}).limit(1).exec((err, data) => {
        res.end(JSON.stringify(data));
    });
});

server.post('/rover/map', (req, res) => {
    console.log("/rover/map message received");
    const dbRecord = {
        id: mapId,
        height: parseInt(req.body.map_height),
        width: parseInt(req.body.map_width),
        data: req.body.data.split(',').map(str => parseInt(str.replace('"', '')))
    };
    database_map.insert(dbRecord);
    res.writeHead(200, {'Content-Type': 'application/json'});
    const strJSON = JSON.stringify({"message": "success"});
    mapId++;
    res.end(strJSON);
});

server.listen(5000, "0.0.0.0");
console.log("Listening on port " + 5000);