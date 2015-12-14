(
	/*
	This directive is used in card layout to display a card
	for each file.
	*/

	function() {

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
			controller: FilecardController,
			controllerAs: 'filecard',
			templateUrl: 'app/components/file-card/filecard.html'
		};

		return directive;
	}

	function FilecardController() {
		var vm = this;

		vm.getIconClass = getIconClass;
		vm.getFaClass = getFaClass;

		function getIconClass(type) {
			switch(type) {
				case 'Audio':
					return 'icon-music';
				case 'Videos':
					return 'icon-video';
				case 'Digital courses':
					return 'icon-course';
				case 'Documents':
					return 'icon-doc';
				case 'Photos':
					return 'icon-photo';
				case 'Books':
					return 'icon-book';
				default:
					return '';
			}
		}

		function getFaClass(type) {
			switch(type) {
				case 'Audio':
					return 'fa fa-music';
				case 'Videos':
					return 'fa fa-video-camera';
				case 'Digital courses':
					return 'fa fa-graduation-cap';
				case 'Documents':
					return 'fa fa-file-text-o';
				case 'Photos':
					return 'fa fa-camera';
				case 'Books':
					return 'fa fa-book';
				default:
					return '';
			}
		}
	}

})();