/**
 * Created by Mustafa on 29.07.2015.
 */
(function(){
    angular.module('app')
        .controller('ListCtrl',['$mdDialog','$mdSidenav',listCtrl]);


    function listCtrl($mdDialog,$mdSidenav){
        var self = this;

        self.Items  =[
            {
                title:"Yapılacaklar 29.07.2015",
                cdate:'29.07.2015 08:15:14',
                stepByStep:false,
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
        self.openSideBar = openSideBar;
        self.openMenu = openMenu;

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

        function addNew(ev){
            $mdDialog.show({
                controller: "EditListCtrl",
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
    };
})();