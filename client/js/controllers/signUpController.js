myApp.controller('signUpController', function ($scope, $state, UserService, AlertMessage) {
    $scope.user = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_admin: false
    };

    const isValidUser = () => {
        if ($scope.user.password !== $scope.user.password_confirmation) {
            AlertMessage.error('As senhas precisam ser iguais');
            return false;
        }

        if (!$scope.user.email) {
            AlertMessage.error('E-maail é obrigatório');
            return false;
        }

        if (!$scope.user.name) {
            AlertMessage.error('Nome é obrigatório');
            return false;
        }

        return true;
    };

    const signUp = () => {
        if (!isValidUser()) {
            return;
        }

        const data = {
            name: $scope.user.name,
            email: $scope.user.email,
            password: $scope.user.password,
            is_admin: $scope.user.is_admin
        };

        return UserService.create(data)
            .then(() => {
                AlertMessage.success('Usuário criado com sucesso');
                $state.go('login');
            }).catch(() => {
                AlertMessage.error('Erro ao criar o usuário');
            })
    };

    $scope.signUp = signUp;
});