(function () {
    'use strict';

    angular
        .module('app')
        .controller('innerCtrl', innerCtrl);

    innerCtrl.inject = ['$stateParams', '$timeout', 'newsService', 'APP_CODES'];

    function innerCtrl($stateParams, $timeout, newsService, APP_CODES) {
        var vm = this;
        vm.agency = {
            name: $stateParams.agencyName,
            id: $stateParams.agencyId
        };



        activate();


        function activate() {
            getNews();
        };

        function getNews() {
            newsService.getNewsArticles(vm.agency.id, APP_CODES.newsApiKey).then(success, fail);

            function success(response) {
                vm.agency.articles = response.data.articles;
            };

            function fail(response) {
                console.log("Failed to get response");
            };
        };


    }
})();