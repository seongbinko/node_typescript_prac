// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get('/', (req:any, res:any) => {
//     res.sendFile(__dirname + '/index.html');
// });
//
// /*io.on('connection', (socket:any) => {
//     console.log('a user connected');
//     socket.on('chat message', (msg:string) => {
//         console.log(`클라이언트 -> 서버에서 받음 ${msg}`)
//         io.emit('chat message', msg);
//     });
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });*/
//
// server.listen(3000, () => {
//     console.log('listening on *:3000');
// });
//
// // 1.
// const namespace1 = io.of('/namespace1');
//
// namespace1.on('connection', (socket:any) => {
//     namespace1.emit('news', {hello: "Someone connected at namespace1"})
// });
//
// // 2.
// const namespace2 = io.of('/namespace2');
//
// namespace2.on('connection', (socket:any) => {
//     namespace2.emit('news', {hello: "Someone connected at Namespace2"});
// })

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.set('views', 'dist/views');

let room: string[] = ['room1', 'room2'];
let a: number = 0;


app.get('/', (req: any, res: any) => {
    res.render('chat');
});


io.on('connection', (socket: any) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


    socket.on('leaveRoom', (num: number, name: string) => {
        socket.leave(room[num])
        console.log(name + ' leave a ' + room[num]);
        io.to(room[num]).emit('leaveRoom', num, name);
    });


    socket.on('joinRoom', (num: number, name: string) => {

        // socket.join(room[num], () => {
        //     console.log(name + ' join a ' + room[num]);
        //     io.to(room[num]).emit('joinRoom', num, name);
        // });

        socket.join(room[num])
        console.log(name + ' join a ' + room[num]);
        io.to(room[num]).emit('joinRoom', num, name);
    });


    socket.on('chat message', (num: any, name: any, msg: any) => {
        a = num;
        io.to(room[a]).emit('chat message', name, msg);
    });
});


http.listen(3000, () => {
    console.log('Connect at 3000');
});