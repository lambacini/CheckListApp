/**
 * Created by Mustafa on 31.07.2015.
 */
(function(){
    angular.module('app')
        .controller('LoginCtrl',['$scope', '$log', 'AuthService', '$state', 'notify', 'appParams', '$http', loginCtrl]);

    function loginCtrl($scope, $log, AuthService, $state, notify, appParams,  $http) {
        $scope.login = login;
        $scope.logout = logout;

        $scope.loginData = {
            UserName: "",
            Password: "",
            RememberMe: true
        };
        $scope.formState = false;

        function login() {
            notify.showLoading();
            $scope.formState = true;

            AuthService.login($scope.loginData)
                .then(function(response) {
                    notify.hideLoading();
                    $scope.formState = false;
                    $state.go('app.list');
                    //$scope.loadUserDefaults();
                }).catch(function(error) {
                    notify.hideLoading();
                    $scope.formState = false;
                    $log.error(error);
                    if (error == 400)
                        notify.toast('Kullanıcı Adı / Şifre Hatalı !');
                });

        };

        function logout() {
            notify.hideLoading();
        };
    };
})();