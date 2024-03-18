myApp.controller('giveFeedbackController', function ($scope, $state, FeedbackService, AlertMessage) {
    $scope.info = {
        group_name: localStorage.getItem('feedback_group_name'),
        user_name: localStorage.getItem('feedback_user_name'),
    };

    $scope.data = {
        user_id: localStorage.getItem('feedback_user_id'),
        group_id: localStorage.getItem('group_id'),
        skills: {
            soft1: {
                type: 'SOFT',
                title: '',
                score: 0.00
            },
            soft2: {
                type: 'SOFT',
                title: '',
                score: 0.00
            },
            soft3: {
                type: 'SOFT',
                title: '',
                score: 0.00
            },
            hard1: {
                type: 'HARD',
                title: '',
                score: 0.00
            },
            hard2: {
                type: 'HARD',
                title: '',
                score: 0.00
            },
            hard3: {
                type: 'HARD',
                title: '',
                score: 0.00
            },
        }
    };

    const mountData = data => {
        const skills = Object.values(data.skills);

        data.skills = skills;

        return data;
    }

    const createFeedBack = () => {
        const mountedData = mountData($scope.data);

        return FeedbackService.create(mountedData)
            .then(() => {
                AlertMessage.success('FeedbackCriado com sucesso');
                goBackToLedGroup();
            }).catch(() => AlertMessage.error('Algo deu errado ao criar o feedback'))
    }

    const logOut = () => {
        localStorage.clear();
        $state.go('login');
    };

    const goBackToLedGroup = () => {
        localStorage.removeItem('feedback_user_id');
        localStorage.removeItem('feedback_user_name');
        localStorage.removeItem('feedback_group_id');

        $state.go('specific-led-group');
    };


    $scope.logOut = logOut;
    $scope.createFeedBack = createFeedBack;
    $scope.goBackToLedGroup = goBackToLedGroup;
});