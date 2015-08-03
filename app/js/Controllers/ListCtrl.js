/**
 * Created by Mustafa on 29.07.2015.
 */
(function() {
    angular.module('app')
        .controller('ListCtrl', ['$mdDialog', '$mdSidenav', '$filter', 'CheckLists', 'notify', '$timeout','menu','AuthService','$state','hotkeys', listCtrl]);


    function listCtrl($mdDialog, $mdSidenav, $filter, CheckLists, notify, $timeout,menu,AuthService,$state,hotkeys) {
        var self = this;
        self.menu = menu;
        self.loadCheckList = loadCheckList;
        self.Items = CheckLists.query(function() {
            if (self.Items && self.Items.length > 0) {
                self.Selectedlist = self.Items[self.Items.length - 1];
            }
        });

        self.Selectedlist = {};
        self.toggle = toggle;
        self.logout = logout;
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
        self.getCheckedCount = getCheckedCount;
        self.OnlyChecked = true;
        self.test = test;

        hotkeys.add({
            combo: 'f7',
            callback: function() {
                self.addNew();
            }
        });

        return self;

        function loadCheckList() {
            notify.showLoading();
            CheckLists.query(function(data) {
                self.Items = data;
                if (self.Items && self.Items.length > 0) {
                    self.Selectedlist = self.Items[self.Items.length - 1];
                }
                $timeout(function() {
                    notify.hideLoading();
                });
            });
        }

        function toggle(item) {
            self.Selectedlist.Options.forEach(function(listItem, key) {
                if (item.Id == listItem.Id) {
                    if (item.IsChecked) {
                        item.checkDate = Date.now();
                    } else {
                        item.checkDate = "";
                    }
                    item.isBusy = true;

                    CheckLists.update({
                        id: self.Selectedlist.Id
                    }, self.Selectedlist, function(data) {

                        $timeout(function() {
                            //notify.hideLoading();
                            item.isBusy = false;
                        });
                    });
                }
            });
        };

        function selectItem(item) {
            notify.showLoading();
            CheckLists.get({id:item.Id},function(data) {
                self.Selectedlist = data;
                notify.hideLoading();
            });
        };

        function showComment(item, ev) {
            console.log(item);
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .title("Bilgi")
                .content(item.Comment)
                .ariaLabel('Comment')
                .ok('Tamam')
                .targetEvent(ev)
            );
        }

        function addOptions(ev) {
            $mdDialog.show({
                controller: "AddOptionsCtrl",
                controllerAs: 'vc',
                resolve: {
                    item: function() {
                        return self.Selectedlist;
                    }
                },
                templateUrl: 'views/templates/AddOptions.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose:false,
                escapeToClose:false,
                targetEvent: ev,
            }).then(function(test) {
                notify.showLoading();
                CheckLists.update({
                    id: self.Selectedlist.Id
                }, self.Selectedlist, function(data) {
                    $timeout(function() {
                        notify.hideLoading();
                    });
                });
            });
        };

        function addNew(ev) {
            $mdDialog.show({
                controller: "EditListCtrl",
                controllerAs: 'vc',
                resolve: {
                    Items: function() {
                        return self.Items;
                    }
                },
                templateUrl: 'views/templates/EditList.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose:false,
                escapeToClose:false,
                targetEvent: ev,
            }).then(function() {
                self.loadCheckList();
            }, function() {

            });
        };

        function openSideBar() {
            $mdSidenav('left').open();
        }

        function openMenu() {
            $mdSidenav('left').open();
        }

        function ChangeList() {
            if (self.OnlyChecked) {
                self.ListType = "Bekleyenler";

            } else {
                self.ListType = "Tümü";

            }
        }

        function isVisible(item) {
            if (self.OnlyChecked && item.IsChecked)
                return false;
            else if (!self.OnlyChecked) {
                return true;
            } else
                return true;
        }

        function getCheckedCount() {
            if (self.Selectedlist) {
                var tool = $filter('filter')(self.Selectedlist.Options, {
                    IsChecked: 1
                });

                if (tool) {
                    return tool.length;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        }

        function logout() {
            AuthService.logout().then(function(){
                $state.go('login');
            });
        }

        function test(){
            console.log("Test");
        }
    };
})();
