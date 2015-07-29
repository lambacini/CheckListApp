(function(){
  angular.module('app')
      .controller('TestCtrl',[testCtrl]);

  function testCtrl(){
    var self = this;
    self.TempText = "Test Ok ";
    return self;

  };
})();