const myApp = angular.module("doxa", ['ui.router', 'ui.bootstrap']);
const baseUrl = 'http://localhost:3001'

myApp.config(function ($stateProvider) {
    $stateProvider
        .state({
            name: 'login',
            url: '',
            templateUrl: 'view/login.html',
            controller: 'loginController'
        })
        .state({
            name: 'start-page',
            url: '/start-page',
            templateUrl: 'view/start-page.html',
            controller: 'startPageController',
        })
        .state({
            name: 'old-feedbacks',
            url: '/old-feedbacks',
            templateUrl: 'view/old-feedbacks.html',
            controller: 'startPageController',
        })
        .state({
            name: 'specific-feedback',
            url: '/specific-feedback',
            templateUrl: 'view/specific-feedback.html',
            controller: 'startPageController',
        })
        .state({
            name: 'my-groups',
            url: '/my-groups',
            templateUrl: 'view/my-groups.html',
            controller: 'startPageController',
        })
        .state({
            name: 'led-groups',
            url: '/led-groups',
            templateUrl: 'view/led-groups.html',
            controller: 'startPageController',
        })
        .state({
            name: 'specific-led-group',
            url: '/led-group',
            templateUrl: 'view/specific-led-group.html',
            controller: 'startPageController',
        })
        .state({
            name: 'give-feedback',
            url: '/user-feedback',
            templateUrl: 'view/give-feedback.html',
            controller: 'startPageController',
        })
        .state({
            name: 'show-user',
            url: '/show-user',
            templateUrl: 'view/show-user.html',
            controller: 'startPageController',
        })
})  
