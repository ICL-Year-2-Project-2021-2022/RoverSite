import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import GridBoard from './components/GridBoard/GridBoard'
import Telemetry from './components/Telemetry/Telemetry'
import RoverController from "./components/RoverController/RoverController";
import useWindowDimensions from './useWindowDimensions';
import sexypic from "./aliens.jpeg"
import Photo from './components/Photo/photo';

const dummyTelemetryData = {
    order: 1,
    map: [ //cm 
        { x: 100, y: 100, rad: 20, type: "obstacle", rad_1: 50, rad_2: 25, rotation: 30 },
        { x: 200, y: 200, rad: 30, type: "alien", color: "green", rad_1: 50, rad_2: 100, rotation: 65 },
        { x: 50, y: 50, rad: 50, rotation: 90, type: "rover", rad_1: 30, rad_2: 30, rotation: 0 }
    ],
    status: {
        averageCurrent: 500,
        batteryPercentage: 50,
        batteryRemaining: 2500,
        opticalFlowSensor1: 123,
        opticalFlowSensor2: 456
    }
};

function App() {
    const [telemetry, setTelemetry] = useState({
        map: [ //cm 
            { x: 100, y: 100, type: "obstacle", rad_1: 50, rad_2: 25, rotation: 30 },
            { x: 200, y: 200, type: "alien", color: "green", rad_1: 50, rad_2: 100, rotation: 65 },
            { x: 50, y: 50, rotation: 90, type: "rover", rad_1: 30, rad_2: 30 }
        ], status: {
            averageCurrent: 500,
            batteryPercentage: 50,
            batteryRemaining: 2500,
            opticalFlowSensor1: 123,
            opticalFlowSensor2: 119
        }
    });
    const { height, width, boardHeight, boardWidth } = useWindowDimensions();

    useEffect(() => {
        const inteval = setInterval(() => {
            const URL = "http://localhost:5000/controller/telemetry";
            axios.get(URL)
                .then(res => {
                    const resTelemetry = res.data[0];
                    if (resTelemetry) {
                        setTelemetry(resTelemetry);
                    }
                })
                .catch(err => console.log(err));
        }, 100);
        return () => clearInterval(inteval);
    }, [telemetry]);
    //
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Rover Mapping</h1>
            </header>
            <div className="container">
                <Grid container spacing={2} className={"grid-container"}>
                    <Grid item md={6} xs={12} >
                        <Paper elevation={3} className={"paper-item"}>
                            <GridBoard map={telemetry.map}
                                paperHeight={boardHeight}
                                paperWidth={boardWidth} />
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item sm={6} xs={12}>
                                <Paper elevation={3} className={"paper-item"}>
                                    <Telemetry averageCurrent={telemetry.status.averageCurrent}
                                        batteryPercentage={telemetry.status.batteryPercentage}
                                        batteryRemaining={telemetry.status.batteryRemaining}
                                        opticalFlowSensor1={telemetry.status.opticalFlowSensor1}
                                        opticalFlowSensor2={telemetry.status.opticalFlowSensor2}
                                        order={telemetry.order} />
                                </Paper>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Paper elevation={3} className={"paper-item"}>
                                    <RoverController />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3} className={"paper-item video-paper"}>
                                    <Photo />
                                    {/*<img src={sexypic} alt="FPGA Image" width = "100%" />*/}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default App;