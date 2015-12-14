(
    /*
     This directive is used to help users fill in the form.
     It displays an icon which shows a tooltip with error on hover.
     */

    function() {

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