const express = require('express');
const server = express();
const bodyParser = require('body-parser');
//nedb is a subset of mongodb, very lightweight
const Datastore = require('nedb');
const cors = require('cors');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors({origin: '*'}));

const commandsDatabase = new Datastore('./data/commands.db');
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

const database_telemetry = new Datastore('./data/telemetry.db');
database_telemetry.loadDatabase();
database_telemetry.remove({}, {multi: true}, (err, numRemoved) => console.error('problem clearing DB: ' + err));
let telemetryOrder = 0;

server.post('/rover/telemetry', (req, res) => {
    const currentDateTime = new Date();
    console.log("/rover/telemetry message received: " + currentDateTime);
    const dbRecord = {
        order: telemetryOrder,
        map: {
            height: parseInt(req.body.mapHeight),
            width: parseInt(req.body.mapWidth),
            data: req.body.mapData.split(',').map(str => parseInt(str.replace('"', '')))
        },
        status: {
            batteryPercentage: parseInt(req.body.batteryPercentage),
            opticalFlowSensor1: parseInt(req.body.opticalFlowSensor1),
            opticalFlowSensor2: parseInt(req.body.opticalFlowSensor2)
        }
    };
    database_telemetry.insert(dbRecord);
    telemetryOrder++;

    const commandOrder = parseInt(req.body.commandOrder);
    commandsDatabase.find({order: {$gt: commandOrder}}).sort({order: 1}).limit(1).exec((errs, docs) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        if (docs[0]) {
            res.end(JSON.stringify(docs[0]));
        } else {
            res.end(JSON.stringify({order: -2, message: "No command found"}));
        }
    });
});

server.get('/controller/telemetry', (req, res) => {
    console.log("telemetry");
    res.writeHead(200, {'Content-Type': 'application/json'});
    database_telemetry.find({}).sort({order: -1}).limit(1).exec((err, data) => {
        res.end(JSON.stringify(data));
    });
});

server.listen(5000, "0.0.0.0");
console.log("Listening on port " + 5000);