/**
 * Created by Mustafa on 31.07.2015.
 */
(function() {
    angular.module('app')
        .factory('CheckLists', ['$resource', 'appParams', checkList])
        .factory('Users', ['$resource', 'appParams', users])
        .factory('ShareList', ['$resource', 'appParams', shareList])
        .factory('UserSettings', ['$resource', 'appParams', userSettings]);

    function checkList($resource, appParams) {
        return $resource(appParams.WebApi + "api/CheckList/:id", {
            id: '@_id'
        }, {
            'update': {
                method: 'PUT',
                url: appParams.WebApi + 'api/CheckList/:id'
            }, 'get': {
                method: 'GET',
                url: appParams.WebApi + 'api/CheckList/:id',
                isArray: true
            }
        }, {
            stripTrailingSlashes: false
        });
    }

    function users($resource, appParams) {
        return $resource(appParams.WebApi + "api/Users/:id", {
            id: '@_id'
        }, {
            'get': {
                method: 'GET',
                url: appParams.WebApi + 'api/Users/:id',
                isArray: true
            },
            'change': {
                method: 'PUT',
                url: appParams.WebApi + 'api/ChangePassword?id=:id'
            }
        }, {
            stripTrailingSlashes: false
        });
    }

    function userSettings($resource, appParams) {
        return $resource(appParams.WebApi + "api/UserSettings/:id", {
            id: '@_id'
        }, {
            'update': {
                method: 'PUT',
                url: appParams.WebApi + 'api/UserSettings/:id'
            },'get': {
                method: 'GET',
                url: appParams.WebApi + 'api/UserSettings/:id',
                isArray: false
            }
        }, {
            stripTrailingSlashes: false
        });
    }

    function shareList($resource, appParams) {
        return $resource(appParams.WebApi + "api/ShareList/:id", {
            id: '@_id'
        }, {
            stripTrailingSlashes: false
        });
    }
})();
