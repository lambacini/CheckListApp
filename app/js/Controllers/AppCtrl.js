
/**
 * Created by Mustafa on 29.07.2015.
 */
(function(){
    angular.module('app')
        .controller('AppCtrl',[appCtrl]);

    function appCtrl(){
    	var self = this;
    	self.Test = "Test";

    	return self;
    };
})();