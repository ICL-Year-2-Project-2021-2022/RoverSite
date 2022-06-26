import React from 'react'
import {Ellipse, Layer, Image, Rect, Stage} from 'react-konva';
import roverImg from './Assets/rover.png'
import obstacleImg from './Assets/obstacle.png'
import redAlien from './Assets/redAlien.png'
import blueAlien from './Assets/blueAlien.png'
import greenAlien from './Assets/greenAlien.png'
import limeAlien from './Assets/limeAlien.png'
import pinkAlien from './Assets/pinkAlien.png'
import yellowAlien from './Assets/yellowAlien.png'
import useImage from 'use-image'
import { getBottomNavigationUtilityClass } from '@mui/material';


export default function GridBoard({map, paperHeight, paperWidth}) {
    
    let scale = paperWidth/355.5
    const [roverPic] = useImage(roverImg)
    const [obstaclePic] = useImage(obstacleImg)
    const [redPic] = useImage(redAlien)
    const [bluePic] = useImage(blueAlien)
    const [greenPic] = useImage(greenAlien)
    const [pinkPic] = useImage(pinkAlien)
    const[yellowPic] = useImage(yellowAlien)
    const [limePic] = useImage(limeAlien)
    let elements = []
    let objects = map
    
    function centreImage(x,y,radius) {
        return {x_1:x-radius, y_1:y-radius}
    }
    
    function shift(y, scale, paperHeight) {
        let konva_height = 233.7 * scale
        let shift = (paperHeight - konva_height)/2
        console.log(y)
        return y + shift
    }

    for (let i = 0; i < objects.length; i++) {
        let xe = objects[i].x
        let ye = objects[i].y
        ye = shift(ye, scale, paperHeight)
        let rad = 17 * scale
        let coordinates = centreImage(objects[i].x, objects[i].y, rad)
        let x = coordinates.x_1
        let y = coordinates.y_1
        y = shift(y, scale, paperHeight)
        let r1 = objects[i].rad_1
        let r2 = objects[i].rad_2
        let h = rad * 2
        let w = h
        let img
        let ellipse
        let theta = objects[i].rotation
        if(objects[i]["type"] === "alien") {
            
            if(objects[i].color === "red") {
                img = redPic
                ellipse = <Ellipse x={xe} y={ye} radius={{x:r1, y:r2}} rotation={theta} fill="red" opacity={0.2} />
            }
            if(objects[i].color === "blue") {
                img = bluePic
                ellipse = <Ellipse x={xe} y={ye} radius={{x:r1, y:r2}} rotation={theta} fill="blue" opacity={0.35} />
            }
            if(objects[i].color === "green") {
                img = greenPic
                ellipse = <Ellipse x={xe} y={ye} radius={{x:r1, y:r2}} rotation={theta} fill="green" opacity={0.3}/>
            }
            if(objects[i].color === "lime") {
                img = limePic
                ellipse = <Ellipse x={xe} y={ye} radius={{x:r1, y:r2}} rotation={theta} fill="lime" opacity={0.45} />
            }
            if(objects[i].color === "pink") {
                img = pinkPic
                ellipse = <Ellipse x={xe} y={ye} radius={{x:r1, y:r2}} rotation={theta} fill="pink" opacity={0.6} />
            }
            if(objects[i].color === "yellow"){
                img = yellowPic
                ellipse = <Ellipse x={xe} y={ye} radius={{x:r1, y:r2}} rotation={theta} fill="yellow" opacity={0.35} />
            }
            
        }
        if(objects[i].type === "obstacle") {
            img = obstaclePic
            ellipse = <Ellipse x={xe} y={ye} radius={{x:r1, y:r2}} rotation={theta} fill="gray" opacity={0.4} />
        }
        if(objects[i].type === "rover") {
            img = roverPic
            ellipse = <Ellipse x={xe} y={ye} radius={{x:r1, y:r2}} rotation={theta} fill="violet" opacity={0.3} />
        }
        elements.push(<Image image={img} x={x} y={y} height={h} width ={w} />)
        elements.push(ellipse)
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
                    stroke="#282c34" // border color
                />
                <Rect
                    x={0}
                    y={0}
                    width={paperWidth}
                    height={(paperHeight - 233.7 * scale)/2}
                    fill="#282c34"
                />
                {elements}
                <Rect
                    x={0}
                    y={paperHeight - (paperHeight - 233.7 * scale)/2}
                    width={paperWidth}
                    height={(paperHeight - 233.7 * scale)/2}
                    fill="#282c34"
                />
            </Layer>
        </Stage>
    )
}