var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('user connected', socket.client.id);
  socket.on('chat message', function (msg) {
    console.log("from:", this.conn.id, ":", msg)
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected', arguments);
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});

setInterval(function () {
  io.emit('chat message', Date())
}, 5000)