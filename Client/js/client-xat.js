var socol = io();

$('form').submit(function(){
    socol.emit('missatge xat', $('#missatge').val());
    $('#missatge').val('');
    return false;
});

socol.on('missatge xat', function(msg){
    $('#missatges').append($('<li>').text(msg));
});