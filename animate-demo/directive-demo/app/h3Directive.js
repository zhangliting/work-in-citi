app.directive('h3Directive', function () {
    return {
        scope: {
            title: '@'
        },
        restrict: 'E',
        template: '<h3>{{title}}</h3>',
        link: function (scope, element, attrs) {
            element.bind('mouseenter', function () {
                element.css('color', 'red')
            });

            element.bind('mouseleave', function () {
                element.css('color', 'silver')
            });
        }
    };
});