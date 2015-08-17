(function () {
    angular.module('app')
        .controller('UserSettingsCtrl', ['$scope', '$mdDialog', 'sweet', 'appParams', userSettingsCtrl]);

    function userSettingsCtrl( $scope, $mdDialog, sweet, appParams) {
        var self = this;
        //methods
        
        self.save = save;
        self.cancel = cancel;
        self.init = init;

        self.init();

        return self;

        function init() {
           
        }

        function save() {
            $mdDialog.hide(true);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    };
})();