(function () {

    'use strict';

    angular
        .module('libApp')
        .directive('formHelper', formHelper);

    /*@ngInject*/
    function formHelper($compile) {
        var directive = {
            restrict: 'A',
            replace: false,
            scope: false,
            terminal: true,
            priority: 1000,
            link: function link(scope, element, attrs) {
                element.attr('uib-tooltip',  attrs.formHelper);
                element.attr('tooltip-trigger', 'focus');
                element.attr('tooltip-placement', 'bottom');
                element.addClass('form-helper');
                element.removeAttr('form-helper');
                $compile(element)(scope);
            }
        };

        return directive;
    }

})();