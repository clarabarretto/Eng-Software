myApp.controller('addUserController', function ($scope, $state, UserService, AlertMessage) {
    $scope.user = {
        email: ''
    };

    const addUser = () => {
        console.log($scope.user);
        return UserService.findUserByEmail($scope.user)
            .then(resp => {
                const user = resp.data;

                if (!user) {
                    AlertMessage.error('Usuário não encontrado');
                    return;
                }

                return UserService.createMember({
                    user_id: user.id,
                    group_id: localStorage.getItem('group_id')
                }).then(() => {
                    AlertMessage.success('Usuário adicionado com sucesso!')
                    $state.go('specific-led-group');
                }).catch(() => AlertMessage.error('Algo deu errado'));
            }).catch(() => AlertMessage.error('Algo deu errado'));
    }
   

    const logOut = () => {
        localStorage.clear();
        $state.go('login');
    };

    $scope.logOut = logOut;
    $scope.addUser = addUser;
});