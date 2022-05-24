import React, {useRef} from 'react'
import axios from 'axios'

function KeyDownHandler() {

    const keysPressedDown = useRef({});
        window.addEventListener("keydown",
            (event) => {
                // up
                if (event.key === "ArrowDown") {
                    console.log("Pressed Down")
                    axios.post()
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