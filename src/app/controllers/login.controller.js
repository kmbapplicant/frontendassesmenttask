(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.inject = ['$state', 'authService', 'userService', 'isAuthenticated'];

    function loginCtrl($state, authService, userService, isAuthenticated) {
        var vm = this;
        vm.login = login;


        function login(provider) {
            authService.connect().then(success, fail);

            function success() {
                $state.go('landing');
            };

            function fail() {
                console.log("For some reason couldn't login");
            };
        }
    }
})();