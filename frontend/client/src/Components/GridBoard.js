import React, { useState, useEffect } from 'react'
import GridSquare from './GridSquare'
import axios from 'axios'


// Represents a 10 x 18 grid of grid squares

export default function GridBoard(props) {
    
  // generates an array of 80 rows, each containing 45 GridSquares.

    const grid = []
    for (let row = 0; row < 80; row ++) {
        grid.push([])
        for (let col = 0; col < 45; col ++) {
            grid[row].push(<GridSquare key={`${col}${row}`} color="1" />)
        }
    }

    const [board, setBoard] = useState(grid)

  // requests/receives json from backend every interval
    const period = 1000
    useEffect(() => {
        const interval = setInterval(() => {
            const URL = "http://localhost:5000/controller/post/json"
            axios.post(URL, {
                "id": 3,
                "countfor": 4,
                "countback": 4,
                "countleft": 4,
                "countright": 3
                })
                .then(data => {
                    setBoard(data)
                    console.log(data)
                })
                .catch(err => console.log(err))
        }, period)

        return () => clearInterval(interval)
    }, [])

  // The components generated in makeGrid are rendered in div.grid-board

    return (
        <div className='grid-board'>
            {grid}
        </div>
    )
}