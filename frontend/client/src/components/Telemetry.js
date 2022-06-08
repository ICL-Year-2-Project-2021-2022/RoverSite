import React from 'react'

export default function Telemetry(props) {
    return (
        <div className="score-board">
            <h2>Telemetry</h2>
            <div>Speed:{ props.speed }</div>
            <div>Mars Statistics: 1</div>
        </div>
    )
}