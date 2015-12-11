// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

angular.module('starter').controller('mainController', function($scope, $ionicPopup, $ionicListDelegate){

  var tasks = new getTasks();
  $scope.lista = tasks.items;
  $scope.removeStatus = false;

  function getItem(item, isNew){
    $scope.data = { 
      newTask: item.name 
    };

    $ionicPopup.show({
      title: 'Nova tarefa',
      scope: $scope,
      template: '<input type="text" ng-model="data.newTask" placeholder="Tarefa" autofocus="true"></input>',
      buttons: [{
          text: 'Ok',
          onTap: function(e){
            item.name = $scope.data.newTask;

            if(isNew)
              tasks.add(item);
              
            tasks.save();
          }
        },
        {text: 'Cancel'}
      ]
    });

    $ionicListDelegate.closeOptionButtons();
  }

  $scope.onMarkTask = function(item){
    item.finished = !item.finished;
    tasks.save();
  };

  $scope.onHideItem = function(item){
    return item.finished && !$scope.showMarked;
  };

  $scope.onItemAdd = function(){
    item = {
      name: '',
      finished: false
    };
    
    getItem(item, true);
  };

  $scope.onItemEdit = function(item){
    getItem(item, false);
  }

  $scope.onItemRemove = function(item){
    tasks.remove(item);
    tasks.save();
  };

  $scope.onClickRemove = function(){
    $scope.removeStatus = !$scope.removeStatus;
  };

  

});

