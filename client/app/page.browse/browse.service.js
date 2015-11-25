(function() {

    'use strict';

    angular
        .module('libApp')
        .factory('browseService', browseService);

    /*ngInject*/
    function browseService($http) {
        var service = {
            getFiles: getFiles
        };

        return service;

        //////////////////

        function getFiles() {
            $http.get('/api/files').then(function(result) {
                console.log(result.data);
            });
        }

    }

})();