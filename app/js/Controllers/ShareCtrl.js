(function(){
    angular.module('app')
        .controller('ShareCtrl',['Item','$scope','$mdDialog','sweet','appParams', shareCtrl]);

    function shareCtrl(Item,$scope,$mdDialog,sweet,appParams) {
        var self = this;
        //methods
        self.Item = Item;
        self.save = save;
        self.cancel = cancel;

        //attributes
        self.selectedUser ={};
        self.users = [{
            Id:"123123",
            UserName:"LC",
            Name:"Mustafa",
            SurName:"Çini"
        }];

        return self;

        function save(){
            $mdDialog.hide(true);
        }

        function cancel(){
            $mdDialog.cancel();
        }
    };
})();