angular.module('app')

.run(function (ezfb, APP_CODES, authService) {

    ezfb.init({
        appId: APP_CODES.facebook_app_id,
        version: 'v2.8'
    });
})