(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('BrowseController', BrowseController);

    /*@ngInject*/
    function BrowseController(browseService) {
        var vm = this;

        vm.getFiles = getFiles;

        vm.getFiles();

        //////////////////////////

        function getFiles() {
            browseService.getFiles();
        }
    }

})();