const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function UserConnected(socket) {
  console.log('A user connected.');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('msg', (msg) => {
    io.emit('msg', msg);
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000.');
});
