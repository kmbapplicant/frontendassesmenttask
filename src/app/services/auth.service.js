(function () {
    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.inject = ['ezfb', '$q', '$state'];

    function authService(ezfb, $q, $state) {
        var service = {
            isAuthenticated: isAuthenticated,
            lostSession: lostSession,
            disconnect: disconnect,
            connect: connect
        };

        return service;

        function isAuthenticated() {
            var deferred = $q.defer();
            ezfb.getLoginStatus(res => {
                if (res.status == 'connected') {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            });
            return deferred.promise;
        };

        function lostSession() {
            $state.go('login');
        };

        function disconnect() {
            var deferred = $q.defer();
            ezfb.logout(function (res) {
                if (res.status == 'unknown') {
                    deferred.resolve();
                };
            });
            return deferred.promise;
        };

        function connect() {
            var deferred = $q.defer();
            ezfb.login().then((resp) => {
                (resp.status == 'connected') ? deferred.resolve(): deferred.reject();
            });
            return deferred.promise;
        }
    }
})();