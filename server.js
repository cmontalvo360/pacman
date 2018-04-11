var express = require('express');
var path = require('path');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
})
app.use(express.static(path.join(__dirname, "./static")));

serv.listen(8000);

var io = require('socket.io').listen(serv);

io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    
    socket.on( "button_clicked", function (data){
        console.log( 'Someone clicked a button!  Reason: '  + data.reason);
        socket.emit( 'server_response', {response:  "sockets are the best!"});
    })
  })