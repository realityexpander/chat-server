var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('user connected', socket.client.id);
  io.emit('chat message', 'User connected: ' + socket.client.id);
  socket.on('chat message', function (msg) {
    console.log("from:", this.conn.id, ":", msg)
    io.emit('chat message', this.conn.id + " -> " + msg);
  });
  socket.on('disconnect', function () {
    io.emit('chat message', 'User disconnected: ' + this.conn.id);
    console.log('user disconnected', this.conn.id);
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});

setInterval(function () {
  io.emit('chat message', Date())
}, 10000)



// Try these remote evals
// eval! $("form").append($("<p>").text("hi").css("background", "yellow"))
// eval! $("button").css("background","red")
// eval! socket.emit('chat message', JSON.stringify(Date()));
// eval! socket.emit('chat message', new Date().getMilliseconds())

// eval!$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
//      socket.emit('chat message', data.geobytesipaddress) 
//     })

// eval!$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
//      socket.emit('chat message', JSON.stringify(data)) 
//     })