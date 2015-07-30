/**
 * Created by Mustafa on 29.07.2015.
 */
(function(){
    angular.module('app')
        .controller('EditListCtrl',['Items','$mdDialog','notify',editListCtrl]);

    function editListCtrl(Items,$mdDialog,notify){
        var self = this;
        self.Items = Items;
        self.NewItem = {
            title:"",
            cdate:'',
            stepByStep:false,
            group:"Default",
            allowEdit:false,
            owner:1,
            items:[ ]
        };
        self.save = save;
        self.cancel = cancel;

        return self;

        function save(){
            self.Items.push(self.NewItem);
            $mdDialog.cancel();
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
        .controller('AddOptionsCtrl',['item','$mdDialog','notify',addOptionsCtrl]);

    function addOptionsCtrl(item,$mdDialog,notify){
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
            self.Item.items.push({
                index:self.Item.items.length+1,
                isChecked:false,
                title:'',
                comments:'',
                checkDate:''
            });

            self.isChanged = true;
        }

        function remove(item,ev){
            self.Item.items.forEach(function(oldItem,key){
               if(item.index == oldItem.index)
               {
                   notify.confirm('Sil','Seçili opsiyon silinecek devam edilsinmi ?').then(function(isConfirm){
                      if(isConfirm)
                      {
                          var index = self.Item.items.indexOf(item);
                          self.Item.items.splice(index,1);
                          self.isChanged = true;
                      }
                   });
               }
            })
        };

        function save(){
            $mdDialog.cancel();
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