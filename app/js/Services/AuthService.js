(function () {
    'use strict';

    angular.module('app')
        .factory('AuthService', ['$q', '$http', '$log', 'jwtHelper', 'appParams', '$location', '$state', 'store', authService]);

    /* @ngInject */
    function authService($q, $http, $log, jwtHelper, appParams, $location, $state, store) {
        console.log('authService initializing !');
        var self = this;

        self.ping = ping;
        self.login = login;
        self.logout = logout;
        self.refreshToken = refreshToken;
        self.isLoginRequired = isLoginRequred;
        self.fillAuthData = fillAuthData;

        var authentication = {
            isAuth: false,
            userName: "",
            refreshToken: "",
            useRefreshToken: true
        };

        return self;

        function ping() {
            var def = $q.defer();

            var settings = {
                url: appParams.WebApiUrl + 'api/Account/Ping',
                ShowLoadig: true
            };

            $http.post(settings)
                .success(function (data) {
                    def.resolve(true);
                })
                .error(function (error) {
                    def.reject(error);
                });

            return def.promise;
        }
        function login(loginData) {

            var data = "grant_type=password&username=" + loginData.UserName + "&password=" + loginData.Password;
            if (loginData.RememberMe) {
                data = data + "&client_id=CheckApp";
            }

            var deferred = $q.defer();

            $http.post(appParams.WebApi + 'token', data, { ShowLoading: true }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {

                    store.set('token',
                        {
                            token: response.access_token,
                            userName: response.userName,
                            refreshToken: response.refresh_token,
                            useRefreshTokens: true
                        });

                    authentication.isAuth = true;
                    authentication.userName = loginData.userName;
                    authentication.useRefreshTokens = loginData.useRefreshTokens;

                    deferred.resolve(response);

                }).error(function (err, status) {
                    self.logout();
                    deferred.reject(status);
                });
            return deferred.promise;
        }
        function logout() {
            var deferred = $q.defer();
            store.remove('token');

            authentication.isAuth = false;
            authentication.userName = "";
            authentication.useRefreshTokens = false;
            deferred.resolve(true);
            return deferred.promise;
        };
        function fillAuthData() {
            var def = $q.defer();
            var authData = store.get('token');


            if (authData) {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
                authentication.useRefreshTokens = authData.useRefreshTokens;
                def.resolve(true);
            } else {
                def.reject("");
            }

            return def.promise;

        };
        function refreshToken() {

            var deferred = $q.defer();
            var authData = store.get('token');

            if (authData) {
                if (authData.useRefreshTokens) {
                    var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + appParams.clientId;

                    store.remove('token');

                    var settings =
                    {
                        url: appParams.WebApiUrl + 'token',
                        data: data,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        ShowLoading: false
                    };


                    $http.post(settings)
                        .success(function (response) {
                            store.set('token',
                                {
                                    token: response.access_token,
                                    userName: response.userName,
                                    refreshToken: response.refresh_token,
                                    useRefreshTokens: true
                                });

                            deferred.resolve(response);

                        }).error(function (err, status) {
                            deferred.reject(err);
                        });
                }
            }

            return deferred.promise;
        };
        function isLoginRequred() {
            var def = $q.defer();
            try {
                var authinfo = store.get('token');
                if (authinfo) {
                    if (authinfo.token) {
                        if (!jwtHelper.isTokenExpired(authinfo.token)) {
                            console.log("token valid loginRequired = false");
                            def.resolve(false);
                        } else {
                            console.log("token expired loginRequired = true");
                            def.resolve(true);
                            if (!authinfo.refreshToken) {

                            }
                        }
                    } else {
                        $log.debug("Token Not Found ! loginRequired = true");
                        def.resolve(true);
                    }
                } else {
                    $log.debug("Token Not Found ! loginRequired = true");
                    def.resolve(true);
                }
            } catch (e) {
                def.reject(e);
            }

            return def.promise;
        }
    };

    authService.$inject = ['$q', '$http', '$log', 'jwtHelper', 'appParams', '$location', '$state', 'store'];
})();
