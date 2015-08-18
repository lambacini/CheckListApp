(function() {
    angular.module('app')
        .directive('focusMe', function($timeout) {
            return {
                link: function(scope, element, attrs) {
                	
                    scope.$watch(attrs.focusMe, function(value) {

                        if (value === true) {
                        	element[0].focus();
                            $timeout(function() {
                                element[0].focus();
	                            scope[attrs.focusMe] = false;
                            },400);
                        }
                    });
                }
            };
        });
})();
