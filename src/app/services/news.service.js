(function () {
    'use strict';

    angular
        .module('app')
        .service('newsService', newsService);

    newsService.inject = ['http'];

    function newsService(http) {
        var service = {
            getNewsSources: getNewsSources,
            getNewsArticles: getNewsArticles
        };

        return service;

        function getNewsSources() {
            return http.get(null, 'https://newsapi.org/v1/sources');
        };

        function getNewsArticles(src, key) {
            var params = {
                source: src,
                apiKey: key
            };
            return http.get(params, 'https://newsapi.org/v1/articles');
        };
    }
})();