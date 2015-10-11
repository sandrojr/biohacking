(function(){
	'use strict';

	angular
		.module('app')
		.config(RouteConfig)
		.run(RouteRun);

	function RouteConfig($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'src/views/main.html',
				controller: 'MainController',
				controllerAs: 'vm',
				resolve: {
					database: function(Database) {
						return Database.initDB();
					}
				}
			})

			.when('/add', {
				templateUrl: 'src/views/add.html',
				controller: 'AddController',
				controllerAs: 'vm',
				resolve: {
					database: function(Database) {
						return Database.initDB();
					}
				}
			})

			.when('/login', {
				templateUrl: 'src/views/login.html',
				controller: 'LoginController',
				controllerAs: 'vm',
				resolve: {
					database: function(Database) {
						return Database.initDB();
					}
				}
			})

			.when('/logout', {
				templateUrl: 'src/views/logout.html',
				controller: 'LogoutController',
				controllerAs: 'vm'
			})

			.when('/signup', {
				templateUrl: 'src/views/signup.html',
				controller: 'SignUpController',
				controllerAs: 'vm',
				resolve: {
					database: function(Database) {
						return Database.initDB();
					}
				}
			});
	}


	function RouteRun($rootScope, Security) {
		$rootScope.$on('$routeChangeStart', function(e, o) { 
			if (o.$$route.originalPath == '/login' || 
				o.$$route.originalPath == '/signup' ||
				o.$$route.originalPath == '/logout') {
				$rootScope.user = null;
			} else {
				$rootScope.user = Security.getUser();
			}
		});
	}
})();
