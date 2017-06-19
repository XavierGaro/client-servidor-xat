var AplicacioXat = function () {
    var socol = io();

    $('form').submit(function(){
        socol.emit('missatge_xat', $('#missatge').val());
        $('#missatge').val('');
        return false;
    });

    socol.on('missatge_xat', function(msg){
        afegirMissatge(msg);
    });

    socol.on('missatge_estat', function(msg){
        afegirMissatge(msg, true);
    });
    
    afegirMissatge = function (msg, esEstat) {
        var className = esEstat ? "estat" : "";
        $('#missatges').append($('<li class='+ className + '>').text(msg));
    };
};
