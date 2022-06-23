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
            elements.push(<Image image={redPic} x={objects[i]["x"]} y={objects[i]["y"]} height={objects[i]["rad"]*2} width={objects[i]["rad"]*2} />)
        }
        if(objects[i]["type"] === "obstacle") {
            elements.push(<Image image={obstaclePic} x={objects[i]["x"]} y={objects[i]["y"]} height={objects[i]["rad"]*2} width={objects[i]["rad"]*2} />)
        }
        if(objects[i]["type"] === "rover") {
            elements.push(<Image image={roverPic} x={objects[i]["x"]} y={objects[i]["y"]} height={100} width={100} />)
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
                <Image image={greenPic} x={300} y={450} height={100} width={100} />
                <Image image={yellowPic} x={380} y={200} height={100} width={100} />
                <Image image={bluePic} x={515} y={20} height={100} width={100} />
                <Image image={pinkPic} x={20} y={540} height={100} width={100} />
                <Image image={obstaclePic} x={550} y={300} height={100} width={100} />
                <Image image={obstaclePic} x={20} y={400} height={100} width={100} />
                <Ellipse x={100} y={100} radius={{x:100,y:50}} fill="red" opacity={0.2} />
                <Ellipse x={218} y={150} radius={{x:70,y:100}} fill="gray" opacity={0.4} />
                <Ellipse x={428} y={240} radius={{x:100 ,y:100}} fill="yellow" opacity={0.35} />
                <Ellipse x={570} y={80} radius={{x:130 ,y:70}} fill="blue" opacity={0.35} rotation={30}/>
                <Ellipse x={70} y={445} radius={{x:70,y:40}} fill="gray" opacity={0.4} rotation={-30}/>
                <Ellipse x={70} y={590} radius={{x:70,y:60}} fill="pink" opacity={0.6} />
                <Ellipse x={350} y={500} radius={{x:80,y:60}} fill="green" opacity={0.3} rotation={75} />
                <Ellipse x={500} y={445} radius={{x:70,y:20}} fill="gray" opacity={0.4} rotation={-60}/>
                <Ellipse x={600} y={345} radius={{x:70,y:30}} fill="gray" opacity={0.4} rotation={60}/>
                <Ellipse x={551} y={548} radius={{x:70,y:80}} fill="cyan" opacity={0.4} rotation={60}/>
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