myApp.controller('createGroupController', function ($scope, $state, GroupService, AlertMessage) {
    $scope.group = {
        name: '',
        admin_id: localStorage.getItem('user_id')
    };

    const createGroup = () => {
        return GroupService.create($scope.group)
            .then(() => {
                AlertMessage.success('Grupo criado com sucesso');
                $state.go('led-groups');
            }).catch((error) => {
                AlertMessage.error('Algo deu errado ao criar o grupo. Tente novamente');
            })
    };

    const logOut = () => {
        localStorage.clear();
        $state.go('login');
    };

    $scope.logOut = logOut;
    $scope.createGroup = createGroup;
});