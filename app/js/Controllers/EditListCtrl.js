/**
 * Created by Mustafa on 29.07.2015.
 */
(function() {
    angular.module('app')
        .controller('EditListCtrl', ['appParams','Item', '$mdDialog', 'notify','AuthService', 'CheckLists', 'hotkeys', editListCtrl]);

    function editListCtrl(appParams,Item, $mdDialog, notify,AuthService, CheckLists, hotkeys) {
        var self = this;
        self.NewItem = Item;
        self.save = save;
        self.cancel = cancel;
        self.remove = remove;
        self.init = init;
        self.IsOwner = IsOwner;
        self.isChanged = false;
        hotkeys.add({
            combo: 'f8',
            callback: function() {
                self.save();
            }
        });

        self.init();
        return self;

        function init() {
            self.IsEdit = "Title" in self.NewItem;
        }

        function remove() {
            notify.confirm('Sil', 'Seçili Liste Silinecek.Devam Edilsinmi ?').then(function(isConfirm) {
                if (isConfirm) {
                    CheckLists.delete({
                        id: self.NewItem.Id
                    }, function() {
                        $mdDialog.hide(true);
                    });
                }
            });
        }

        function save() {
            if (self.IsEdit) {
                CheckLists.update({
                        id: self.NewItem.Id
                    }, self.NewItem,
                    function(data) {
                        $mdDialog.hide(true);
                    });
            } else {
                self.NewItem.CTime = Date.now();

                self.NewItem.$save(function() {
                    $mdDialog.hide(true);
                });
            }
        }

        function cancel() {

            if (self.isChanged) {
                notify.confirm('Vazgeç', 'Yaptığınız Değişiklikler Kaybolacak. Devam Edilsinmi ?').then(function(isConfirm) {
                    if (isConfirm) {
                        self.Item.items = self.TempItem.items;
                        $mdDialog.cancel();
                    }
                });
            } else {
                $mdDialog.cancel();
            }
        }

        function IsOwner(){
            if(!self.IsEdit)
            {
                return true;
            }

            if(self.NewItem.UserId == appParams.UserInfo.userId)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    };
})();

/**
 * Created by Mustafa on 29.07.2015.
 */
(function() {
    angular.module('app')
        .controller('AddOptionsCtrl', ['$q','appParams', 'item', '$mdDialog', 'notify', 'CheckLists', 'hotkeys', addOptionsCtrl]);

    function addOptionsCtrl($q,appParams, item, $mdDialog, notify, CheckLists, hotkeys) {
        var self = this;
        self.Item = item;
        self.TempItem = angular.copy(item);
        self.IsAllowAddOptions = IsAllowAddOptions;
        self.addNew = addNew;
        self.remove = remove;
        self.save = save;
        self.cancel = cancel;
        self.isChanged = false;

        hotkeys.add({
            combo: 'f8',
            callback: function() {
                self.save();
            }
        });

        return self;


        function addNew() {
            self.Item.Options.push({
                IsChecked: 0,
                title: '',
                comments: '',
                checkDate: ''
            });

            self.isChanged = true;
        }

        function remove(item, ev) {
            self.Item.Options.forEach(function(oldItem, key) {
                if (item.Id == oldItem.Id) {
                    notify.confirm('Sil', 'Seçili opsiyon silinecek devam edilsinmi ?').then(function(isConfirm) {
                        if (isConfirm) {
                            var index = self.Item.Options.indexOf(item);
                            self.Item.Options.splice(index, 1);
                            self.isChanged = true;
                        }
                    });
                }
            })
        };

        function save() {
            checkEmptyItems().then(function(confirm) {
                if (confirm) {
                    $mdDialog.hide(true);
                }
                else{
                    notify.toast("Sanırım bazı alanları boş bıraktın !");
                }
            });
        }

        function cancel() {
            if (self.isChanged) {
                notify.confirm('Vazgeç', 'Yaptığınız Değişiklikler Kaybolacak. Devam Edilsinmi ?').then(function(isConfirm) {
                    if (isConfirm) {
                        self.Item.Options = self.TempItem.Options;
                        $mdDialog.cancel();
                    }
                });
            } else {
                $mdDialog.cancel();
            }
        }

        function checkEmptyItems() {
            var confirm = true;
            var defer = $q.defer();
            var ops = [];
            self.Item.Options.forEach(function(item, key) {
                var tempDefer = $q.defer();
                ops.push(tempDefer);
                if (!item.Title) {
                    item.isNull = true;
                    confirm = false;
                    tempDefer.reject("Title is null");
                } else {
                    item.isNull = false;
                    tempDefer.resolve(true);
                }
            });

            $q.all(ops).then(function(test, aa) {
                defer.resolve(confirm);
            });

            return defer.promise;
        }

        function IsAllowAddOptions(){
            if(self.Item.UserId == appParams.UserInfo.userId)
            {
                return true;
            }
            else{
                if(self.Item.UserCanBeEdit == 1)
                {
                    return true;
                }
                else{
                    return false;
                }
            }
        }
    };
})();
