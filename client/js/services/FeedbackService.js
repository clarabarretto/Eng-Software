myApp.service("FeedbackService", function ($http) {
    this.find = data => {
        return $http.post(`${baseUrl}/feedbacks/find/`, data);
    }

    this.list = data => {
        return $http.get(`${baseUrl}/feedbacks/${data.user_id}`, );
    }
});