const fetch = require('node-fetch');
let url = 'http://34.236.146.145:3000/controller/get/json';

var obj;

fetch(url)
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => console.log(obj))
    .catch(err => console.error(err));