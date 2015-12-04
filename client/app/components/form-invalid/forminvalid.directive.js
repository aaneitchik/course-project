(function() {

    'use strict';

    angular
        .module('libApp')
        .directive('formInvalid', formInvalid);

    function formInvalid() {
        var directive = {
            restrict: 'E',
            scope: {
              text: '='
            },
            templateUrl: 'app/components/form-invalid/forminvalid.html'
        };

        return directive;
    }

})();