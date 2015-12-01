(function() {

	'use strict';

	angular
		.module('libApp')
		.directive('fileCard', fileCard);

	/*@ngInject*/
	function fileCard() {
		var directive = {
			restrict: 'E',
			scope: {
				file: '='
			},
			templateUrl: 'app/components/file-card/filecard.html'
		};

		return directive;
	}

})();