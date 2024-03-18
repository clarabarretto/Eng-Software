myApp.controller('loginController', function ($scope, $state, LoginService, AlertMessage) {
    $scope.user = {
        email: '',
        password: ''
    }

    const login = () => {
        LoginService.login($scope.user)
            .then(resp => {
                const user = resp.data;
                localStorage.setItem('user_id', user.id);
                
                if (user.is_admin) {
                    localStorage.setItem('is_admin', 1);
                    $state.go('led-groups');
                } else {
                    localStorage.setItem('is_admin', 0);
                    localStorage.setItem('group_id', user.group_id);
                    $state.go('start-page');
                }
                
            })
            .catch(() => {
                $scope.user.password = '';
                AlertMessage.error('Usuário não encontrado')
            });
    }

    $scope.login = login
});