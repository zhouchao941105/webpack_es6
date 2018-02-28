var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function (client) {
    client.on('event', function (msg) {
        console.log(msg);
    })
    client.on('disconnect', function () {

    })
    console.log(client);
})
server.listen(12345);
io.listen(server)