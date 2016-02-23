angular.module('iu3App.controllers', ['ionic', 'ngCordova', 'jett.ionic.filter.bar'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('GetTeachersJson', ['$scope', '$http', '$ionicFilterBar',  function($scope,$http, $ionicFilterBar){
                                 var filterBarInstance;
                                $http.get("http://iu3.bmstu.ru/WebApi/People")
                                .success(function (data) {
                                $scope.teachers = data;
                                         });
                                
                                $scope.showFilterBar = function () {
                                filterBarInstance = $ionicFilterBar.show({
                                                                         
                                                                         items: $scope.data,
                                                                         filterProperties: ['ID', 'FIO'],
                                                                         update: function (filteredItems, filterText) {
                                                                         $scope.data = filteredItems;
                                                                         if (filterText) {
                                                                         console.log('filteredItems');
                                                                         console.log(filteredItems);
                                                                         console.log(filterText);
                                                                         }
                                                                         }
                                                                         });
                                
                                };
                                
                                $scope.refreshItems = function () {
                                if (filterBarInstance) {
                                filterBarInstance();
                                filterBarInstance = null;
                                }
                                
                                $timeout(function () {
                                         getItems();
                                         $scope.$broadcast('scroll.refreshComplete');
                                         }, 1000);
                                };
                                
                                
//                                $scope.showFilterBar = function () {
//                                console.log('FILTER 1');
//                                
//                                
//                                };
                                
                                
                                }])

.controller('TeacherCtrl', ['$scope', '$stateParams',
                            function($scope, $stateParams) {
                            console.log('teacher ctrl', $stateParams)
                            $scope.ID = $stateParams.teacherId;
                            $scope.teacher = $stateParams.teacher;
                            
                            }])

.controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
            
            $ionicPlatform.ready(function() {
                                 
                                 $ionicLoading.show({
                                                    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
                                                    });
                                 
                                 var posOptions = {
                                 enableHighAccuracy: true,
                                 timeout: 20000,
                                 maximumAge: 0
                                 };
                                 $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                                                                                         var lat  = position.coords.latitude;
                                                                                         var long = position.coords.longitude;
                                                                                         
                                                                                         var myLatlng = new google.maps.LatLng(lat, long);
                                                                                         
                                                                                         var mapOptions = {
                                                                                         center: myLatlng,
                                                                                         zoom: 16,
                                                                                         mapTypeId: google.maps.MapTypeId.ROADMAP
                                                                                         };          
                                                                                         
                                                                                         var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
                                                                                         
                                                                                         $scope.map = map;   
                                                                                         $ionicLoading.hide();           
                                                                                         
                                                                                         }, function(err) {
                                                                                         $ionicLoading.hide();
                                                                                         console.log(err);
                                                                                         });
                                 });               
            })


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
