import React, {useEffect, useState} from 'react'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


/*
function table({columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });

    return (
        <table {...getTableProps}>
            <thead>
                {headerGroups.map(column => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
            </thead>
            <tbody {...getTableBodyProps}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    )}
                }
            </tbody>
        </table>
    )
*/



function KeyboardInput () {

    //Below are our state hooks for the number of units up, down, left and right commanded by the rover
    const [upCount, setUpCount] = useState(0);
    const [rightCount, setRightCount] = useState(0);
    const [rowData] = useState({up : upCount, left : rightCount})
    const [colDef] = useState([{field : "Vertical"}, {field : "Horizontal"}])

    //Here is the event handler for key presses
    
    useEffect(() => {

        //The below is an event handler that increments the state
        function increment(direction) {
            switch (direction) {
                case "up":
                    const prevUpCount = upCount
                    setUpCount(prevUpCount + 1)
                    return

                case "right":
                    const prevRightCount = rightCount
                    setRightCount(prevRightCount + 1)
                    return
                default:
                    return
            }
        }

        function decrement(direction) {
            switch (direction) {
                case "up":
                    const prevUpCount = upCount
                    setUpCount(prevUpCount - 1)
                    return
                case "right":
                    const prevRightCount = rightCount
                    setRightCount(prevRightCount - 1)
                    return
                default:
                    return
            }
        }

        const eventHandler = event => {
            const code = event.code
            if(code === "KeyW" || code === "ArrowUp") {
                increment("up")
            }
            else if (code === "KeyS" || code === "ArrowDown") {
                decrement("up")
            }
            else if (code === "KeyD" || code === "ArrowRight") {
                increment("right")
            }
            else if (code === "KeyA" || code === "ArrowLeft") {
                decrement("right")
            } 
        }

        window.addEventListener("keydown", eventHandler)

        return (() => {
            window.removeEventListener("keydown", eventHandler)
        })
    })

    /*
    <AgGridReact
                rowData={rowData}
                colDef={colDef} />
    */

    return (
        <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
            <p>test</p>
        </div>
    );
}


export {KeyboardInput};