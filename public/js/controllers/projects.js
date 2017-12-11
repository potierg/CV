angular
	.module(config.nameRoute)
	.controller('ProjectsCtr', ['$scope', 'appSystem', function ($scope, appSystem) {
		appSystem.ready(function()
		{
			console.log('Good');
		});
	}])
;
