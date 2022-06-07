import React from 'react';
import './App.css';

import GridBoard from './components/GridBoard'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Rover Mapping</h1>
      </header>
      <GridBoard />
      <p>test</p>
    </div>
  );
}

export default App;