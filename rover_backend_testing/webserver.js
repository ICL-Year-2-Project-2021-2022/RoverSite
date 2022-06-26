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

const parseKalmanStateToJSON = stateString => stateString.split(',').map(parseFloat);

const parseKalmanVariancesToJSON = variancesString => variancesString.split(';').map(it => it.split(',').map(parseFloat));

const constructMapFromStateAndVariances = (state, variances, landmarkTypes) => {
    const map = [];
    const rover = {
        x: state[0],
        y: state[1],
        rotation: state[2],
        rad_1: Math.sqrt(variances[0][0]),
        rad_2: Math.sqrt(variances[1][1]),
        type: "rover"
    }
    map.push(rover);
    for (let i = 0; i < state.length - 3; i += 2) {
        const colourMapping = ["red", "blue", "green", "lime", "pink", "yellow", "black"]
        /*make landmark type : color on ESP
        0 : redAlien
        1 : blueAlien
        2 : greenAlien
        3 : limeAlien
        4 : pinkAlien
        5 : yellowAlien
        6 : black
        */

        map.push({
            x: state[i + 3],
            y: state[i + 4],
            rad_1: Math.sqrt(variances[i + 3][i + 3]), 
            rad_2: Math.sqrt(variances[i + 4][i + 4]),
            type: landmarkTypes[i / 2],
            color: colourMapping[landmarkTypes[i/2]]
        });
    }
    return map;
};

server.get('/controller/photo', (req, res) => {
    console.log("/controller/photo - get");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({imageString: latestImageString}));
});

const getConvertedImageData = (input) => {
    var splitWord = input.split(",");
    console.log(splitWord);
    const joined = splitWord.join('');
    let output = "";
    const width = 80;
    const height = 60;
    var buffer = new Uint8ClampedArray(width * height * 4);
    console.log(splitWord.length);
    console.log(splitWord[0].length);
    for (let i = 0; i < joined.length; i++) {
        const column = Math.floor(i / 80);
        const row = (i) % 80;
        const character = joined.charCodeAt(i);
        const red = (character & 0x60) >> 5;
        const green = (character & 0x1C) >> 2;
        const blue = (character & 0x03);
        const pos = (column * width + row) * 4; // position in buffer based on x and y
        buffer[pos] = red * 128;           // some R value [0, 255]
        buffer[pos + 1] = green * 64;           // some G value
        buffer[pos + 2] = blue * 128;           // some B value
        buffer[pos + 3] = 255;           // set alpha channel
    }

    console.log(buffer);
    return buffer;
}

server.post('/rover/telemetry', (req, res) => {
    const currentDateTime = new Date();
    console.log("/rover/telemetry");
    console.log(JSON.stringify(req.body));
    if (req && req.body && req.body.imageString) {
        console.log("/rover/telemetry message received imageString: " + req.body.imageString);
        console.log("string size: " + req.body.imageString.length);
        latestImageString = req.body.imageString;
        console.log(getConvertedImageData(latestImageString));
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