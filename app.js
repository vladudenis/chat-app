const http = require('http');
const express = require('express');
const hbs = require('express-handlebars');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'views/partials/'
}));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static('./public/'));

app.get('/', (req, res) => {
  res.render('chat');
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

server.listen(8000, () => {
  console.log('Listening on port 8000.');
});
