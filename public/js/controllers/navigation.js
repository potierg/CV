angular
	.module(config.nameRoute)
	.controller('NavigationCtr', ['$scope', 'appSystem', 'appNavigation', function ($scope, appSystem, appNavigation) {
		$scope.navigateTo = appNavigation.page;
		$scope.currentPage = appNavigation.current;
		$scope.url = appNavigation.url;
	}])
;
