const myApp = angular.module("doxa", ['ui.router', 'ui.bootstrap']);
const baseUrl = 'http://localhost:5001/'

myApp.config(function ($stateProvider, $httpProvider) {
    $httpProvider.interceptors.push('BearerAuthInterceptor');

    $stateProvider
        .state({
            name: 'login',
            url: '',
            templateUrl: 'view/login-v2.html',
            controller: 'loginController'
        })
})
