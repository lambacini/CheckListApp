/**
 * Created by Mustafa on 10.08.2015.
 */
(function(){
    angular.module('app')
    .factory('signalRHubProxy', ['$rootScope', 'appParams','store',
        function ($rootScope, appParams,store) {
            function signalRHubProxyFactory(serverUrl, hubName, startOptions) {
                var authData = store.get('token');
                console.log(authData);
                if (authData) {
                    $.signalR.ajaxDefaults.headers= {Authorization : "Bearer "+authData.token};

                }

                //var connection = $.hubConnection('http://'+window.location.hostname+'/CheckApi');
                var connection = $.hubConnection('http://'+window.location.hostname+':8000/');
                connection.logging = false;
                
                var proxy = connection.createHubProxy(hubName);

                console.log(connection);
                console.log(proxy);

                connection.start({ transport: 'longPolling' }).done(function () { });

                return {
                    on: function (eventName, callback) {
                        proxy.on(eventName, function (result) {
                            $rootScope.$apply(function () {
                                if (callback) {
                                    callback(result);
                                }
                            });
                        });
                    },
                    off: function (eventName, callback) {
                        proxy.off(eventName, function (result) {
                            $rootScope.$apply(function () {
                                if (callback) {
                                    callback(result);
                                }
                            });
                        });
                    },
                    invoke: function (methodName, callback) {
                        proxy.invoke(methodName)
                            .done(function (result) {
                                $rootScope.$apply(function () {
                                    if (callback) {
                                        callback(result);
                                    }
                                });
                            });
                    },
                    connection: connection
                };
            };

            return signalRHubProxyFactory;
        }]);
})();