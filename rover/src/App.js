import './App.css';
import React, { useRef } from 'react';

function App() {

  function KeyUpHandler() {

    const keysPressedDown = useRef({});
        window.addEventListener("keydown",
            (event) => {
                // up
                if (event.key === "ArrowUp") {
                    console.log("Pressed Up")
                    keysPressedDown.current[event.code] = true;
                }
            }, false);
        window.addEventListener("keyup",
            event => {
                // up
                if (event.key === "ArrowUp") {
                    console.log("Let Go of Up")
                    keysPressedDown.current[event.code] = false;
                }
            }, false);

    return <></>

}

function KeyDownHandler() {

  const keysPressedDown = useRef({});
      window.addEventListener("keydown",
          (event) => {
              // up
              if (event.key === "ArrowDown") {
                  console.log("Pressed Down")
                  keysPressedDown.current[event.code] = true;
              }
          }, false);
      window.addEventListener("keyup",
          event => {
              // up
              if (event.key === "ArrowDown") {
                  console.log("Let Go of Down")
                  keysPressedDown.current[event.code] = false;
              }
          }, false);

  return <></>

}

  return (
  <>
    <p> Enter Up or Down</p>
      {KeyUpHandler()}
      {KeyDownHandler()}
  </>
  );
}

export default App;
