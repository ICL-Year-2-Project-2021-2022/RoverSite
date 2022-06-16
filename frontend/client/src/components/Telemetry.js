import React from 'react'

export default function Telemetry(props) {
    return (
        <div className="score-board">
            <h2>Telemetry</h2>
            <div>Packet order: {props.order}</div>
            <div>Battery: {props.batteryPercentage} %</div>
            <div>Optical flow sensor 1: {props.opticalFlowSensor1} </div>
            <div>Optical flow sensor 2: {props.opticalFlowSensor2} </div>
        </div>
    )
}