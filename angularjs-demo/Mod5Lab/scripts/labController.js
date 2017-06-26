app.controller('labController', [
    '$scope', 'registration',
    function ($scope, registration
        ) {
        $scope.reset = reset;
        $scope.submit = submit;
        reset();
        
        function reset() {
            $scope.model = {};
        }
        
        function submit(model) {
             registration.submit(model).$promise
            .then(
                function(response, status){
                    alert('success. the response is ' + angular.toJson(response) + ", status is " + status);
                }, 
                function(response, status){
                    alert('error' + response.data.message);
                }               
            );
            alert('Submitted\n' + JSON.stringify(model));
        }
    }
]);