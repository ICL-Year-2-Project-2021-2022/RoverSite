import React from 'react';
import './App.css';

import GridBoard from './components/GridBoard'
import Telemetry from './components/Telemetry'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Rover Mapping</h1>
      </header>
      <GridBoard />
      <Telemetry />
    </div>
  );
}

export default App;