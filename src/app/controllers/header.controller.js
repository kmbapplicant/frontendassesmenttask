(function () {
    'use strict';

    angular
        .module('app')
        .controller('headerCtrl', headerCtrl);

    headerCtrl.inject = ['$state', '$rootScope', '$timeout', 'authService', 'userService', '$stateParams'];

    function headerCtrl($state, $rootScope, $timeout, authService, userService, $stateParams) {
        var vm = this;
        vm.currentState = '';
        vm.isInnerPage = false;
        var refreshStateStatus = refreshStateStatus;
        vm.toggleIndex = toggleIndex;
        var isMenuClosed = true;

        vm.user = {};
        vm.logout = logout;
        vm.agency = $stateParams.agencyName;
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                refreshStateStatus();
                if (toState.name == 'inner') {
                    vm.agency = $stateParams.agencyName;
                };
            });


        activate();


        function activate() {
            refreshStateStatus();
            initUser();
        }

        function refreshStateStatus() {
            vm.currentState = $state.current.name;
            vm.isInnerPage = (vm.currentState == 'inner');
        }

        function toggleIndex() {
            if (isMenuClosed) {
                $('#header-top').css('z-index', '3');
            } else {
                $('#header-top').css('z-index', '1');
            }
            isMenuClosed = !isMenuClosed;
        }

        function logout() {
            authService.disconnect().then(() => {
                $state.go('login')
            });
        }

        function initUser() {
            userService.getName().then(name => {
                var tmp = name.split(' ');
                vm.user.first_name = tmp[0];
                vm.user.last_name = tmp[1];
                vm.user.primLetters = tmp.map(str => str.charAt(0)).join('').toString();
            });

            userService.getPicture().then((picture) => {
                vm.user.photo = picture;
            });

            userService.getCover().then((cover) => {
                vm.user.cover = cover;
            });

        };

    }
})();