angular.module('app')

.config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm',
            resolve: {
                isAuthenticated: isAuthenticated
            },
            data: {
                requiresAuth: false
            }
        })

    .state('app', {
        url: '/app',
        templateUrl: 'templates/app.html',
        controller: 'appCtrl',
        controllerAs: 'app'
    })

    .state('landing', {
        parent: 'app',
        url: '/landing_page',
        templateUrl: 'templates/landing.html',
        controller: 'landingCtrl',
        controllerAs: 'vm',
        resolve: {
            isAuthenticated: isAuthenticated
        },
        data: {
            requiresAuth: true
        }
    })

    .state('inner', {
        parent: 'app',
        url: '/landing_page/:agencyName/:agencyId',
        templateUrl: 'templates/inner.html',
        controller: 'innerCtrl',
        controllerAs: 'vm',
        resolve: {
            isAuthenticated: isAuthenticated
        },
        data: {
            requiresAuth: true
        }
    })

    $urlRouterProvider.otherwise('/login');


    function isAuthenticated(authService, $q, $state) {
        var deferred = $q.defer();
        var state = this;
        var isLoginState = (state.name == "login");
        authService.isAuthenticated().then(function () {
            if (isLoginState) {
                deferred.reject();
                $state.go('landing');
            } else {
                deferred.resolve(true);
            }
        }, function () {
            if (state.data.requiresAuth) {
                deferred.reject();
                $state.go('login');
            } else {
                deferred.resolve(false);
            }
        })
        return deferred.promise;
    }




});