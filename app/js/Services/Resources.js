/**
 * Created by Mustafa on 31.07.2015.
 */
(function(){
    angular.module('app')
        .factory('CheckLists',['$resource','appParams',checkList]);

    function checkList($resource,appParams){
        return $resource(appParams.WebApi+"api/CheckList", {
            id: '@_id'
        }, {
            'update': {
                method: 'PUT',
                url:appParams.WebApi+'api/CheckList/:id'
            }
        }, {
            stripTrailingSlashes: false
        });
    }
})();