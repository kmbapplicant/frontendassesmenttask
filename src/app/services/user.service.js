(function () {
    'use strict';

    angular
        .module('app')
        .service('userService', userService);

    userService.inject = ['$q', 'ezfb', 'authService'];

    function userService($q, ezfb, authService) {
        var service = {
            getName: getName,
            getPicture: getPicture,
            getCover: getCover
        };

        return service;

        function confirmRequest(request) {
            authService.isAuthenticated().then(() => request());
        };

        function getName() {
            let deferred = $q.defer();
            confirmRequest(function () {
                ezfb.api('/me?fields=name').then(resp => deferred.resolve(resp.name));
            });
            return deferred.promise;
        };

        function getPicture() {
            let deferred = $q.defer();
            confirmRequest(function () {
                ezfb.api('/me?fields=picture.width(200).height(200)').then(resp => deferred.resolve(resp.picture.data.url));
            });
            return deferred.promise;
        };

        function getCover(imgurl) {
            let deferred = $q.defer();
            confirmRequest(function () {
                ezfb.api('/me?fields=cover').then((resp) => deferred.resolve(resp.cover.source));
            });
            return deferred.promise;
        };
    }
})();