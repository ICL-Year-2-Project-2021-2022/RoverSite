import React from 'react'

export default function textMap(props) {
    let aliens = []
    let obstacles = []
    let rover
    for(let i=0; i<props.map.length; i++) {
        if(props.map[i].type === "alien") {
            aliens.push(<div>({props.map[i].x},{props.map[i].y})mm with std. deviation {props.map[i].rad_1} in x, and std. deviation {props.map[i].rad_2} in y  </div>)
        }
        if(props.map[i].type === "obstacle") {
            obstacles.push(<div>({props.map[i].x},{props.map[i].y})mm with std. deviation {props.map[i].rad_1} in x, and std. deviation {props.map[i].rad_2} in y  </div>)
        }
        if(props.map[i].type === "obstacle") {
           rover = <div>({props.map[i].x},{props.map[i].y})mm with std. deviation {props.map[i].rad_1} in x, and std. deviation {props.map[i].rad_2} in y  </div>
        }
    }
    return (
        <div className="score-board" style={{marginLeft:'auto', marginRight:'auto'}}>
            <div><h1>Map Coordinates</h1></div>
            <div><h2>WARNING: Aliens Located!</h2></div>
            {aliens}
            <div style={{color : 'red'}}>ALERT: Obstacles Nearby!</div>
            {obstacles}
            <div><h2>Rover Located As Below:</h2></div>
            {rover}
        </div>
    );
}