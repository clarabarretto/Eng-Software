myApp.controller('ledGroupsController', function ($scope, $state, GroupService, AlertMessage) {

    const list = () => {
        const userId = localStorage.getItem('user_id');

        return GroupService.list(userId)
            .then(resp => {
                $scope.groups = resp.data;
            })
            .catch(() => {
                AlertMessage.error('Algo deu errado na listagem de grupos. Tente novamente.')
            });

    };

    const openGroup = groupId => {
        localStorage.setItem('group_id', groupId);

        $state.go('specific-led-group');
    };
    
    const logOut = () => {
        localStorage.clear();
        $state.go('login');
    };

    list();

    $scope.openGroup = openGroup;
    $scope.logOut = logOut;
});
