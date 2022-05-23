import './App.css';
import React, { useRef } from 'react';

function App() {

  function KeyUpHandler() {

    const keysPressedDown = useRef({});
    console.log("Hi")
        window.addEventListener("keydown",
            (event) => {
                // up
                if (event.key === "ArrowUp") {
                    keysPressedDown.current[event.code] = true;
                }
            }, false);
        window.addEventListener("keyup",
            event => {
                // up
                if (event.key === "ArrowUp") {
                    keysPressedDown.current[event.code] = false;
                }
            }, false);

    return <></>

}

  return (
  <>
    <p> Enter Up or Down</p>
      {KeyUpHandler()}
  </>
  );
}

export default App;
