appRoute
	.config(function($httpProvider, $compileProvider, $analyticsProvider)
	{
		//
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ms-appx|ms-appdata|x-wmapp0|tel|file|filesystem|http|local|data|ftp|mailto|chrome-extension):/);
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ms-appx|ms-appdata|x-wmapp0|tel|file|filesystem|http|local|data|ftp|mailto|chrome-extension):/);

		//
		$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};
		$httpProvider.defaults.useXDomain = true;

		//
		$analyticsProvider.virtualPageviews(true);
		$analyticsProvider.withAutoBase(true);
	})
	.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider)
	{
		$urlRouterProvider.otherwise('/app/home');

		$stateProvider
			.state('app',
			{
				url: '/app',
				abstract: true,
				resolve: {
					deps: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load({
							files: [
								'./js/models/network.js',
								'./js/models/system.js',
								'./js/models/navigation.js',
							]
						});
					}],
				},
				views: {
					'nav': {
						templateUrl: './templates/navigation.html',
						controller: 'NavigationCtr',
						resolve: {
							loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
								return $ocLazyLoad.load({
									files: [
										'./js/controllers/navigation.js',
									] 
								});
							}],
						}
					},
				}
			})
			.state('app.home',
			{
				url: '/home',
				views: {
				  'view@': {
						templateUrl: './templates/home_v3.html',
						controller: 'HomeCtr',
						resolve: {
							loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
								return $ocLazyLoad.load({
									files: [
										'./js/controllers/home.js',
									] 
								});
							}],
						}
					}
				}
			})
			.state('app.projects',
			{
				url: '/projects',
				views: {
				  'view@': {
						templateUrl: './templates/projects.html',
						controller: 'ProjectsCtr',
						resolve: {
							loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
								return $ocLazyLoad.load({
									files: [
										'./js/controllers/projects.js',
									] 
								});
							}],
						}
					}
				}
			})
		;

		$ocLazyLoadProvider.config({
			debug: false,
			events: false,
		});
	})
;
