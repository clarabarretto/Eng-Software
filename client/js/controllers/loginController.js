myApp.controller('loginController', function ($scope, $state, LoginService, AlertMessage) {
    $scope.user = {
        email: '',
        password: ''
    }

    const login = () => {
        // $state.go('start-page');

        LoginService.login($scope.user)
            .then(resp => {
                const user = resp.data;
                localStorage.setItem('user_id', user.id);
                localStorage.setItem('group_id', user.group_id);
                localStorage.setItem('is_admin', user.is_admin);

                $state.go('start-page');
            })
            .catch(() => {
                $scope.user.password = '';
                AlertMessage.error('Usuário não encontrado')
            });
    }

    $scope.login = login
});