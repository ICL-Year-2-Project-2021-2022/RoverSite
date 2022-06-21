import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import GridBoard from './components/GridBoard/GridBoard'
import Telemetry from './components/Telemetry'
import RoverController from "./components/RoverController/RoverController";

const dummyTelemetryData = {
    order: 1,
    map: [
        {x: 100, y: 100, rad: 20, type: "obstacle"},
        {x: 200, y: 200, rad: 30, type: "alien"},
        {x: 50, y: 50, rad: 5, rotation: 90, type: "rover"}
    ],
    status: {
        batteryPercentage: 50,
        opticalFlowSensor1: 123,
        opticalFlowSensor2: 456
    }
};

function App() {
    const [telemetry, setTelemetry] = useState({map: [], status: {}});
    let sum = 0
    let len = 0
    let rtt = 0
    useEffect(() => {
        const inteval = setInterval(() => {
            const URL = "http://localhost:5000/controller/telemetry";
            let d = new Date()
            axios.get(URL)
                .then(res => {
                    const resTelemetry = res.data[0];
                    if (resTelemetry) {
                        setTelemetry(resTelemetry);
                    }
                })
                .catch(err => console.log(err));
            let b = new Date()
            sum = sum + b.getTime() - d.getTime()
            len = len + 1
            rtt = sum/len
            console.log(len)
            console.log(rtt)
        }, 100);

        return () => clearInterval(inteval);
    });

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Rover Mapping</h1>
            </header>
            <div className="container">
                <GridBoard map={telemetry.map}/>
                <div>
                    <Telemetry batteryPercentage={telemetry.status.batteryPercentage}
                               opticalFlowSensor1={telemetry.status.opticalFlowSensor1}
                               opticalFlowSensor2={telemetry.status.opticalFlowSensor2}
                               order={telemetry.order}/>
                    <RoverController/>
                </div>
            </div>
        </div>
    );
}

export default App;