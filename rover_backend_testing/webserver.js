const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const ImageJS = require('imagejs');
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
let latestImageString = "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";

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

const database_observations = new Datastore('./data/observations.db');
database_observations.loadDatabase();
database_observations.remove({}, {multi: true}, (err, numRemoved) => console.error('problem clearing DB: ' + err));

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
            color: colourMapping[landmarkTypes[i / 2]]
        });
    }
    return map;
};

server.get('/controller/photo', (req, res) => {
    console.log("/controller/photo - get");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({imageString: latestImageString}));
});

const convertImageToDataString = (input) => {
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
    const attachedBitmap = new ImageJS.Bitmap({
        width: 80,
        height: 60,
        data: buffer
    });
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const filename = `images/image-${timestamp}.jpg`;
    attachedBitmap.writeFile(filename, {quality: 100})
        .then(function () {
            latestImageString = fs.readFileSync(filename, 'base64');
            console.log("imageAsBase64: " + latestImageString);
        });
    return buffer;
}

const parseObservations = (observationsString, roverX, roverY, roverAngle) => {
    const arraySplit = observationsString.split(';');
    const result = [];
    for (let i = 0; i < arraySplit.length / 4; i++) {
        //String(observation->land_dist) + ";" + String(observation->land_ang) + ";" + String(observation->color) + ";"
        const observationObj = {
            distance: arraySplit[4 * i],
            angle: arraySplit[4 * i + 1],
            color: arraySplit[4 * i + 2],
            roverX, roverY, roverAngle,
            timestamp: Date.now()
        };
        result.push(observationObj);
    }
    return result;
};

server.post('/rover/telemetry', (req, res) => {
    const currentDateTime = new Date();
    console.log("/rover/telemetry");
    console.log(JSON.stringify(req.body));
    if (req && req.body && req.body.imageData) {
        console.log("/rover/telemetry message received imageString: " + req.body.imageData);
        console.log("string size: " + req.body.imageData.length);
        convertImageToDataString(req.body.imageData);
    }

    const kalmanState = parseKalmanStateToJSON(req.body.kalmanState);
    const kalmanVariances = parseKalmanVariancesToJSON(req.body.kalmanVariances);
    const map = constructMapFromStateAndVariances(kalmanState, kalmanVariances, ['R', 'G']);
    if (req.body.observations) {
        const observations = parseObservations(req.body.observations, kalmanState[0], kalmanState[1], kalmanState[2]);
        observations.forEach(obs => {
            database_observations.insert(obs);
        });
    }
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
    });
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
        if (data[0]) {
            data[0]["imageData"] = latestImageString;
        } else {
            data["imageData"] = latestImageString;
        }
        database_observations.find({}).exec((err, dataObs) => {
            if (data[0]) {
                data[0]["observations"] = dataObs.sort((a, b) => a.timestamp < b.timestamp);
            } else {
                data["observations"] = dataObs.sort((a, b) => a.timestamp < b.timestamp);
            }
            res.end(JSON.stringify(data));
        });
    });
});

server.listen(5000, "0.0.0.0");
console.log("Listening on port " + 5000);