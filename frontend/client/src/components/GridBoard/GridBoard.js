import React from 'react'
import {Circle, Ellipse, Layer, Image, Rect, Stage} from 'react-konva';
import roverImg from './rover.png'
import obstacleImg from './obstacle.png'
import redAlien from './redAlien.png'
import blueAlien from './blueAlien.png'
import greenAlien from './greenAlien.png'
import pinkAlien from './pinkAlien.png'
import yellowAlien from './yellowAlien.png'
import useImage from 'use-image'

export default function GridBoard({map, paperHeight, paperWidth}) {
    const [roverPic] = useImage(roverImg)
    const [obstaclePic] = useImage(obstacleImg)
    const [redPic] = useImage(redAlien)
    const [bluePic] = useImage(blueAlien)
    const [greenPic] = useImage(greenAlien)
    const [pinkPic] = useImage(pinkAlien)
    const[yellowPic] = useImage(yellowAlien)
    let elements = []
    let objects = map
    for (let i = 0; i < objects.length; i++) {
        if(objects[i]["type"] === "alien") {
            elements.push(<Image image={redPic} x={objects[i]["x"]/672*436} y={objects[i]["y"]/672*436} height={objects[i]["rad"]*2/672*436} width={objects[i]["rad"]*2/672*436} />)
        }
        if(objects[i]["type"] === "obstacle") {
            elements.push(<Image image={obstaclePic} x={objects[i]["x"]/672*436} y={objects[i]["y"]/672*436} height={objects[i]["rad"]*2/672*436} width={objects[i]["rad"]*2/672*436} />)
        }
        if(objects[i]["type"] === "rover") {
            elements.push(<Image image={roverPic} x={objects[i]["x"]/672*436} y={objects[i]["y"]/672*436} height={100/672*436} width={100/672*436} />)
        }
    }
    return (
        <Stage width={paperWidth} height={paperHeight}>
            <Layer>
                <Rect
                    x={0}
                    y={0}
                    width={paperWidth}
                    height={paperHeight}
                    // here i need a border
                    strokeWidth={5} // border width
                    stroke="black" // border color
                />
                {elements}
                <Image image={greenPic} x={300/672*436} y={450/672*436} height={100/672*436} width={100/672*436} />
                <Image image={yellowPic} x={380/672*436} y={200/672*436} height={100/672*436} width={100/672*436} />
                <Image image={bluePic} x={515/672*436} y={20/672*436} height={100/672*436} width={100/672*436} />
                <Image image={pinkPic} x={20/672*436} y={540/672*436} height={100/672*436} width={100/672*436} />
                <Image image={obstaclePic} x={550/672*436} y={300/672*436} height={100/672*436} width={100/672*436} />
                <Image image={obstaclePic} x={20/672*436} y={400/672*436} height={100/672*436} width={100/672*436} />
                <Ellipse x={100} y={100} radius={{x:50,y:200}} zIndex={2} />
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