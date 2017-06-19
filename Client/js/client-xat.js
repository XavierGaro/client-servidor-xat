/**
 * Aquest fitxer inclou tota la funcionalitat necessaria per connectar amb
 * un servidor de xat mitjançant WebSockets i més concretament amb la
 * biblioteca Socket.io.
 *
 * @autor Xavier Garcia <email@example.com>
 * @verion: 3.0.1
 * @license GNU GPLv3
 * @summary Client simple per una aplicació de xat mitjançant Socket.io
 */

/**
 * Constructor per instanciar aplicacions de xat que connectan amb un servidor remot, sincronitzen la entrada
 * de dades amb l'enviament al servidor i mostren per pantalla les dades rebudes.
 *
 * @constructor
 * @requires jQuery
 * @requires Socket.io
 */
var AplicacioXat = function () {

    /**
     * Sòcol de connexió a un servidor
     *
     * @typedef {Object} Socketclien
     * @method Socket.on - detecta quan es produeix un esdeveniment
     * @method Socket.emit - dispara un esdeveniment
     * @emits AplicacioXat#event:missatge_xat
     * @listens AplicacioXat#event:missatge_xat
     * @listens AplicacioXat#event:missatge_estat
     */

    /**
     * Event que indica que s'ha enviat o rebut un missatge de xat
     *
     * @event AplicacioXat~missatge_xat
     */

    /**
     * Event que indica que s'ha modificat l'estat
     *
     * @event AplicacioXat~missatge_estat
     */

    /**
     * @type {Socket}
     * @private
     */
    var socol = io();

    /**
     * @type {jQuery}
     * @listens submit
     * @private
     */
    var $form = $('form');

    $form.submit(
        /**
         * Envia el contingut del quadre de text al servidor mitjançant
         * el sòcol i neteja el contingut del quadre de text.
         *
         * @callback
         * @returns {boolean}
         */
        function () {
            socol.emit('missatge_xat', $('#missatge').val());
            $('#missatge').val('');
            return false;
        }
    );

    socol.on('missatge_xat',
        /**
         * Afegeix un missatge a la llista de missatges.
         *
         * @callback
         * @param {string} msg - missatge d'entrada
         */
        function (msg) {
            afegirMissatge(msg);
        }
    );

    socol.on('missatge_estat',

        /**
         * Afegeix un missatge de canvi d'estat la llista de missatges.
         *
         * @callback
         * @param {string} msg - missatge d'estat
         */
        function (msg) {
            afegirMissatge(msg, true);
        }
    );

    /**
     * Afegeix un missatge al llistat de missatges.
     *
     * @private
     * @param {string} msg - missatge
     * @param {boolean} esEstat - indica si és un missatge d'estat o no
     */
    var afegirMissatge = function (msg, esEstat) {
        var className = esEstat ? "estat" : "";
        $('#missatges').append($('<li class=' + className + '>').text(msg));
    };


    /**
     * Suma dos números.
     *
     * @param {number} a - primer nombre a sumar
     * @param {number} b - segon nombre a sumar
     * @returns {number} suma dels dos nombres
     */
    function sum(a, b) {
        return a + b;
    }
};