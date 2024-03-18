myApp.service("UserService", function ($http) {
    this.create = data => {
        return $http.post(`${baseUrl}/users/` , data)
    }

    this.removeMember = member_id => {
        return $http.delete(`${baseUrl}/members/${member_id}`)
    }

    this.createMember = data => {
        return $http.post(`${baseUrl}/members/`, data)
    }

    this.findUserByEmail = data => {
        return $http.post(`${baseUrl}/users/find`, data)
    }
});