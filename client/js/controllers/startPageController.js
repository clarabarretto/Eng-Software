myApp.controller('startPageController', function ($scope, $state, FeedbackService, AlertMessage) {
    const getActiveFeedback = () => {
        const filter = {
            user_id: localStorage.getItem('user_id'),
            group_id: localStorage.getItem('group_id'),
            is_active: true
        };

        return FeedbackService.find(filter)
            .then(resp => {
                $scope.feedback = resp.data;

                $scope.skills = resp.data.skills.reduce((acc, skill) => {
                    if (skill.type === 'SOFT') {
                        acc.soft.push(skill)
                    } else {
                        acc.hard.push(skill)
                    }

                    return acc;
                }, {
                    soft: [],
                    hard: []
                });


            }).catch(() => {
                AlertMessage.error('Erro ao listar feedback atual');
            })
    };

    const logOut = () => {
        localStorage.clear();
        $state.go('login');
    };

    getActiveFeedback();

    $scope.logOut = logOut;
});