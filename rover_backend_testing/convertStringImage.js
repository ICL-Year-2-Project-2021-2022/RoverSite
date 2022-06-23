
function displayImg(input) {
    var splitWord= input.split("\n");
    let output = "";
    var red = new Array(60).fill(new Array(80));
    var green = new Array(60).fill(new Array(80));
    var blue = new Array(60).fill(new Array(80)); 
    var buffer = new Uint8ClampedArray(width * height * 4);
    for (let row = 0; row < splitWord.length; row++) {
      for (let col=0; col<4; col++){
        output += splitWord[row].charAt(col);
        console.log(splitWord[row].charCodeAt(col));
        red[row][col] = (splitWord[row].charCodeAt(col) & 0xc0) >> 6;
        green[row][col] = (splitWord[row].charCodeAt(col) & 0x38) >> 3;
        blue[row][col] = (splitWord[row].charCodeAt(col) & 0x07);
        console.log(red[row][col]);
        console.log(green[row][col]);
        console.log(blue[row][col]);
        var pos = (y * width + x) * 4; // position in buffer based on x and y
        buffer[pos  ] = red[row][col]*64;           // some R value [0, 255]
        buffer[pos+1] = green[row][col]*32;           // some G value
        buffer[pos+2] = blue[row][col]*32;           // some B value
        buffer[pos+3] = 255;           // set alpha channel
      }
      
    }
      
  }
  
  // create an offscreen canvas
  var canvas=document.createElement("canvas");
  var ctx=canvas.getContext("2d");
  
  canvas.width=80;
  canvas.height=60;
  var idata = ctx.createImageData(width, height);
  
  
  let imgstr = "TEST\nTEST\nTEST";
  displayImg(imgstr);
  
  idata.data.set(buffer);
  
  // update canvas with new data
  ctx.putImageData(idata, 0, 0);
  
  
  var dataUri = canvas.toDataURL();
  
  image.onload = imageLoaded;       // optional callback function
  image.src = dataUri
  
  