import React from 'react'
import './GridRow.css'

// Represents a grid square with a color

export default function GridRow(props) {
    return <div className="grid-row">{props.row}</div>
}