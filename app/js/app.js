(function () {
    'use strict';

    angular.module('app', ['ui.router', 'angular-jwt','fonet-storage','ngMaterial', 'ngResource', 'hSweetAlert', 'ngSanitize', 'commangular','hSweetAlert','cfp.hotkeys'])
        .constant('appParams', appParams())
        .config(['$mdIconProvider', iconConfig])
        .config(['$stateProvider', '$urlRouterProvider', appConfig])
        .config(['$httpProvider', httpInterceptorConfig])
        .run(['$state','$rootScope','AuthService',appRun]);


    function appParams() {
        return {
            WebApi:'http://'+window.location.hostname+':8000/',
            //WebApi:'http://'+window.location.hostname+'/CheckApi/',
            //WebApi:'http://fonetpacs.fonetyazilim.com/CheckApi/',
            clientId: 'ChecklistApp',
            AppName: "ChecklistApp",
            AppVersion: "0.1.0",
            isMobile: false
        };
    };

    function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl:'views/login/login.html',
                controller:'LoginCtrl',
                controllerAs:'lc',
                authentication:false
            })
            .state('app', {
                url: '/app',
                templateUrl: 'views/masterView.html',
                abstract: true,
                controller: 'AppCtrl',
                authentication: true
            })
            .state('app.list', {
                url: '/list',
                views: {
                    'mainContent': {
                        templateUrl: 'views/checklist/ListView.html',
                        controller: 'ListCtrl',
                        controllerAs: 'vc'
                    }
                },
                authentication: true
            })

    };

    /** @ngInject */
    function httpInterceptorConfig($httpProvider) {
        $httpProvider.interceptors.push(['$q', 'store', pushInterceptor]);

        function pushInterceptor($q, store) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    var authData = store.get('token');
                    if (authData) {
                        config.headers.Authorization = 'Bearer ' + authData.token;
                    }

                    return config;
                },
                response: function (response) {
                    return response;
                },
                responseError: function (rejection) {

                    return $q.reject(rejection);
                }
            }
        }
    };

    function iconConfig($mdIconProvider) {
        $mdIconProvider
            .icon('add', 'images/ic_crop_din_24px.svg')
            .icon('fullscreen', 'images/ic_crop_free_24px.svg')
            .icon('rightArrow', 'images/right_arrow.svg')
            .icon('leftArrow', 'images/left_arrow.svg')
            .icon('add', 'images/ic_add_24px.svg')
            .icon('add2', 'images/ic_add_24px.svg')
            .icon('delete', 'images/ic_delete_24px.svg')
            .icon('delete2', 'images/ic_remove_24px.svg')
            .icon('delete3', 'images/ic_remove_circle_outline_24px.svg')
            .icon('edit', 'images/ic_edit_24px.svg')
            .icon('menu', 'images/ic_menu_24px.svg')
            .icon('refresh', 'images/ic_refresh_24px.svg')
            .icon('search', 'images/ic_search_24px.svg')
            .icon('settings', 'images/ic_settings_24px.svg')
            .icon('settings2', 'images/ic_settings_applications_24px.svg')
            .icon('clear', 'images/ic_clear_24px.svg')
            .icon('user', 'images/ic_person_24px.svg')
            .icon('user2', 'images/ic_person_outline_24px.svg')
            .icon('password', 'images/ic_https_24px.svg')
            .icon('fullscreen', 'images/ic_fullscreen_24px.svg')
            .icon('ping', 'images/ic_swap_vert_24px.svg')
            .icon('windowlevel', 'images/toolbar/WindowLevel.svg')
            .icon('message', 'images/ic_messenger_outline_24px.svg')
            .icon('report', 'images/ic_insert_drive_file_24px.svg')
            .icon('comment','images/ic_message_24px.svg')
            .icon('logout','images/ic_exit_to_app_24px.svg')
            .icon('share','images/ic_share_24px.svg')
    };

    function appRun($state,$rootScope,AuthService){
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log('State Changed');
            console.log(toState);
            /*Route için Authentication Gerekli ise*/
            if (toState.authentication) {
                /*Kullanýcý Login Olmam?? ise */
                AuthService.isLoginRequired()
                    .then(function(result) {
                        console.log('stateChangeStart : ' + result);
                        if (result) {
                            $state.transitionTo('login');
                            event.preventDefault();
                        }
                    });
            }
        });
    }

})();
