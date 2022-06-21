const express = require('express');
const server = express();
const bodyParser = require('body-parser');
//nedb is a subset of mongodb, very lightweight
const cors = require('cors');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors({origin: '*'}));
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(url);

const tel_name = 'telemetry';

const com_name = 'commands';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const telemetry_db = client.db(tel_name);
    const collection = telemetry_db.collection('Telemetry');
    const command_db = client.db(com_name)
    const command_collection = command_db.collection('Command')

    let commandOrder = 0;

    server.post('/controller/command', (req, res) => {
        console.log('/controller/command');
        const command = req.body;
        command.order = commandOrder;
        commandOrder++;
        await command_db.insertOne(command);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: "Command received"}));
    });

    let telemetryOrder = 0;

    server.post('/rover/telemetry', (req, res) => {
        const currentDateTime = new Date();
        console.log("/rover/telemetry message received: " + currentDateTime);
    
        const kalmanState = parseKalmanStateToJSON(req.body.kalmanState);
        const kalmanVariances = parseKalmanVariancesToJSON(req.body.kalmanVariances);
        const map = constructMapFromStateAndVariances(kalmanState, kalmanVariances, ['R', 'G']);
    
        const dbRecord = {
            order: telemetryOrder,
            map,
            status: {
                batteryPercentage: parseInt(req.body.batteryPercentage),
                opticalFlowSensor1: parseInt(req.body.opticalFlowSensor1),
                opticalFlowSensor2: parseInt(req.body.opticalFlowSensor2)
            }
        };
        await telemetry_db.insertOne(dbRecord);
        telemetryOrder++;
    
        const commandOrder = parseInt(req.body.commandOrder);

        //TODO: Refactor below
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
        //TODO: Refactor below
        database_telemetry.find({}).sort({order: -1}).limit(1).exec((err, data) => {
            res.end(JSON.stringify(data));
        });
    });

    collection.deleteMany({}, function(err, result){
        // handle the error if any
        if (err) throw err;
        console.log("Collection is deleted! "+result);
        // close the connection to db when you are done with it
        telemetry_db.close();
    });

    command_collection.deleteMany({}, function(err, result){
        // handle the error if any
        if (err) throw err;
        console.log("Collection is deleted! "+result);
        // close the connection to db when you are done with it
        command_db.close();
    });

    return 'done.';
  }
  


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

server.listen(5000, "0.0.0.0");
console.log("Listening on port " + 5000);

main()
.then(console.log)
.catch(console.error)
.finally(() => client.close());
