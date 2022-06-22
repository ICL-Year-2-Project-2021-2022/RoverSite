import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './App.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import GridBoard from './components/GridBoard/GridBoard'
import Telemetry from './components/Telemetry/Telemetry'
import RoverController from "./components/RoverController/RoverController";

const dummyTelemetryData = {
    order: 1,
    map: [
        {x: 100, y: 100, rad: 20, type: "obstacle"},
        {x: 200, y: 200, rad: 30, type: "alien"},
        {x: 50, y: 50, rad: 5, rotation: 90, type: "rover"}
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
    const [telemetry, setTelemetry] = useState({map: [], status: {}});
    const [mapSize, setMapSize] = useState({height: 500, width: 500});
    const slamMapPaper = useRef(null);

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

        if (mapSize.height !== slamMapPaper.current.offsetHeight - 32 || mapSize.width !== slamMapPaper.current.offsetWidth - 32) {
            setMapSize({height: slamMapPaper.current.offsetHeight - 32, width: slamMapPaper.current.offsetWidth - 32});
        }
        return () => clearInterval(inteval);
    }, [telemetry, mapSize]);
    //
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Rover Mapping</h1>
            </header>
            <div className="container">
                <Grid container spacing={2} className={"grid-container"}>
                    <Grid item lg={6} xs={12}  ref={slamMapPaper}>
                        <Paper elevation={3} className={"paper-item"}>
                            <GridBoard map={telemetry.map}
                                       paperHeight={mapSize.height}
                                       paperWidth={mapSize.width}/>
                        </Paper>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper elevation={3} className={"paper-item"}>
                                    <Telemetry averageCurrent={telemetry.status.averageCurrent}
                                               batteryPercentage={telemetry.status.batteryPercentage}
                                               batteryRemaining={telemetry.status.batteryRemaining}
                                               opticalFlowSensor1={telemetry.status.opticalFlowSensor1}
                                               opticalFlowSensor2={telemetry.status.opticalFlowSensor2}
                                               order={telemetry.order}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper elevation={3} className={"paper-item"}>
                                    <RoverController/>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3} className={"paper-item video-paper"}>
                                    Photo
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