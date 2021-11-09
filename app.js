const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listen to established WebSocket connections with a client
io.on('connection', function UserConnected(socket) {
  console.log('A user connected.');

  // Log a client disconnect event to the console
  socket.on('disconnect', () => {
    console.log('A User disconnected.');
  });

  // Emit a message received by a client to all connected clients
  socket.on('msg', (msg) => {
    io.emit('message', msg);
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000.');
});
