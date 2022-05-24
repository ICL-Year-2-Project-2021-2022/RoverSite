import './App.css';
import React, { useRef } from 'react';


function App() {
  return (
  <>
    <p> Enter Up or Down</p>
      {KeyUpHandler()}
      {KeyDownHandler()}
  </>
  );
}

export default App;
