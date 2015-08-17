(function() {
    'use strict'

    angular
        .module('xatu', ['ngRoute', 'hljs', 'ngStorage', 'ui.bootstrap'])
        .config(Config);

    Config.$inject = ['$routeProvider', '$locationProvider'];
    function Config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
