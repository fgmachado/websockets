'use strict';

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    console.log('User connected...');

    socket.on('chat message', (message) => {
        console.log('Chat message: ' + message);
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected...');
    });
});

http.listen(3000, () => {
    console.log('Listening on port 3000...');
});