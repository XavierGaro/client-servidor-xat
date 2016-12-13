var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Encaminament
app.get('/', function(peticio, resposta){
    resposta.sendFile(path.resolve(__dirname + '/../Client/index.html'));
});

app.get('/css/:fitxer', function(peticio, resposta){
    resposta.sendFile(path.resolve(__dirname + '/../Client/css/'+ peticio.params.fitxer));
});

app.get('/js/:fitxer', function(peticio, resposta){
    resposta.sendFile(path.resolve(__dirname + '/../Client/js/' + peticio.params.fitxer));
});

// Gestió de les connexions
io.on('connection', function(socol){
    socol.broadcast.emit('missatge xat', 'Un nou usuari s\'ha connectat');

    console.log('Un usuari connectat');

    socol.on('disconnect', function(){
        socol.broadcast.emit('missatge xat', 'Un usuari s\'ha desconnectat');
        console.log('usuari desconnectat');
    });

    socol.on('missatge xat', function(msg){
        console.log('missatge: ' + msg);
        io.emit('missatge xat', msg);

    });
});

// S'inicia la escolta del servidor pel port 3000
http.listen(3000, function(){
    console.log('Escoltant a *:3000');
});