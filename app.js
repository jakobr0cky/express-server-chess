const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: "https://jakobr0cky.github.io/",
      methods: ["GET", "POST"]
    }
  });

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

http.listen(4444, () => {
    console.log('Listening on port 4444');
});