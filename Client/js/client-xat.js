var AplicacioXat = function () {
    var socol = io();

    $('form').submit(function(){
        socol.emit('missatge_xat', $('#missatge').val());
        $('#missatge').val('');
        return false;
    });

    socol.on('missatge_xat', function(msg){
        $('#missatges').append($('<li>').text(msg));
    });

    socol.on('missatge_estat', function(msg){
        $('#missatges').append($('<li class="estat">').text(msg));
    });
};