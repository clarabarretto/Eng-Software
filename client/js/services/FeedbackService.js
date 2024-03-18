myApp.service("FeedbackService", function ($http) {
    this.find = data => {
        return $http.post(`${baseUrl}/feedbacks/find/`, data);
    }

    this.create = data => {
        return $http.post(`${baseUrl}/feedbacks/`, data);
    }

    this.list = data => {
        return $http.get(`${baseUrl}/feedbacks/${data.user_id}`, );
    }
});