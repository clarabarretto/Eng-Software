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

    getFeedbacks();
});