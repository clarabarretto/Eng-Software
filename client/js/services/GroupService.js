myApp.service("GroupService", function ($http) {
    this.find = group_id => {
        return $http.get(`${baseUrl}/groups/${group_id}`);
    }
});