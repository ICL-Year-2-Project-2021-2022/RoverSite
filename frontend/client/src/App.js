
import React from 'react';
import './App.css';
import {Grid} from './Components/Grid'

const arrOfObj = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

function App() {
  
  return (
    
    <div className="App">
    <Grid arrOfObj={arrOfObj}/>
    </div>
  );
}

export default App;