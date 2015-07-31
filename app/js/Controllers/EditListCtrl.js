/**
 * Created by Mustafa on 29.07.2015.
 */
(function(){
    angular.module('app')
        .controller('EditListCtrl',['Items','$mdDialog','notify','CheckLists',editListCtrl]);

    function editListCtrl(Items,$mdDialog,notify,CheckLists){
        var self = this;
        self.NewItem = new CheckLists();

        self.save = save;
        self.cancel = cancel;

        return self;

        function save(){
            self.NewItem.group = 0;
            self.NewItem.CTime = Date.now();

            self.NewItem.$save(function(){
                $mdDialog.hide(true);
            });
        }

        function cancel(){
            if(self.isChanged)
            {
                notify.confirm('Vazgeç','Yaptığınız Değişiklikler Kaybolacak. Devam Edilsinmi ?').then(function(isConfirm){
                    if(isConfirm)
                    {
                        self.Item.items = self.TempItem.items;
                        $mdDialog.cancel();
                    }
                });
            }
            else{
                $mdDialog.cancel();
            }
        }
    };
})();

/**
 * Created by Mustafa on 29.07.2015.
 */
(function(){
    angular.module('app')
        .controller('AddOptionsCtrl',['item','$mdDialog','notify','CheckLists',addOptionsCtrl]);

    function addOptionsCtrl(item,$mdDialog,notify,CheckLists){
        var self = this;
        self.Item = item;
        self.TempItem = angular.copy(item);
        self.addNew = addNew;
        self.remove = remove;
        self.save = save;
        self.cancel = cancel;
        self.isChanged = false;

        return self;


        function addNew(){
            self.Item.Options.push({
                isChecked:false,
                title:'',
                comments:'',
                checkDate:''
            });

            self.isChanged = true;
        }

        function remove(item,ev){
            self.Item.Options.forEach(function(oldItem,key){
               if(item.Id == oldItem.Id )
               {
                   notify.confirm('Sil','Seçili opsiyon silinecek devam edilsinmi ?').then(function(isConfirm){
                      if(isConfirm)
                      {
                          var index = self.Item.Options.indexOf(item);
                          self.Item.Options.splice(index,1);
                          self.isChanged = true;
                      }
                   });
               }
            })
        };

        function save(){
           $mdDialog.hide(true);
        }

        function cancel(){
            if(self.isChanged)
            {
                notify.confirm('Vazgeç','Yaptığınız Değişiklikler Kaybolacak. Devam Edilsinmi ?').then(function(isConfirm){
                    if(isConfirm)
                    {
                        self.Item.Options = self.TempItem.Options;
                        $mdDialog.cancel();
                    }
                });
            }
            else{
                $mdDialog.cancel();
            }
        }
    };
})();