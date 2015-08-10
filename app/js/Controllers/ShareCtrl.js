(function () {
    angular.module('app')
        .controller('ShareCtrl', ['Item', 'Users', 'ShareList', '$scope', '$mdDialog', 'sweet', 'appParams', shareCtrl]);

    function shareCtrl(Item, Users, ShareList, $scope, $mdDialog, sweet, appParams) {
        var self = this;
        //methods
        self.Item = Item;
        self.save = save;
        self.cancel = cancel;
        self.init = init;

        //attributes
        self.selectedUser = {};
        self.users = [];

        self.init();

        return self;

        function init() {
            self.users = [];
            Users.query(function (data) {
                self.users = data;
            });
        }

        function save() {
            console.log(self.selectedUser);
            var newData = {
                CheckListid: Item.Id,
                ListOwnerId: Item.UserId,
                SharedUserId: self.selectedUser,
                ShareType: 0
            };
            ShareList.save(newData, function (data) {
                $mdDialog.hide(true);
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }
    };
})();