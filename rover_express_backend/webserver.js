var express = require('express');
var server = express();

server.get('/',function(req,res){
    res.sendFile('/home/marcochan/Desktop/Github_MarsRover/RoverSite/rover_express_backend/index.html');
});
// Serve interface

server.listen(3000, "0.0.0.0");
console.log("Listening on port " + 3000);