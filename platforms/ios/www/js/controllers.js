angular.module('iu3App.controllers', ['ionic', 'ngCordova', 'ngCordovaBeacon', 'jett.ionic.filter.bar', 'angular.filter'])

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

.controller('GetTeachersJson', ['$scope', '$http', '$timeout', '$ionicFilterBar',  function($scope,$http,$timeout, $ionicFilterBar){

        var filterBarInstance;

        function getItems () {
        $http.get("http://iu3.bmstu.ru/WebApi/People")
        .success(function (data) {
        $scope.teachers = data;
                 });
        }

        getItems();

        $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({

             items: $scope.teachers,
             filterProperties: ['FIO'],
               update: function (filteredItems, filterText) {
               $scope.teachers = filteredItems;
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

}])

.controller('TeacherCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
                  console.log('teacher ctrl', $stateParams)
                  $scope.ID = $stateParams.teacherId;
                  $scope.teacher = $stateParams.teacher;

                  $scope.teacherCard = '<div class="list card">';
                  // console.log('Degree:', $scope.teacher.Degree)
                  $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-icon-left"> <i class="icon icon ion-person"></i>'+ $scope.teacher.FIO +'</a>';
                  if ($scope.teacher.Degree != null){
                    $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-university"></i>'+ $scope.teacher.Degree +'</a>';
                  }
                  if ($scope.teacher.Position != null){
                    $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-briefcase"></i>'+ $scope.teacher.Position +'</a>';
                  }
                  if ($scope.teacher.EMail != null){
                    $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-at"></i>'+ $scope.teacher.EMail +'</a>';
                  }
                  if ($scope.teacher.Phone != null){
                    $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-ios-telephone"></i>'+ $scope.teacher.Phone +'</a>';
                  }
                  if ($scope.teacher.Fax != null){
                    $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-printer" style="color: blue;"></i>'+ $scope.teacher.Fax +'</a>';
                  }
                  if ($scope.teacher.Twitter != null){
                    $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-social-twitter" style="color: blue;"></i>'+ $scope.teacher.Twitter +'</a>';
                  }
                  if ($scope.teacher.Facebook != null){
                    $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-social-facebook" style="color: blue;"></i>'+ $scope.teacher.Facebook +'</a>';
                  }
                  if ($scope.teacher.LinkedIn != null){
                    $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-social-linkedin" style="color: blue;"></i>'+ $scope.teacher.LinkedIn +'</a>';
                  }
                  if ($scope.teacher.Web != null){
                    $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-earth" style="color: blue;"></i>'+ $scope.teacher.Web +'</a>';
                  }

                  $scope.teacherCard = $scope.teacherCard + '</div>';

                  if ($scope.teacher.CV != null){
                    $scope.teacherCard = $scope.teacherCard + '<div class="list card">';
                    $scope.teacherCard = $scope.teacherCard + '<a href="#" class="item item-text-wrap">'+ $scope.teacher.CV +'</a>';
                    $scope.teacherCard = $scope.teacherCard + '</div>';
                  }

                  $scope.teacherCard = $scope.teacherCard + '</br>';
                  $scope.teacherCard = $scope.teacherCard + '</br>';





}])

.controller('GetPublicationsJson', ['$scope', '$http', '$timeout', '$ionicFilterBar', '$ionicLoading', function($scope,$http,$timeout, $ionicFilterBar, $ionicLoading){

        var filterBarInstance;

        $ionicLoading.show({
          template: '<ion-spinner icon="spiral"></ion-spinner><br/>'
         });

        function getItems () {
        $http.get("http://iu3.bmstu.ru/WebApi/Publications")
        .success(function (data) {
        $scope.publications = data;
        $ionicLoading.hide();
                 });
        }

        getItems();

        $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({

             items: $scope.publications,
             //filterProperties: ['Title', 'Aututhors'],
               update: function (filteredItems, filterText) {
               $scope.publications = filteredItems;
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

}])

.controller('PublicationCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
                  console.log('Publication ctrl', $stateParams)
                  $scope.ID = $stateParams.publicationId;
                  $scope.publication = $stateParams.publication;
                  
                  if ($scope.publication.Url != null){
                    $scope.publicationCard = '<a class="button button-block button-energized" style="width:95%; margin-left:10px;" ui-sref="'+ $scope.publication.Url +'">Detail View</a>';
                  }

}])

.controller('ScheduleCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
                             console.log('schedule ctrl', $stateParams)
                             var groupName = $stateParams.groupName;
                             console.log('test', groupName)
                             function getItems () {
                             $http.get("http://iu3.bmstu.ru/WebApi/WeekSchedule?week=3&filter=" + groupName)
                             .success(function (data) {
                                      $scope.days = data;
                                      for (var i in data) {
                                        if (data[i].Day == "2"){
                                          data[i].Day = "Понедельник";
                                        } else if (data[i].Day == "3"){
                                          data[i].Day = "Вторник";
                                        } else if (data[i].Day == "4"){
                                          data[i].Day = "Среда";
                                        } else if (data[i].Day == "5"){
                                          data[i].Day = "Четверг";
                                        } else if (data[i].Day == "6"){
                                          data[i].Day = "Пятница";
                                        } else if (data[i].Day == "7"){
                                          data[i].Day = "Суббота";
                                        }
                                      }
                                      });
                             }
                             getItems ();

}])

.controller('GroupsCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
                           function getItems () {
                           $http.get("http://iu3.bmstu.ru/WebApi/GroupNames")
                           .success(function (data) {
                                    $scope.items = data;
                                    });
                           }

                           getItems();

}])

.controller('PlanCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
                           function getItems () {
                           $http.get("http://iu3.bmstu.ru/WebApi/StudyPlanList")
                           .success(function (data) {
                                    $scope.items = data;
                                    });
                           }

                           getItems();

}])

.controller('PlanDetailsCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', function($scope, $http, $stateParams, $ionicLoading) {
                             console.log('plan details ctrl', $stateParams)
                             var planId = $stateParams.planId;
                             console.log('plan ID:', planId)

                             $ionicLoading.show({
                               template: '<ion-spinner icon="ios"></ion-spinner><br/>'
                              });

                             function getItems () {
                             $http.get("http://iu3.bmstu.ru/WebApi/StudyPlan/" + planId)
                             .success(function (data) {
                                      $scope.plandetail = data;
                                      $ionicLoading.hide();
                                      });
                             }
                             getItems ();
                            $scope.shownGroup  = null;
                            $scope.toggleGroup = function(group) {

                              if ($scope.isGroupShown(group)) {
                                $scope.shownGroup = null;
                              } else {
                                $scope.shownGroup = group;
                              }
                            };
                            $scope.isGroupShown = function(group) {
                              return $scope.shownGroup === group;
                            };

                          //   $scope.shownItem = null;
                          //   $scope.toggleItem = function(item) {
                          //   if ($scope.isItemShown(item)) {
                          //     $scope.shownItem = null;
                          //   } else {
                          //     $scope.shownItem = item;
                          //   }
                          // };
                          // $scope.isItemShown = function(item) {
                          //   return $scope.shownItem === item;
                          // };

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

.controller('BeaconCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaBeacon) {
console.log('beaconTest start');
            $scope.beacons = {};

            $ionicPlatform.ready(function() {

                                 $cordovaBeacon.requestWhenInUseAuthorization();

                                 $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
                                                var uniqueBeaconKey;
                                                for(var i = 0; i < pluginResult.beacons.length; i++) {
                                                uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                                                $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
                                                }
                                                $scope.$apply();
                                                });

                                 $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("myBeacon", "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0"));

                                 });

})

//.controller('BeaconCtrl' ['$scope', '$rootScope', '$ionicPlatform', function($scope, $rootScope, $ionicPlatform) {
.controller('BeaconCtrll' , function() {

  //beaconId: B7D1027D-6788-416E-994F-EA11075F1765
  var app = {}

// Regions that define which page to show for each beacon.
app.beaconRegions =
[
	{
		id: 'page-feet',
		uuid:'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0',
		major: 1,
		minor: 1
	}
]

// Currently displayed page.
app.currentPage = 'page-default'

app.initialize = function()
{
	document.addEventListener(
		'deviceready',
		app.onDeviceReady,
		false)
	app.gotoPage(app.currentPage)
}

// Called when Cordova are plugins initialised,
// the iBeacon API is now available.
app.onDeviceReady = function()
{
	// Specify a shortcut for the location manager that
	// has the iBeacon functions.
	window.locationManager = cordova.plugins.locationManager

	// Start tracking beacons!
	app.startScanForBeacons()
}

app.startScanForBeacons = function()
{
	console.log('startScanForBeacons')

	// The delegate object contains iBeacon callback functions.
	// The delegate object contains iBeacon callback functions.
	var delegate = new cordova.plugins.locationManager.Delegate()

	delegate.didDetermineStateForRegion = function(pluginResult)
	{
		console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
	}

	delegate.didStartMonitoringForRegion = function(pluginResult)
	{
		console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
	}

	delegate.didRangeBeaconsInRegion = function(pluginResult)
	{
		console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
		app.didRangeBeaconsInRegion(pluginResult)
	}

	// Set the delegate object to use.
	locationManager.setDelegate(delegate)

	// Start monitoring and ranging our beacons.
	for (var r in app.beaconRegions)
	{
		var region = app.beaconRegions[r]

		var beaconRegion = new locationManager.BeaconRegion(
			region.id, region.uuid, region.major, region.minor)

		// Start monitoring.
		locationManager.startMonitoringForRegion(beaconRegion)
			.fail(console.error)
			.done()

		// Start ranging.
		locationManager.startRangingBeaconsInRegion(beaconRegion)
			.fail(console.error)
			.done()
	}
}

// Display pages depending of which beacon is close.
app.didRangeBeaconsInRegion = function(pluginResult)
{
	// There must be a beacon within range.
	if (0 == pluginResult.beacons.length)
	{
		return
	}

	// Our regions are defined so that there is one beacon per region.
	// Get the first (and only) beacon in range in the region.
	var beacon = pluginResult.beacons[0]

	// The region identifier is the page id.
	var pageId = pluginResult.region.identifier

	// console.log('ranged beacon: ' + pageId + ' ' + beacon.proximity)

	// If the beacon is close and represents a new page, then show the page.
	//if ((beacon.proximity == 'ProximityImmediate' || beacon.proximity == 'ProximityNear')
  if (beacon.rssi > -56
		&& app.currentPage != pageId)
	{
    console.log('******* Testlog Inside Level 1, pageId: ' + pageId + ' proximity: ' + beacon.proximity + ' rssi: ' + beacon.rssi + ' *******')
		app.gotoPage(pageId)
		return
	} else if
    (beacon.rssi < -56 && beacon.rssi > -71 && app.currentPage != pageId)
	{
    pageId = "page-shoulders";
    console.log('******* Testlog Inside Level 2, pageId: ' + pageId + ' proximity: ' + beacon.proximity + ' rssi: ' + beacon.rssi + ' *******')
		app.gotoPage(pageId)
		return
	}

	// If the beacon represents the current page but is far away,
	// then show the default page.
	//if ((beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityUnknown')
  if (beacon.rssi < -71
		&& app.currentPage == pageId)
	{
    console.log('******* Testlog Outside, pageId: ' + pageId + ' proximity: ' + beacon.proximity + ' rssi: ' + beacon.rssi + ' *******')
		app.gotoPage('page-default')
		return
	}else if
    (beacon.rssi < -56 && beacon.rssi > -71 && app.currentPage == pageId)
	{
    pageId = "page-shoulders";
    console.log('******* Testlog Inside Level 2, pageId: ' + pageId + ' proximity: ' + beacon.proximity + ' rssi: ' + beacon.rssi + ' *******')
		app.gotoPage(pageId)
		return
	}
}


app.gotoPage = function(pageId)
{
	app.hidePage(app.currentPage)
	app.showPage(pageId)
	app.currentPage = pageId
}

app.showPage = function(pageId)
{
	document.getElementById(pageId).style.display = 'block'
}

app.hidePage = function(pageId)
{
	document.getElementById(pageId).style.display = 'none'
}

// Set up the application.
app.initialize()

  // var uuid = 'B7D1027D-6788-416E-994F-EA11075F1765'; // mandatory
  //   var identifier = 'myBeacon'; // mandatory
  //   var minor = 1000; // optional, defaults to wildcard if left empty
  //   var major = 5; // optional, defaults to wildcard if left empty
  //
  //   // throws an error if the parameters are not valid
  //   var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
  //
  //   return beaconRegion;
  //   console.log('beaconTest', beaconRegion);

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
