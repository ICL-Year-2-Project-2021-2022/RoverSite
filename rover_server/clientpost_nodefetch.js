const fetch = require('node-fetch');
let url = 'http://54.224.62.48:3000/controller/post/json';

var obj;

const data = {'id':2,'use':'testing'};

const opt = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    
};

fetch(url,opt);