(function () {
    'use strict';

    angular
        .module('app')
        .filter('startFrom', startFrom);

    function startFrom() {
        return filterFunction;

        function filterFunction(data, start) {
            if (start < 0)
                return data.slice(0);
            else
                return data.slice(start);
        }
    }
})();