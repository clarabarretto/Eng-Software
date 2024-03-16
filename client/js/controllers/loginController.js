myApp.controller('loginController', function ($scope, $state, LoginService, AlertMessage) {
    $scope.user = {
        email: '',
        password: ''
    }
    
    const login = () => {
        LoginService.login($scope.user)
            .then(user => {
                localStorage.setItem('user', user);
                $scope.user.password = '';

                console.log(user);

                $state.go('start-page');
            })
            .catch((error) => {
                console.log(error);
                AlertMessage.error('Usuário não encontrado')
        });
    }
    $scope.login = login
});