angular.module('app').controller('ContactController', [
        function () {
            var vm = this;
            
            vm.contactUs = contactUs;
            function contactUs() {
                alert('Contact is sent');
            }
            
        }
]);
