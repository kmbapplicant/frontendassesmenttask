(function () {
    'use strict';

    angular
        .module('app')
        .service('http', http);

    http.inject = ['$http'];

    function http($http) {

        var service = {
            get: get
        };

        var serialize = {
            params: params,
            payload: payload
        };

        return service;


        function params(p) {
            if (!p) return "";
            var serialized = '?';
            return createString(serialized, p);
        }

        function payload(p) {
            if (!p) return "";
            var serialized = '';
            return createString(serialized, p);
        }

        function createString(st, data) {
            for (var propertyName in data) {
                if (angular.isArray(data[propertyName])) {
                    angular.forEach(data[propertyName], function (val, key) {
                        st += propertyName + '[' + key + ']' + '=' + val + '&';
                    })
                } else {
                    st += propertyName + '=' + data[propertyName] + '&';
                }
            };
            st = st.substring(0, st.length - 1);
            return st;
        }

        function get(params, endpoint) {

            return $http({
                method: 'GET',
                url: endpoint + serialize.params(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        }
    }
})();