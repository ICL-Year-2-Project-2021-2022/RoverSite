import React from 'react'
import './Telemetry.css'

export default function Telemetry(props) {

  return (
    <div>
      <h3 className="score-title">Telemetry</h3>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Current (mA)</td>
            <td>{props.averageCurrent}</td>
          </tr>
          <tr>
            <td>Battery (%)</td>
            <td>{props.batteryPercentage}</td>
          </tr>
          <tr>
            <td>Charge (mAh)</td>
            <td>{props.batteryRemaining} </td>
          </tr>
          <tr>
            <td>S-Qual 1 </td>
            <td>{props.opticalFlowSensor1}</td>
          </tr>
          <tr>
            <td>S-Qual 2</td>
            <td>{props.opticalFlowSensor2}</td>
          </tr>
        </tbody>
      </table></div>
  )
}