(function () {
    'use strict';

    angular
        .module('app')
        .controller('baseCtrl', baseCtrl);

    baseCtrl.inject = ['$timeout', '$scope'];

    function baseCtrl($timeout, $scope) {
        var vm = this;

        vm.checkSize = checkSize;


        activate();


        $timeout(function () {
            $(window).resize(function () {
                checkSize();
            })
        });

        function activate() {
            checkSize();
        }

        function checkSize() {
            vm.isDesktop = ($(window).width() >= 992);
            $timeout(function () {
                $scope.$apply()
            });
        }
    }
})();