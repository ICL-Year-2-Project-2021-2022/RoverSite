import React from 'react';
import './App.css';

import GridBoard from './components/GridBoard/GridBoard'
import Telemetry from './components/Telemetry'
import RoverController from "./components/RoverController/RoverController";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Rover Mapping</h1>
            </header>
            <div className="container">
                <GridBoard/>
                <div>
                    <Telemetry/>
                    <RoverController/>
                </div>
            </div>
        </div>
    );
}

export default App;