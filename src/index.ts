const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port:number = 3000;

app.get('/', (req:any, res:any) => {
    res.send('<h1>Hello world</h1>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})