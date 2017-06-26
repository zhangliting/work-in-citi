app.directive('person', function () {
    return {
        restrict: 'E',
        scope: {
            person: '=',
            action: '&'
        },
        template: 'Pen Name: <input type="text" ng-model="person.name" class="form-control" />' +
        'Pen Name: <input type="text" ng-model="person.penName" class="form-control" />' +
        '<input type="button" ng-click="action()" value="Action" class="btn btn-primary"/>' +
        '<pre>{{person | json}}</pre>'
    };
});