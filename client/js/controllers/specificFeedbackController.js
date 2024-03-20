myApp.controller('specificFeedbackController', function ($scope, $state, FeedbackService, AlertMessage) {
    $scope.data = {
        group_name: localStorage.getItem('specific_feedback_group_name'),
        admin_name: localStorage.getItem('specific_feedback_group_admin_name'),
        feedback_date: localStorage.getItem('specific_feedback_date')
    };

    const logOut = () => {
        localStorage.clear();
        $state.go('login');
    };

    const goBackToOldFeedbacks = () => {
        localStorage.removeItem('specific_feedback_id');
        localStorage.removeItem('specific_feedback_group_name');
        localStorage.removeItem('specific_feedback_group_id');
        localStorage.removeItem('specific_feedback_group_admin_name');
        localStorage.removeItem('specific_feedback_date');

        $state.go('old-feedbacks');
    };

    const getFeedback = () => {
        const filter = {
            id: localStorage.getItem('specific_feedback_id'),
            group_id: localStorage.getItem('specific_feedback_group_id'),
            user_id: localStorage.getItem('user_id')
        };

        return FeedbackService.find(filter)
            .then(resp => {
                $scope.feedback = resp.data;

                if(!$scope.feedback) {
                    return;
                }

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

    getFeedback();

    $scope.logOut = logOut;
    $scope.goBackToOldFeedbacks = goBackToOldFeedbacks;
});