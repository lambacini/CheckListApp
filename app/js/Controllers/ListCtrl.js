/**
 * Created by Mustafa on 29.07.2015.
 */
(function() {
    angular.module('app')
        .controller('ListCtrl', ['$scope', 'store', '$q', '$mdDialog', '$mdSidenav', '$filter', 'CheckLists', 'notify', '$timeout',
            'menu', 'AuthService', '$state', 'hotkeys', 'appParams', 'signalRHubProxy', 'UserSettings', listCtrl
        ]);


    function listCtrl($scope, store, $q, $mdDialog, $mdSidenav, $filter, CheckLists, notify, $timeout,
        menu, AuthService, $state, hotkeys, appParams, signalRHubProxy, UserSettings) {
        var self = this;
        self.menu = menu;
        self.loadCheckList = loadCheckList;
        self.Items = CheckLists.query(function() {
            if (self.Items && self.Items.length > 0) {
                self.Selectedlist = self.Items[self.Items.length - 1];
            }
        });
        self.Selectedlist = {};
        self.IsAllowEdit = IsAllowEdit;
        self.IsAllowAddOptions = IsAllowAddOptions;
        self.IsOwner = IsOwner;
        self.toggle = toggle;
        self.logout = logout;
        self.showUserSettings = showUserSettings;
        self.changePassword = changePassword;
        self.selectItem = selectItem;
        self.showComment = showComment;
        self.addNew = addNew;
        self.editList = editList;
        self.addOptions = addOptions;
        self.openSideBar = openSideBar;
        self.openMenu = openMenu;
        self.shareList = shareList;
        self.OnlyChecked = false;
        self.ListType = "Tümü";
        self.ChangeList = ChangeList;
        self.TempItem = self.Items[0];
        self.isVisible = isVisible;
        self.getCheckedCount = getCheckedCount;
        self.getCheckedCountForItem = getCheckedCountForItem;
        self.OnlyChecked = true;
        self.test = test;
        self.sections = [{
            Name: "Listelerim"
        }, {
            Name: "Paylaşılanlar"
        }]

        /*
        var authData = store.get('token');
                console.log(authData);
                if (authData) {
                    $.signalR.ajaxDefaults.headers= {Authorization : "Bearer "+authData.token};

                };

        $.connection.hub.url = "http://10.63.10.78:8000/signalr";
        var checkSync = $.connection.checkListHub;
        checkSync.client.sayHello = function(data){
            
            console.log(data);
            if(self.Selectedlist.Id && data.Id)
            {
                $scope.$apply(function(){
                    self.Selectedlist = data;
                });
            }
        };
        $.connection.hub.start().done(function(){

        });

        */

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
            var defer = $q.defer();

            if (!self.IsAllowEdit()) {
                defer.reject();
            } else if (item.IsChecked == 0) {
                item.IsChecked = 1;
                defer.resolve(true);
            } else {
                notify.confirm('İptal', 'Seçim iptal edilecek eminmisiniz ?').then(function(isConfirm) {
                    if (isConfirm) {
                        item.IsChecked = 0;
                        defer.resolve(true);
                    } else {
                        defer.reject();
                    }
                });
            }

            defer.promise.then(function() {
                self.Selectedlist.Options.forEach(function(listItem, key) {
                    if (item.Id == listItem.Id) {
                        if (item.IsChecked) {
                            item.checkDate = Date.now();
                        } else {
                            item.checkDate = "";
                        }

                        item.CheckedUserId = appParams.UserInfo.userId;
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
            });
        };

        function selectItem(item) {
            $mdSidenav('left').close();

            notify.showLoading();
            CheckLists.get({
                id: item.Id
            }, function(data) {
                self.Selectedlist = data;
                notify.hideLoading();
            });
        };

        function showComment(item, ev) {
            $mdDialog.show({
                controller: "CommentsCtrl",
                controllerAs: 'vc',
                resolve: {
                    Item: function() {
                        return item;
                    }
                },
                templateUrl: 'views/templates/comments.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true,
                targetEvent: ev,
            }).then(function(data) {
                notify.showLoading();
                CheckLists.update({
                    id: self.Selectedlist.Id
                }, self.Selectedlist, function(data) {
                    $timeout(function() {
                        notify.hideLoading();
                    });
                });
            });
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
                clickOutsideToClose: false,
                escapeToClose: false,
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
                    Item: function() {
                        return new CheckLists();
                    }
                },
                templateUrl: 'views/templates/EditList.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true,
                targetEvent: ev,
            }).then(function() {
                self.loadCheckList();
            }, function() {

            });
        };

        function editList(ev) {
            $mdDialog.show({
                controller: "EditListCtrl",
                controllerAs: 'vc',
                resolve: {
                    Item: function() {
                        return self.Selectedlist;
                    }
                },
                templateUrl: 'views/templates/EditList.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true,
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

        function getCheckedCountForItem(item) {
            if (self.Selectedlist) {
                var tool = $filter('filter')(item.Options, {
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
            AuthService.logout().then(function() {
                $state.go('login');
            });
        }

        function showUserSettings(ev) {
            notify.showLoading();

            UserSettings.get({
                id: appParams.UserInfo.userId
            }, function(data) {
                notify.hideLoading();

                $mdDialog.show({
                    controller: "UserSettingsCtrl",
                    controllerAs: 'vc',
                    resolve:{
                        setting:function(){
                            return data;
                        }
                    },
                    templateUrl: 'views/templates/UserSettings.tmpl.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false,
                    escapeToClose: true,
                    targetEvent: ev,
                }).then(function(data) {

                });
            });
        }

        function changePassword(ev){
             $mdDialog.show({
                    controller: "PasswordCtrl",
                    controllerAs: 'vc',
                    templateUrl: 'views/templates/ChangePassword.tmpl.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false,
                    escapeToClose: true,
                    targetEvent: ev,
                }).then(function(data) {

                });
        }
        function shareList(ev) {
            $mdDialog.show({
                controller: "ShareCtrl",
                controllerAs: 'vc',
                resolve: {
                    Item: function() {
                        return self.Selectedlist;
                    }
                },
                templateUrl: 'views/templates/ShareList.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: true,
                targetEvent: ev,
            }).then(function(data) {

            });
        }

        function test() {
            console.log("Test");
        }

        function IsAllowEdit() {
            if (self.Selectedlist.UserId == appParams.UserInfo.userId) {
                return true;
            } else {
                if (self.Selectedlist.UserCanBeEdit == 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        function IsAllowAddOptions() {
            if (self.Selectedlist.UserId == appParams.UserInfo.userId) {
                return true;
            } else {
                if (self.Selectedlist.UserCanBeAdd == 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        function IsOwner() {
            if (self.Selectedlist.UserId == appParams.UserInfo.userId) {
                return true;
            } else {
                return false;
            }
        }
    };
})();
