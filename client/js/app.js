const myApp = angular.module("doxa", ['ui.router', 'ui.bootstrap']);
const baseUrl = 'http://localhost:5001/'

myApp.config(function ($stateProvider) {

    $stateProvider
        .state({
            name: 'login-v2',
            url: '',
            templateUrl: 'view/login-v2.html',
            controller: 'loginController'
        })
})

console.log('myApp');