import {useEffect, useRef, useState} from "react";

// testing code to randomly generate 80x60 image 
function makeid(length) {
    var result = '';
    var characters = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const getConvertedImageData = (input) => {

    input = "";
    for (var i = 0; i < 60 - 1; i++) {
        input = input + makeid(80) + "\n";
    }
    input = input + makeid(80);

    console.log(input);

    var splitWord = input.split("\n");
    let output = "";
    var red = new Array(60).fill(new Array(80));
    var green = new Array(60).fill(new Array(80));
    var blue = new Array(60).fill(new Array(80));
    const width = 80;
    const height = 60;
    var buffer = new Uint8ClampedArray(width * height * 4);
    for (let row = 0; row < splitWord.length; row++) {
        for (let col = 0; col < splitWord[0].length; col++) {
            output += splitWord[row].charAt(col);
            //console.log(splitWord[row].charCodeAt(col));
            // encoding is 2-3-2 r-g-b
            red[row][col] = (splitWord[row].charCodeAt(col) & 0x60) >> 5;
            green[row][col] = (splitWord[row].charCodeAt(col) & 0x1C) >> 2;
            blue[row][col] = (splitWord[row].charCodeAt(col) & 0x03);
            console.log(splitWord[row].charCodeAt(col).toString(2), red[row][col], green[row][col], blue[row][col]);
            //console.log(green[row][col]);
            //console.log(blue[row][col]);
            var pos = (row * width + col) * 4; // position in buffer based on x and y
            buffer[pos] = red[row][col] * 128;           // some R value [0, 255]
            buffer[pos + 1] = green[row][col] * 64;           // some G value
            buffer[pos + 2] = blue[row][col] * 128;           // some B value
            buffer[pos + 3] = 255;           // set alpha channel
        }
    }
    console.log(buffer);
    return buffer;
}

const Photo = (input) => {

    const [imageUrl, setImageUrl] = useState("");

    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    const imageData = getConvertedImageData(input);

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Our first draw
        context.fillStyle = '#FFFFFF'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        // create imageData object
        var idata = context.createImageData(context.canvas.width, context.canvas.height);
        // set our buffer as source
        idata.data.set(imageData);
        // update canvas with new data
        context.putImageData(idata, 0, 0);
        var img_src = canvas.toDataURL("image/png");
        setImageUrl(img_src);

    }, [])

    return <>
        <canvas ref={canvasRef} width="80" height="60" style={{display: 'none'}}/>
        <img ref={imgRef} src={imageUrl} style={{width: '100%'}}/>
    </>;
}

export default Photo;