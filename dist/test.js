"use strict";
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
/*io.on('connection', (socket:any) => {
    console.log('a user connected');
    socket.on('chat message', (msg:string) => {
        console.log(`클라이언트 -> 서버에서 받음 ${msg}`)
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});*/
server.listen(3000, () => {
    console.log('listening on *:3000');
});
// 1.
const namespace1 = io.of('/namespace1');
namespace1.on('connection', (socket) => {
    namespace1.emit('news', { hello: "Someone connected at namespace1" });
});
// 2.
const namespace2 = io.of('/namespace2');
namespace2.on('connection', (socket) => {
    namespace2.emit('news', { hello: "Someone connected at Namespace2" });
});
//# sourceMappingURL=test.js.map