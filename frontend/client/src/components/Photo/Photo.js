import React, {useState} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import './Photo.css'

export default function Photo(props) {
    const handleFetchImage = () => {
        const millis = Date.now();
        console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
        const command = {
            timestamp: millis
        };
        const URL = 'http://localhost:5000/controller/photo';
        axios.post(URL, command).then(console.log);
    };

    return <div>
        <Button variant="contained" onClick={handleFetchImage}>Fetch photo</Button>
    </div>
}