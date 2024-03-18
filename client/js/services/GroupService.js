myApp.service("GroupService", function ($http) {
    this.find = group_id => {
        return $http.get(`${baseUrl}/groups/find/${group_id}`);
    }
    
    this.list = user_id => {
        return $http.get(`${baseUrl}/groups/${user_id}`);
    }

    this.delete = group_id => {
        return $http.delete(`${baseUrl}/groups/${group_id}`);
    }

    this.create = data => {
        return $http.post(`${baseUrl}/groups/`, data);
    }
});