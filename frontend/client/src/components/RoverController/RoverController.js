import React, {useState} from 'react';
import axios from 'axios';
import './RoverController.css'

export default function RoverController(props) {
    const [rotateLeft, setRotateLeft] = useState(0);
    const [rotateRight, setRotateRight] = useState(0);
    const [moveForward, setMoveForward] = useState(0);
    const [moveBack, setMoveBack] = useState(0);
    const [driveMode, setDriveMode] = useState("Control");

    const handleSend = event => {
        const command = {
            driveMode, rotateLeft, rotateRight, moveForward, moveBack
        };
        const URL = 'http://localhost:5000/controller/command';
        axios.post(URL, command).then(console.log);
    };

    return <div>
        <h2>Control</h2>
        <div>
            <label>Drive mode</label>
            <div onChange={event => setDriveMode(event.target.value)}>
                <input type="radio" value="Control" name="drive-mode" defaultChecked={driveMode === "Control"}/> Controlled
                <input type="radio" value="Autonomous" name="drive-mode" defaultChecked={driveMode === "Autonomous"}/> Autonomous
            </div>
            <div>
                <label htmlFor="rotate-left">Rotate left:</label>
                <input id="rotate-left" type="number" value={rotateLeft}
                       onChange={event => setRotateLeft(event.target.value)}/>
            </div>
            <div>
                <label htmlFor="rotate-right">Rotate right:</label>
                <input id="rotate-right" type="number" value={rotateRight}
                       onChange={event => setRotateRight(event.target.value)}/>
            </div>
            <div>
                <label htmlFor="move-forward">Move forward:</label>
                <input id="move-forward" type="number" value={moveForward}
                       onChange={event => setMoveForward(event.target.value)}/>
            </div>
            <div>
                <label htmlFor="move-back">Move back:</label>
                <input id="move-back" type="number" value={moveBack}
                       onChange={event => setMoveBack(event.target.value)}/>
            </div>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>;
}