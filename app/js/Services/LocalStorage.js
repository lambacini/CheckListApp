(function () {
    angular.module('fonet-storage',
        [
            'fonet-storage.store'
        ]);

    angular.module('fonet-storage.internalStore', ['fonet-storage.storage'])
        .factory('InternalStore', ["storage", "$log", function (storage, $log) {

            function InternalStore(namespace, delimiter) {
                this.namespace = namespace || null;
                this.delimiter = delimiter || '.';
                this.inMemoryCache = {};
            }

            InternalStore.prototype.getNamespacedKey = function (key) {
                if (!this.namespace) {
                    return key;
                } else {
                    return [this.namespace, key].join(this.delimiter);
                }
            };

            InternalStore.prototype.set = function (name, elem) {
                this.inMemoryCache[name] = elem;
                storage.set(this.getNamespacedKey(name), JSON.stringify(elem));
            };

            InternalStore.prototype.get = function (name) {
                var obj = null;
                if (name in this.inMemoryCache) {
                    return this.inMemoryCache[name];
                }
                var saved = storage.get(this.getNamespacedKey(name));
                try {

                    if (typeof saved === "undefined" || saved === "undefined") {
                        obj = undefined;
                    } else {
                        obj = JSON.parse(saved);
                    }

                    this.inMemoryCache[name] = obj;
                } catch (e) {
                    $log.error("Error parsing saved value", e);
                    this.remove(name);
                }
                return obj;
            };

            InternalStore.prototype.remove = function (name) {
                this.inMemoryCache[name] = null;
                storage.remove(this.getNamespacedKey(name));
            };

            return InternalStore;


        }]);


    angular.module('fonet-storage.storage', [])
        .service('storage', ["$window", "$injector", function ($window, $injector) {
            if ($window.localStorage) {
                this.set = function (what, value) {
                    return $window.localStorage.setItem(what, value);
                };
                this.get = function (what) {
                    return $window.localStorage.getItem(what);
                };
                this.remove = function (what) {
                    return $window.localStorage.removeItem(what);
                };
            } else {
                var $cookieStore = $injector.get('$cookieStore');
                this.set = function (what, value) {
                    return $cookieStore.put(what, value);
                };
                this.get = function (what) {
                    return $cookieStore.get(what);
                };
                this.remove = function (what) {
                    return $cookieStore.remove(what);
                };
            }
        }]);


    angular.module('fonet-storage.store', ['fonet-storage.internalStore'])
        .factory('store', ["InternalStore", function (InternalStore) {

            var store = new InternalStore();
            store.getNamespacedStore = function (namespace, key) {
                return new InternalStore(namespace, key);
            }

            return store;


        }]);


}());