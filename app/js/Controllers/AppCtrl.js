
/**
 * Created by Mustafa on 29.07.2015.
 */
(function(){
    angular.module('app')
        .controller('AppCtrl',['signalRHubProxy',appCtrl]);

    function appCtrl(signalRHubProxy){
    	var self = this;

        var clientProxy  = signalRHubProxy(signalRHubProxy.defaultServer,'CheckListHub');

        clientProxy.on('sayHello',function(data){
           console.log(data);
        });

    	return self;
    };
})();