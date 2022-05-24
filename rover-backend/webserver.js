var express = require('express');
var server = express();
var bodyParser = require('body-parser');
server.use(bodyParser.json());

server.get('/', function(req, res) {
res.writeHead(200, {'Content-Type':'text/html'});
res.end(htmlContent);
});
server.post('/primality-test', function(req, res) {
//formData is a JavaScript object
const formData = req.body;
const responseContent = "<p>The number is"+ primeOrNot(formData.num1)+"</p>";
res.writeHead(200, {'Content-Type':'text/html'});
res.end(responseContent);
});
console.log('Server is running on port 3000');
server.listen(4000,'127.0.0.1');