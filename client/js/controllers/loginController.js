myApp.controller('loginController', function ($scope, $state, LoginService, AlertMessage) {
    $scope.user = {
        email: '',
        password: ''
    }
    
    const login = () => {
        LoginService.login($scope.user)
            .then(resp => {
                const user = resp.data;
                localStorage.setItem('user', user);
                localStorage.setItem('is_admin', user.is_admin);

                $state.go('start-page');
            })
            .catch((error) => {
                console.log(error);
                $scope.user.password = '';
                AlertMessage.error('Usuário não encontrado')
        });
    }

    $scope.login = login
});