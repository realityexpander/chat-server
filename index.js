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

    if (('' + msg).indexOf('debugger') >= 0)
      debugger;

    io.emit('chat message', this.conn.id.slice(-4).split("").reverse().join("") + " -> " + msg);
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

// add to messages
// eval!$('<img src="'+ 'https://i.ytimg.com/vi/PxG0cprSWcU/hqdefault.jpg' 
//  +'"></li>').load(function() {   $(this).width(100).height(100).appendTo('#messages'); });

// eval!setInterval(() => {
//   let tmp = new Date().getMilliseconds();
//   socket.emit('chat message', tmp - window.__lastTime);
//   window.__lastTime = tmp;
// }, 2000)

// to see debugger remotely
// chrome://inspect/#devices
// add target discovery settings:
//   realityexpander.ml:3001

// add to body
// eval!$('<img src="'+ 'https://i.ytimg.com/vi/PxG0cprSWcU/hqdefault.jpg'   +'"></li>')
//   .load(function() {   $(this).width(100).height(100)   
//   .css({top: '100px', left: '100px', position:'absolute'}).appendTo('#messages'); });

// eval!
// [10,20,30,40,50,60].map( i=> {
//   $('<img src="'+ 'https://i.ytimg.com/vi/PxG0cprSWcU/hqdefault.jpg'   +'"></li>')
//    .load(function() {   
//     $(this).width(i*10).height(i*10)   
//      .css({top: i*20+'px', left: i*20+'px', position:'absolute'})
//      .appendTo('#messages'); 
//     }); 
//   })
