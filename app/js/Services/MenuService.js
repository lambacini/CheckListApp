(function() {
    'use strict';

    angular.module('app')
        .factory('menu', ['$location', menu]);


    function menu($location) {
        var sections = [{
            name: 'Ana Sayfa',
            url: '/app/home',
            type: 'link'
        }, {
            name: 'Hızlı Liste',
            url: '/studies',
            type: 'link'
        }, {
            name: 'Çalışmalar',
            url: '/app/studies',
            type: 'link'
        }, {
            name: 'İş Listesi (MWL)',
            url: '/mwl',
            type: 'link'
        }, {
            name: 'Görev Yöneticisi',
            url: '/works',
            type: 'link'
        }];

        sections.push({
            name: 'Yönetimsel',
            type: 'heading',
            children: [{
                name: 'Ayarlar',
                type: 'toggle',
                pages: [{
                    name: 'Cihazar',
                    url: '/app/device',
                    type: 'link'
                }, {
                    name: 'Servisler',
                    url: '/app/services',
                    type: 'link'
                }, {
                    name: 'Disk Yönetimi',
                    url: '/app/storage',
                    type: 'link'
                }, {
                    name: 'Arşiv Ayarları',
                    url: '/archive',
                    type: 'link'
                }, {
                    name: 'Servis Kuralları',
                    url: '/rules',
                    type: 'link'
                }, {
                    name: 'Sistem Logları',
                    url: '/logs',
                    type: 'link'
                }]
            }]
        });

        sections.push({
            name: 'Sistem Logları',
            url: '/logs',
            type: 'link'
        });

        function sortByName(a, b) {
            return a.name < b.name ? -1 : 1;
        }

        var self;

        return self = {
            sections: sections,

            selectSection: function(section) {
                console.log(page);
                self.openedSection = section;
            },
            toggleSelectSection: function(section) {
                console.log(section);
                self.openedSection = (self.openedSection === section ? null : section);
            },
            isSectionSelected: function(section) {
                return self.openedSection === section;
            },

            selectPage: function(section, page) {
                console.log(page);
                page && page.url && $location.path(page.url);
                self.currentSection = section;
                self.currentPage = page;
            },
            isPageSelected: function(page) {
                return self.currentPage === page;
            }
        };
    };
})();


(function() {
    'use strict';
    angular.module('app')
        .directive('menuLink', menuLink)
        .directive('menuToggle', menuToggle)
        .directive('autoFocus', autoFocus)
        .filter('humanizeDoc', humanizeDoc)
        .filter('directiveBrackets', directiveBrackets)
        .filter('nospace', nospace);

    function menuLink() {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'views/templates/menu-link.tmpl.html',
            link: function($scope, $element) {
                var controller = $element.parent().controller();
                $scope.isSelected = function() {
                    return controller.isSelected($scope.section);
                };
                $scope.focusSection = function() {
                    // set flag to be used later when
                    // $locationChangeSuccess calls openPage()
                    controller.autoFocusContent = true;
                };
            }
        };
    };

    function menuToggle() {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'views/templates/menu-toggle.tmpl.html',
            link: function($scope, $element) {
                var controller = $element.parent().controller();
                $scope.isOpen = function() {
                    return controller.isOpen($scope.section);
                };
                $scope.toggle = function() {
                    controller.toggleOpen($scope.section);
                };
                var parentNode = $element[0].parentNode.parentNode.parentNode;
                if (parentNode.classList.contains('parent-list-item')) {
                    var heading = parentNode.querySelector('h2');
                    $element[0].firstChild.setAttribute('aria-describedby', heading.id);
                }
            }
        };
    };

    function autoFocus($timeout) {
        return {
            restrict: 'AC',
            link: function(_scope, _element) {
                $timeout(function() {
                    _element[0].focus();
                    _element[0].select();
                }, 0);
            }
        };
    };

    function humanizeDoc() {
        return function(doc) {
            if (!doc) return;
            if (doc.type === 'directive') {
                return doc.name.replace(/([A-Z])/g, function($1) {
                    return '-' + $1.toLowerCase();
                });
            }
            return doc.label || doc.name;
        };
    };

    function directiveBrackets() {
        return function(str) {
            if (str.indexOf('-') > -1) {
                return '<' + str + '>';
            }
            return str;
        };
    };

    function nospace() {
        return function(value) {
            return (!value) ? '' : value.replace(/ /g, '');
        };
    };
})();
