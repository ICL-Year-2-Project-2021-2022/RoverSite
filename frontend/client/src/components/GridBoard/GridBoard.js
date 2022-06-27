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
    
    let scale = paperWidth/3555
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
        let konva_height = 2337 * scale
        let shift = (paperHeight - konva_height)/2
        console.log(y)
        return y + shift
    }

    function degToRad(angle) {
        return angle / 180 * Math.PI;
    }

    function rotate(x,y, x_centre, y_centre, angle) {
        let phi = degToRad(angle)
        let xo = Math.round(
            x_centre +
                (x - x_centre) * Math.cos(phi) -
                (y - y_centre) * Math.sin(phi)
        );
        let yo = Math.round(
            y_centre +
                (x - x_centre) * Math.sin(phi) +
                (y - y_centre) * Math.cos(phi)
        );
        return {
            xo,
            yo,
            angle
        }
    }

    for (let i = 0; i < objects.length; i++) {
        let xe = objects[i].x * scale
        let ye = objects[i].y * scale
        ye = shift(ye, scale, paperHeight)
        let rad = 170 * scale
        let coordinates = centreImage(objects[i].x * scale, objects[i].y * scale, rad)
        let x = coordinates.x_1
        let y = coordinates.y_1
        y = shift(y, scale, paperHeight)
        let r1 = objects[i].rad_1 * scale
        let r2 = objects[i].rad_2 * scale
        let h = rad * 2
        let w = h
        let img
        let ellipse
        let theta = objects[i].rotation
        let logo 

        if(objects[i].type === "alien") {
            
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
            logo = <Image image={img} x={x} y={y} height={h} width ={w} />
        }
        if(objects[i].type === "obstacle") {
            img = obstaclePic
            logo = <Image image={img} x={x} y={y} height={h} width ={w} />
            ellipse = <Ellipse x={xe} y={ye} radius={{x:r1, y:r2}} rotation={theta} fill="gray" opacity={0.4} />
        }
        if(objects[i].type === "rover") {
            img = roverPic
            console.log(`x: ${x}, y: ${y}, xe: ${xe}, ye: ${ye}, x+rad: ${x+rad}, y+rad: ${y+rad}`)
            logo = <Image image={img} x={x} y={y} offsetX={h/2} offsetY={w/2} height={h} width ={w} rotation={60}  />
            ellipse = <Ellipse x={xe} y={ye} radius={{x:r1, y:r2}} rotation={theta} fill="violet" opacity={0.3} />
        }
        elements.push(logo)
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
                    height={(paperHeight - 2337 * scale)/2}
                    fill="#282c34"
                />
                {elements}
                <Rect
                    x={0}
                    y={paperHeight - (paperHeight - 2337 * scale)/2}
                    width={paperWidth}
                    height={(paperHeight - 2337 * scale)/2}
                    fill="#282c34"
                />
            </Layer>
        </Stage>
    )
}