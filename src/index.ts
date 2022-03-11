const app = require('express')();
const server = require('http').Server(app);

const io = require('socket.io')(server);

const redis = require('redis');
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379}))

app.set('view engine', 'ejs');
app.set('views', 'dist/views');

server.listen(3000, () => {
    console.log('Connect at 3000');
});


app.get('/', (req: any, res: any) => {
    res.render('chat');
});

const room: string[] = ['room1', 'room2'];
let a: number = 0;

io.on('connection', (socket: any) => {
    io.sockets.emit('welcome', '심플 채팅방에 오신 것을 환영합니다.')

    socket.on('disconnect', () => {
        console.log('disconnected');
    });

    socket.on('joinRoom', (num: number, name: string) => {
        socket.join(room[num])
        console.log(name + ' join a ' + room[num]);
        io.to(room[num]).emit('joinRoom', num, name);
    });

    socket.on('leaveRoom', (num: number, name: string) => {
        socket.leave(room[num])
        console.log(name + ' leave a ' + room[num]);
        io.to(room[num]).emit('leaveRoom', num, name);
    });

    socket.on('chat message', (num: number, name: any, msg: any) => {
        // a = num;
        io.to(room[num]).emit('chat message', name, msg);
    });
});
