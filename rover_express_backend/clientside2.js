const fetch = require('node-fetch');
let url = 'http://127.0.0.1:3000/controller/get/json';

var obj

fetch(url)
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => console.log(obj))
    .catch(err => console.error(err));