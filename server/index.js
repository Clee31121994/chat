let express = require('express');
const { Socket } = require('socket.io');
let app = express();
let server = require('http').Server(app);
//let io = require('socket.io')(server);
let io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola mundo desde ruta');
});

let messages = [{
    id: 1,
    text: 'Bienvemido al chat privado de Socket.io y NodeJS...',
    nickname: 'Bot - Cristian Lee'
}];

io.on('connection', function(socket){
    console.log("El cliente con IP: "+socket.handshake.address+" se ha conectado...");

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

   

server.listen(6677, function(){
    console.log('Servidor esta funcionando en http://localhost:6677');
});