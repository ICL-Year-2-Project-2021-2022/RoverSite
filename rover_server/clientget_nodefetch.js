const fetch = require('node-fetch');
let url = 'http://54.224.62.48:3000/controller/get/json';

var obj;

fetch(url)
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => console.log(obj))
    .catch(err => console.error(err));