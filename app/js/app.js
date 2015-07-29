(function () {
    'use strict';

    angular.module('app', ['ui.router', 'ngMaterial', 'ngResource', 'hSweetAlert', 'ngSanitize', 'commangular'])
        .constant('appParams', appParams())
        .config(['$mdIconProvider', iconConfig])
        .config(['$stateProvider', '$urlRouterProvider', appConfig]);


    function appParams() {
        return {
            clientId: 'ChecklistApp',
            AppName: "ChecklistApp",
            AppVersion: "0.1.0",
            isMobile: false
        };
    };

    function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('app/list');

        $stateProvider
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
})();
