/**
 * Created by Mustafa on 29.07.2015.
 */
(function(){
    angular.module('app')
        .controller('ListCtrl',['$mdDialog','$mdSidenav','$filter',listCtrl]);


    function listCtrl($mdDialog,$mdSidenav,$filter){
        var self = this;

        self.Items  =[
            {
                title:"Yapılacaklar 29.07.2015",
                cdate:'29.07.2015 08:15:14',
                stepByStep:false,
                group:"Default",
                allowEdit:false,
                owner:1,
                items:[
                    {
                        index:1,
                        isChecked:true,
                        title:'Adana Devlet Aktarım',
                        comments:'Adana Devlet FONETHBYS kullanıcsını aktar',
                        checkDate:Date.now()
                    },
                    {
                        index:2,
                        isChecked:false,
                        title:'Adana Devlet Raporları Teslim Et',
                        comments:'Açklama yok',
                        checkDate:""
                    },
                    {
                        index:3,
                        isChecked:false,
                        title:'Adana Devlet Flash ile kargo yapsınlar',
                        comments:'A??klama yok',
                        checkDate:""
                    },
                    {
                        index:3,
                        isChecked:false,
                        title:'Samsun Gazi Pacs Aktarımı',
                        comments:'A??klama yok',
                        checkDate:""
                    }
                ]
            },
            {
                title:"Diğer Bir Hastane Kurulum Yapılacaklar",
                cdate:'29.07.2015 08:15:14',
                stepByStep:false,
                group:"Default",
                allowEdit:false,
                owner:1,
                items:[
                    {
                        index:1,
                        isChecked:true,
                        title:'Veritabanı Kur',
                        comments:'Açıklama yok',
                        checkDate:Date.now()
                    },
                    {
                        index:2,
                        isChecked:false,
                        title:'Dosyaları Kopyala',
                        comments:'Açıklama yok',
                        checkDate:""
                    },
                    {
                        index:3,
                        isChecked:false,
                        title:'Conf Oluştur',
                        comments:'Açıklama yok',
                        checkDate:""
                    },
                    {
                        index:3,
                        isChecked:false,
                        title:'Servis Oluştur',
                        comments:'Açıklama yok',
                        checkDate:""
                    }
                ]
            }
        ];
        self.Selectedlist = self.Items[0];
        self.toggle = toggle;
        self.selectItem = selectItem;
        self.showComment = showComment;
        self.addNew = addNew;
        self.addOptions = addOptions;
        self.openSideBar = openSideBar;
        self.openMenu = openMenu;
        self.OnlyChecked = false;
        self.ListType = "Tümü";
        self.ChangeList = ChangeList;
        self.TempItem = self.Items[0];
        self.isVisible = isVisible;
        self.getCheckedCount =getCheckedCount;


        return self;

        function toggle(item){
            self.Selectedlist.items.forEach(function(listItem,key){
               if(item.index == listItem.index)
               {
                   if(item.isChecked)
                   {
                       item.checkDate = Date.now();
                   }
                   else
                   {
                       item.checkDate = "";
                   }
               }
            });

        };

        function selectItem(item){
            self.Selectedlist = item;
        };

        function showComment(item,ev){
            console.log(item);
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title(item.title)
                    .content(item.comments)
                    .ariaLabel('Comment')
                    .ok('Tamam')
                    .targetEvent(ev)
            );


        }

        function addOptions(ev){
            $mdDialog.show({
                controller: "AddOptionsCtrl",
                controllerAs:'vc',
                resolve: {
                    item:function() {
                        return self.Selectedlist;
                    }
                },
                templateUrl: 'views/templates/AddOptions.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
            });
        };

        function addNew(ev){
            $mdDialog.show({
                controller: "EditListCtrl",
                controllerAs:'vc',
                resolve: {
                    Items:function() {
                        return self.Items;
                    }
                },
                templateUrl: 'views/templates/EditList.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
            });
        };

        function openSideBar(){
            $mdSidenav('left').open();
        }

        function openMenu(){
            $mdSidenav('left').open();
        }

        function ChangeList(){
            if(self.OnlyChecked)
            {
                self.ListType = "Bekleyenler";
                self.tempItem = angular.copy(self.Selectedlist);
            }
            else{
                self.ListType = "Tümü";
                self.Selectedlist = self.tempItem;
            }
        }

        function isVisible(item){
            if(self.OnlyChecked && item.isChecked)
                return false;
            else if(!self.OnlyChecked)
            {
                return true;
            }
            else
                return true;
        }

        function getCheckedCount(){
            var tool = $filter('filter')( self.Selectedlist.items, {
                isChecked: true
            });

            return tool.length;
        }
    };
})();