myApp.controller('oldFeedbacksController', function ($scope, $state, FeedbackService, AlertMessage) {
    const getFeedbacks = () =>{
        const filter = {
            user_id: localStorage.getItem('user_id')
        };

        return FeedbackService.list(filter)
            .then(resp => {
                $scope.feedbacks = resp.data;
            }).catch(() => {
                AlertMessage.error('Erro ao listar os feedbacks');
            })
    }

    const openSpecifFeedback = feedback => {
        localStorage.setItem('specific_feedback_id', feedback.id);
        localStorage.setItem('specific_feedback_group_name', feedback.group.name);
        localStorage.setItem('specific_feedback_group_admin_name', feedback.group.admin.name);
        localStorage.setItem('specific_feedback_date', feedback.created_at);

        $state.go('specific-feedback');
    };

    const logOut = () => {
        localStorage.clear();
        $state.go('login');
    };

    getFeedbacks();

    $scope.openSpecifFeedback = openSpecifFeedback;
    $scope.logOut = logOut;
});