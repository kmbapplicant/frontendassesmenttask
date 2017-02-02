(function () {
    'use strict';

    angular
        .module('app')
        .controller('footerCtrl', footerCtrl);

    footerCtrl.inject = ['$state', '$rootScope'];

    function footerCtrl($state, $rootScope) {
        var vm = this;


        activate();

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                refreshStateStatus();
            });


        function activate() {
            refreshStateStatus();
        }

        function refreshStateStatus() {
            vm.currentState = $state.current.name;
            vm.isInnerPage = (vm.currentState == 'inner');
        }
    }
})();