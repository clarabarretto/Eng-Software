myApp.controller('specificLedGroupController', function ($scope, $state, GroupService, UserService, AlertMessage) {
    const find = () => {
        const groupId = localStorage.getItem('group_id');

        return GroupService.find(groupId)
            .then(resp => {
                $scope.group = resp.data;
            })
            .catch(() => {
                AlertMessage.error('Algo deu errado na busca do grupo. Tente novamente.')
            });

    };

    const removeMember = id => {
        return UserService.removeMember(id)
            .then(() => {
                find();
                AlertMessage.success('Membro removido com sucesso.')
            }).catch(() => {
                AlertMessage.error('Algo deu errado ao remover o membro');
            });
    };

    const deleteGroup = () => {
        const groupId = localStorage.getItem('group_id');

        return GroupService.delete(groupId)
            .then(() => {
                AlertMessage.success('Grupo apagado com sucesso');
                goBackToLedGroups();
            }).catch(() => {
                AlertMessage.error('Algo deu errado ao apagar o grupo');
            })
    };

    const goBackToLedGroups = () => {
        localStorage.removeItem('group_id');
        $state.go('led-groups');
    };

    const logOut = () => {
        localStorage.clear();
        $state.go('login');
    };

    const giveFeedback = user => {
        localStorage.setItem('feedback_user_id', user.id);
        localStorage.setItem('feedback_user_name', user.name);
        localStorage.setItem('feedback_group_name', $scope.group.name);
        $state.go('give-feedback');
    }

    find();

    $scope.removeMember = removeMember;
    $scope.goBackToLedGroups = goBackToLedGroups;
    $scope.deleteGroup = deleteGroup;
    $scope.logOut = logOut;
    $scope.giveFeedback = giveFeedback;
});
