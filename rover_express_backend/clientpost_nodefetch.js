const fetch = require('node-fetch');
let url = 'http://127.0.0.1:3000/controller/post/json';

var obj;

const data = {'id':2,'use':'testing'};

const opt = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    
};

fetch(url,opt)
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => console.log(obj))
    .catch(err => console.error(err));