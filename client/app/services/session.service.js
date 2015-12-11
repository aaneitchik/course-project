(function() {

    'use strict';

    angular
        .module('libApp')
        .service('Session', Session);

    function Session() {
        this.create = function(sessionId, user) {
            this.id = sessionId;
            this.user = user;
        };

        this.destroy = function() {
            this.id = null;
            this.user = null;
        };
    }

})();