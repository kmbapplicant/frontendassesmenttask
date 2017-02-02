(function () {
    'use strict';

    angular
        .module('app')
        .controller('landingCtrl', landingCtrl);

    landingCtrl.inject = ['newsService', '$scope'];

    function landingCtrl(newsService, $scope) {
        var vm = this;
        vm.sources = [];
        vm.categoryOptions = [];
        vm.pageSize = 6;
        vm.showMore = showMore;
        vm.totalPages = 0;


        activate();


        function activate() {
            getNewsResources();
        };

        function getNewsResources() {
            newsService.getNewsSources().then(success, fail);

            function success(response) {
                vm.sources = response.data.sources;
                response.data.sources.map((source) => {
                    if (!vm.categoryOptions.includes(source.category)) {
                        vm.categoryOptions.push(source.category);
                    };
                });

                vm.totalPages = Math.ceil(vm.sources.length / vm.pageSize);
            };

            function fail(response) {
                console.log("Failed to get resources");
            }
        };

        function showMore() {
            vm.pageSize += 6;
        };
    }
})();