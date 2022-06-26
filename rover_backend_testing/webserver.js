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
let latestImageString = "";

server.post('/controller/command', (req, res) => {
    console.log('/controller/command');
    const command = req.body;
    command.order = commandOrder;
    command.type = "drive";
    commandOrder++;
    commandsDatabase.insert(command);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: "Command received"}));
});

const database_telemetry = new Datastore('./data/telemetry.db');
database_telemetry.loadDatabase();
database_telemetry.remove({}, {multi: true}, (err, numRemoved) => console.error('problem clearing DB: ' + err));
let telemetryOrder = 0;


const objectToColourMapping = {
    R: {
        fill: "#880000",
        uncertainty: "#ff0000"
    },
    G: {
        fill: "#008800",
        uncertainty: "#00ff00"
    },
    obst: {
        fill: "#000000",
        uncertainty: "#999999"
    },
    rover: {
        fill: '#A32CC4',
        uncertainty: '#E39FF6'
    }
};

const parseKalmanStateToJSON = stateString => stateString.split(',').map(parseFloat);

const parseKalmanVariancesToJSON = variancesString => variancesString.split(';').map(it => it.split(',').map(parseFloat));

const constructMapFromStateAndVariances = (state, variances, landmarkTypes) => {
    const map = [];
    const rover = {
        x: state[0],
        y: state[1],
        rotationRad: state[2],
        radius: 2 * Math.max(Math.sqrt(variances[0][0]), Math.sqrt(variances[1][1])),
        type: "rover",
        colourFill: objectToColourMapping['rover'].fill,
        colourUncertainty: objectToColourMapping['rover'].uncertainty
    }
    map.push(rover);
    for (let i = 0; i < state.length - 3; i += 2) {
        const colourMapping = objectToColourMapping[landmarkTypes[i / 2]];
        map.push({
            x: state[i + 3],
            y: state[i + 4],
            radius: 2 * Math.max(Math.sqrt(variances[i + 3][i + 3]), Math.sqrt(variances[i + 4][i + 4])),
            type: landmarkTypes[i / 2],
            colourFill: colourMapping.fill,
            colourUncertainty: colourMapping.uncertainty
        });
    }
    return map;
};

server.get('/controller/photo', (req, res) => {
    console.log("/controller/photo - get");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({imageString: latestImageString}));
});

server.post('/rover/telemetry', (req, res) => {
    const currentDateTime = new Date();
    console.log("/rover/telemetry");
    if (req && req.body && req.body.imageString) {
        console.log("/rover/telemetry message received imageString: " + req.body.imageString);
        console.log("string size: " + req.body.imageString.length);
        latestImageString = req.body.imageString;
    }

    /*const kalmanState = parseKalmanStateToJSON(req.body.kalmanState);
    const kalmanVariances = parseKalmanVariancesToJSON(req.body.kalmanVariances);
    const map = constructMapFromStateAndVariances(kalmanState, kalmanVariances, ['R', 'G']);

    const dbRecord = {
        order: telemetryOrder,
        map,
        status: {
            averageCurrent: parseFloat(req.body.averageCurrent),
            batteryRemaining: parseFloat(req.body.batteryRemaining),
            batteryPercentage: parseFloat(req.body.batteryPercentage),
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
    });*/
    res.end(JSON.stringify({message: "Command received"}));
});

server.post('/controller/photo', (req, res) => {
    console.log("/controller/photo");
    const command = {};
    command.order = commandOrder;
    command.type = "photo";
    commandOrder++;
    commandsDatabase.insert(command);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: "Command received"}));
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