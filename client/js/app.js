const myApp = angular.module("doxa", ['ui.router', 'ui.bootstrap']);
const baseUrl = 'https://doxa-eng-software.onrender.com'

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
            onEnter: isAuthorized
        })
        .state({
            name: 'old-feedbacks',
            url: '/old-feedbacks',
            templateUrl: 'view/old-feedbacks.html',
            controller: 'oldFeedbacksController',
            onEnter: isAuthorized
        })
        .state({
            name: 'specific-feedback',
            url: '/specific-feedback',
            templateUrl: 'view/specific-feedback.html',
            controller: 'specificFeedbackController',
            onEnter: isAuthorized
        })
        .state({
            name: 'my-groups',
            url: '/my-groups',
            templateUrl: 'view/my-groups.html',
            controller: 'groupController',
            onEnter: isAuthorized
        })
        .state({
            name: 'led-groups',
            url: '/led-groups',
            templateUrl: 'view/led-groups.html',
            controller: 'ledGroupsController',
            onEnter: isAuthorized
        })
        .state({
            name: 'specific-led-group',
            url: '/led-group',
            templateUrl: 'view/specific-led-group.html',
            controller: 'specificLedGroupController',
            onEnter: isAuthorized
        })
        .state({
            name: 'give-feedback',
            url: '/user-feedback',
            templateUrl: 'view/give-feedback.html',
            controller: 'giveFeedbackController',
            onEnter: isAuthorized
        })
        .state({
            name: 'show-user',
            url: '/show-user',
            templateUrl: 'view/show-user.html',
            controller: 'startPageController',
            onEnter: isAuthorized
        })
        .state({
            name: 'sign-up',
            url: '/sign-up',
            templateUrl: 'view/sign-up.html',
            controller: 'signUpController',
        })
        .state({
            name: 'add-user',
            url: '/add-user',
            templateUrl: 'view/add-users.html',
            controller: 'addUserController',
            onEnter: isAuthorized
        })
        .state({
            name: 'create-group',
            url: '/create-group',
            templateUrl: 'view/create-group.html',
            controller: 'createGroupController',
            onEnter: isAuthorized
        })
})  

const isAuthorized = ($state, $rootScope) => {
    const isLogged = localStorage.getItem("user_id");

    if (!isLogged) {
        $state.go('login');
        return;
    }

    $rootScope.isLogged = true;
};
