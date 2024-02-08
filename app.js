const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }   
  });

http.on('connection',() => {
    console.log('connected');
})

const port = process.env.PORT | 8080;

io.on("connection", socket => {
    console.log(`Socket ${socket.id} connected to server socket`);
    var game;

    socket.on('joinRoom',(gameId) => {
        socket.join(gameId);
        io.emit('joined',io.sockets.adapter.rooms.get(gameId).size);
        socket.emit('setPlayer',io.sockets.adapter.rooms.get(gameId).size);

        game = gameId;
    })

    socket.on('checkJoin',(gameId) => {
        
    })

    socket.on('sendMove',(move) => {
        socket.to(game).emit('receiveMove',move);
    });

    socket.on('sendBlindMode',(blindMode) => {
        socket.to(game).emit('receiveBlindMode',blindMode);
    });
});

http.listen(port, () => {
    console.log('Listening on port: '+port);
});