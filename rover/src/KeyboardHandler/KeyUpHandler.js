import React, {useRef} from 'react'
import axios from 'axios'

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