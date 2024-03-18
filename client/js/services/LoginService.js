myApp.service("LoginService", function ($http) {
    this.login = data => {
        return $http.post(`${baseUrl}/users/login` , data)
    }
});