import React from 'react'
import './Telemetry.css'

export default function Telemetry(props) {
    
    return (
        <div className="score-board" style={{marginLeft:'auto', marginRight:'auto'}}>
            <h2>Telemetry</h2>
            <div>Packet order: {props.order}</div>
            <div>Average current: {props.averageCurrent} mA</div>
            <div>Battery: {props.batteryPercentage} %</div>
            <div>Battery charge: {props.batteryRemaining} mAh</div>
            <div>Optical flow sensor 1 features: {props.opticalFlowSensor1} </div>
            <div>Optical flow sensor 2 features: {props.opticalFlowSensor2} </div>
        </div>
    )
}