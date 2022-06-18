import React from 'react'
import { Stage, Layer, Circle } from 'react-konva';


export default function GridBoard(map) {
    let elements = []
    let objects = map.map
    for (let i = 0; i < objects.length; i++) {
        if(objects[i]["type"] === "alien") {
            elements.push(<Circle x={objects[i]["x"]} y={objects[i]["y"]} radius={objects[i]["rad"]} fill="green" />)
        }
        if(objects[i]["type"] === "obstacle") {
            elements.push(<Circle x={objects[i]["x"]} y={objects[i]["y"]} radius={objects[i]["rad"]} fill="red" />)
        }
    }
    return(
        <Stage width={1000} height={1000} strokeWidth = {2} stroke="black">
            <Layer>
            {elements}
            </Layer>
      </Stage>
    )
}

/*
import GridSquare from '../GridSquare/GridSquare'
import GridRow from '../GridRow/GridRow'
import './GridBoard.css'


const toGridComponents = gridData => {
    const gridRows = []
    for (let rowIndex = 0; rowIndex < gridData.height; rowIndex++) {
        const row = [];
        for (let col = 0; col < gridData.width; col++) {
            row.push(<GridSquare key={`${col}${rowIndex}`}
                                 color={gridData.data[gridData.width * rowIndex + col].toString()}/>);
        }
        gridRows.push(<GridRow row={row} key={`row-${rowIndex}`}/>);
    }
    return gridRows;
};

export default function GridBoard({map}) {
    return (
        <div className='grid-board'>
            {toGridComponents(map)}
        </div>
    )
}*/