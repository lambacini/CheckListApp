/**
 * Created by Mustafa on 30.07.2015.
 */
(function() {
    'use strict';

    angular.module('app')
        .service('notify', ['$q','$mdDialog', 'sweet','$mdToast', Notify]);

    function Notify($q,$mdDialog, sweet,$mdToast) {
        var self = this;
        self.showError = showError;
        self.showWarning = showWarning;
        self.showLoading = showLoading;
        self.hideLoading = hideLoading;
        self.confirm = confirm;
        self.toast = toast;

        return self;

        function showError(title, msg) {
            sweet.show({
                title: title,
                text: msg,
                type: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                closeOnCancel: false
            });
        }

        function showWarning(title, msg) {
            sweet.show({
                title: title,
                text: msg,
                type: 'warning',
                showConfirmButton: false,
                showCancelButton: false,
                closeOnCancel: false
            });
        }

        function confirm(title,msg){
            var defer = $q.defer();

            sweet.show({
                title: title,
                text: msg,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: "Evet",
                cancelButtonText: "Vazgeç",
                closeOnConfirm: true
            }, function(isConfirm) {
                defer.resolve(isConfirm);
            });

            return defer.promise;
        }

        function showLoading() {
            var parentEl = angular.element(document.body);

            $mdDialog.show({
                parent: parentEl,
                templateUrl: 'views/templates/loading.tmpl.html',
                disableParentScroll: true,
                hasBackdrop: true,
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }

        function hideLoading() {
            $mdDialog.hide();
        }

        function toast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position('top right')
                    .hideDelay(2000)
            );
        }
    };
})();
