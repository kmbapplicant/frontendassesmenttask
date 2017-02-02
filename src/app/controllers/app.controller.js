(function () {
    'use strict';

    angular
        .module('app')
        .controller('appCtrl', appCtrl);

    appCtrl.inject = ['$timeout'];

    function appCtrl($timeout) {
        var vm = this;

    }
})();