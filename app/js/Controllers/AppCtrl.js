
/**
 * Created by Mustafa on 29.07.2015.
 */
(function(){
    angular.module('app')
        .controller('AppCtrl',['signalRHubProxy',appCtrl]);

    function appCtrl(signalRHubProxy){
    	var self = this;

    	return self;
    };
})();