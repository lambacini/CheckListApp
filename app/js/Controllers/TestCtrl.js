
/**
 * Created by Mustafa on 29.07.2015.
 */
(function(){
    angular.module('app')
        .controller('TestCtrl',[testCtrl]);

    function testCtrl(){
    	var self = this;
    	self.init = init;
    	self.Test = "Test";

    	return self;

    	function init(){
    		console.log(window.location);
    		console.log("init !");
    	}
    };
})();