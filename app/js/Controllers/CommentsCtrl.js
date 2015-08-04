(function(){
    angular.module('app')
        .controller('CommentsCtrl',['Item','$scope','$mdDialog','sweet','appParams', commentsCtrl]);

    function commentsCtrl(Item,$scope,$mdDialog,sweet,appParams) {
        var self = this;
        self.addComment = addComment;
        self.editComment = editComment;
        self.removeComment = removeComment;
        self.init = init;
        self.save = save;
        self.cancel = cancel;
        self.events =[];

        self.Item = Item;

        self.init();

        return self;

        function init(){
            self.events = [];

            if(self.Item.Comments)
            {
                self.Item.Comments.forEach(function(comment,key){
                   self.events.push({
                        badgeClass:"info",
                       badgeIconClass:"glyphicon-check",
                       title:comment.User,
                       content:comment.Comment
                   });
                }) ;
            }
            else{
                self.Item.Comments = [];
            }
        }

        function addComment(){
            sweet.show({
                title: 'Açıklama Girişi',
                text: '',
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: true,
                animation: 'slide-from-top',
                inputPlaceholder: 'Açıklama Giriniz'
            }, function(inputValue){
                if (inputValue === false){
                    return false;
                }
                if (inputValue === '') {
                    sweet.showInputError('You need to write something!');
                    return false;
                }
                console.log(inputValue);
                $scope.$apply(function(){
                   self.Item.Comments.push({
                       Comment:inputValue,
                       User:appParams.UserInfo.name+" "+appParams.UserInfo.surname,
                       UserId:appParams.UserInfo.userId,
                       OptionId:self.Item.Id
                   });

                    self.init();
                });
            });
        }

        function editComment(){

        }

        function removeComment(){

        }

        function save(){
            $mdDialog.hide(true);
        }

        function cancel(){
            $mdDialog.cancel();
        }
    };
})();