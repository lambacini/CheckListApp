(function() {
    angular.module('app')
        .controller('UserSettingsCtrl', ['setting','notify', '$scope', '$mdDialog', 'sweet', 'appParams', 'UserSettings', userSettingsCtrl])
        .controller('PasswordCtrl', ['notify', '$scope', '$mdDialog', 'sweet', 'appParams', 'Users', passwordCtrl]);

    function userSettingsCtrl(setting,notify, $scope, $mdDialog, sweet, appParams, UserSettings) {
        var self = this;
        self.settings = setting;
        //methods

        self.save = save;
        self.cancel = cancel;

        return self;


        function save() {
            UserSettings.update({
                    id: setting.Id
                },
                setting,
                function() {
                    notify.toast("Ayarlarınız Güncellendi ");
                    $mdDialog.hide(true);
                });
        }

        function cancel() {
            $mdDialog.cancel();
        }
    };

    function passwordCtrl(notify, $scope, $mdDialog, sweet, appParams, Users) {
        var self = this;
        self.OldPassword = "";
        self.NewPassword1 = "";
        self.NewPassword2 = "";
        self.FormValid = true;
        self.save = save;
        self.cancel = cancel;

        return self;


        function save() {
            if(self.NewPassword1 != self.NewPassword2){
                self.FormValid = false;
                self.Message = "Şifre ve tekrarı uyuşmuyor !";
            }else if(!self.NewPassword1)
            {
                self.FormValid = false;
                self.Message = "Şifre Alanları Boş !";
            }
            else if(!self.OldPassword)
            {
                self.FormValid = false;
                self.Message = "Şu anki şifrenizi giriniz !";
            }
            else
            {
                var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.{6,})(?=.*[0-9])))(?=.{6,})");
                if(!mediumRegex.test(self.NewPassword1))
                {
                    self.FormValid = false;
                    self.Message = "Şifreniz en az 6 karakter olmalıdır.";
                }
                else{
                    self.FormValid = true;
                    var params = {
                        "OldPassword":self.OldPassword,
                        "NewPassword":self.NewPassword1
                    };

                    Users.change({id:appParams.UserInfo.userId},params,function(data){
                            if(!data.Success){
                                self.FormValid = false;
                                self.Message  =data.Message;
                            }else
                            {
                                notify.toast("Şifre Başarıyla Değiştirldi.")
                                $mdDialog.hide(true);
                            }
                    });
                }
            }
        }

        function cancel() {
            $mdDialog.cancel();
        }
    };
})();
