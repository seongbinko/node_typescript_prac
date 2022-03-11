"use strict";
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const redis = require('redis');
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
app.set('view engine', 'ejs');
app.set('views', 'dist/views');
server.listen(3000, () => {
    console.log('Connect at 3000');
});
app.get('/', (req, res) => {
    res.render('chat');
});
const room = ['room1', 'room2'];
let a = 0;
io.on('connection', (socket) => {
    io.sockets.emit('welcome', '티오더 채팅방에 오신 것을 환영합니다.');
    socket.on('disconnect', () => {
        console.log('채팅방 나감');
    });
    socket.on('joinRoom', (num, name) => {
        socket.join(room[num]);
        console.log(name + ' join a ' + room[num]);
        io.to(room[num]).emit('joinRoom', num, name);
    });
    socket.on('leaveRoom', (num, name) => {
        socket.leave(room[num]);
        console.log(name + ' leave a ' + room[num]);
        io.to(room[num]).emit('leaveRoom', num, name);
    });
    socket.on('chat message', (num, name, msg) => {
        // a = num;
        io.to(room[num]).emit('chat message', name, msg);
    });
});
//# sourceMappingURL=index.js.map