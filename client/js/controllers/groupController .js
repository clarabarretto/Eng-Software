myApp.controller('groupController', function ($scope, $state, GroupService, AlertMessage) {
    $scope.is_admin = localStorage.getItem('is_admin');

    const getGroupInfo = () => {
        const groupId = localStorage.getItem('group_id');

        return GroupService.find(groupId)
            .then(resp => {
                $scope.group = resp.data;
            }).catch(() => {
                AlertMessage.error('Algo deu errado ao buscar as informações do grupo. Tente novamente');
            })
    };

    const init = () => {
        return getGroupInfo();
    };

    init();
});