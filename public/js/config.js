var config = {

	nameCtr: 'controllerApp',
	moduleCtr: [],
	
	nameRoute: 'routerApp',
	moduleRoute: ['controllerApp', 'ui.router', 'oc.lazyLoad', 'angulartics', 'angulartics.google.analytics'],
	
};

var appCtr = angular.module(config.nameCtr, config.moduleCtr);
var appRoute = angular.module(config.nameRoute, config.moduleRoute);