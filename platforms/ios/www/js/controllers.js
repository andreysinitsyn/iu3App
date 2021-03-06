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

.controller('GetTeachersJson', ['$scope', '$http', '$timeout', '$ionicFilterBar', '$ionicLoading',  function($scope,$http,$timeout, $ionicFilterBar, $ionicLoading){

        var filterBarInstance;

        $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br/>'
         });

        function getItems () {
        $http.get("http://iu3.bmstu.ru/WebApi/People")
        .success(function (data) {
        $scope.teachers = data;
        $ionicLoading.hide();
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
          template: '<ion-spinner icon="ios"></ion-spinner><br/>'
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

.controller('PublicationCtrl', ['$scope', '$stateParams', '$cordovaInAppBrowser', function($scope, $stateParams, $cordovaInAppBrowser) {
                  console.log('Publication ctrl', $stateParams)
                  $scope.ID = $stateParams.publicationId;
                  $scope.publication = $stateParams.publication;

                  var options = {
                    location: 'yes',
                     clearcache: 'yes',
                     toolbar: 'yes',
                     closebuttoncaption: 'DONE?'
                  };

                  var url = $stateParams.publication.Url;

                  $scope.openInAppBrowser = function()
                  {
                   // Open in app browser
                   $cordovaInAppBrowser.open(url,'_system', options)
                                 .then(function(event) {
                                    // success
                                  })
                                  .catch(function(event) {
                                    // error
                                  })
                  };

                  // var options = {
                  //   location: 'yes',
                  //   clearcache: 'yes'
                  //   // toolbar: 'no'
                  // };
                  //
                  //
                  //
                  // if ($scope.publication.Url != null){
                  //   // $scope.publicationCard = '<a class="button button-block button-energized" ng-click = "openBrowser()" style="width:95%; margin-left:10px;">Detail View</a>';
                  //   // $scope.value='mk';
                  //   // var html='<div  ng-click="selectedValue(value)">Value</div>' ;
                  //      var html = '<a class="button button-block button-energized" ng-click = "openBrowser()" style="width:95%; margin-left:10px;">Detail View</a>';
                  //      angular.element(document.getElementById('publicationCard')).append($compile(html)($scope))
                  //
                  //      $scope.openBrowser = function() {
                  //        console.log('btn has been pushed')
                  //         $cordovaInAppBrowser.open($scope.publication.Url, '_blank', options)
                  //      };
                  // }

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

.controller('GroupsCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', function($scope, $http, $stateParams, $ionicLoading) {
                          $ionicLoading.show({
                            template: '<ion-spinner icon="ios"></ion-spinner><br/>'
                           });
                           function getItems () {
                           $http.get("http://iu3.bmstu.ru/WebApi/GroupNames")
                           .success(function (data) {
                                    $scope.items = data;
                                    $ionicLoading.hide();
                                    });
                           }

                           getItems();

}])

.controller('PlanCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', function($scope, $http, $stateParams, $ionicLoading) {

                          $ionicLoading.show({
                            template: '<ion-spinner icon="ios"></ion-spinner><br/>'
                           });
                           function getItems () {
                           $http.get("http://iu3.bmstu.ru/WebApi/StudyPlanList")
                           .success(function (data) {
                                    $scope.items = data;
                                    $ionicLoading.hide();
                                    });
                           }

                           getItems();

}])

.controller('PlanDetailsCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', '$ionicModal', function($scope, $http, $stateParams, $ionicLoading, $ionicModal) {
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

                            //var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

                            $ionicModal.fromTemplateUrl('plandecription.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                          }).then(function(modal) {
                            $scope.modal = modal;
                          });
                          $scope.openModal = function() {
                            $scope.modal.show();
                          };
                          $scope.closeModal = function() {
                            $scope.modal.hide();
                          };
                          // Cleanup the modal when we're done with it!
                          $scope.$on('$destroy', function() {
                            $scope.modal.remove();
                          });
                          // Execute action on hide modal
                          $scope.$on('modal.hidden', function() {
                            // Execute action
                          });
                          // Execute action on remove modal
                          $scope.$on('modal.removed', function() {
                            // Execute action
                          });

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

.controller('PlanSectionCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', function($scope, $http, $stateParams, $ionicLoading) {
                            console.log('section ctrl', $stateParams)
                            $scope.ID = $stateParams.sectionId;
                            $scope.section = $stateParams.section;
                            // console.log('section: ', $scope.section)
                            // console.log('scope.section.SubSections: ', $scope.section.SubSections)
                            // console.log('$scope.section.Courses.Name: ', $scope.section.Courses.Name)
                            // console.log('$stateParams.section): ', $stateParams.section)
                            // console.log('$stateParams.section.SubSections): ', $stateParams.section.SubSections)
                            // console.log('$stateParams.section.Courses.Name): ', $stateParams.section.Courses.Name)

                            if ($stateParams.section.SubSections.length == 0){
                                $scope.sectionCard = '<ion-list>';
                                console.log('list opened ')
                            for (var i in $stateParams.section.Courses) {
                                console.log('i: ', i)
                                $scope.sectionCard = $scope.sectionCard + '<ion-item  ui-sref="app.courseDetails({courseId: '+$stateParams.section.Courses[i].ID+'})" class="item item-icon-left">'+ $stateParams.section.Courses[i].Name +'</ion-item >';
                              }
                              $scope.sectionCard = $scope.sectionCard +   '</ion-list>';
                              console.log('list closed ')
                            }


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


}])

.controller('courseDetailsCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', '$ionicModal', function($scope, $http, $stateParams, $ionicLoading, $ionicModal) {
                             console.log('course details ctrl', $stateParams)
                             var courseId = $stateParams.courseId;
                             console.log('course ID:', courseId)

                             $ionicLoading.show({
                               template: '<ion-spinner icon="ios"></ion-spinner><br/>'
                              });

                             function getItems () {
                             $http.get("https://iu3.bmstu.ru/WebApi/Course/" + courseId)
                             .success(function (data) {
                                      $scope.course = data;
                                      $ionicLoading.hide();
                                      //console.log('$scope.course.Name:', $scope.course.Name)
                                      $scope.courseCard = '<div class="list card">';
                                      // console.log('Degree:', $scope.teacher.Degree)
                                      if ($scope.course.Name != null){
                                        $scope.courseCard = $scope.courseCard + '<a href="#" class="item item-icon-left">'+ $scope.course.Name +' ('+$scope.course.Abbreviation+')</a>';
                                      }
                                      if ($scope.course.DepartmentName != null){
                                        $scope.courseCard = $scope.courseCard + '<a href="#" class="item item-icon-left">'+ $scope.course.DepartmentName +' ('+$scope.course.DepartmentShortName+')</a>';
                                      }
                                      if ($scope.course.DepartmentUrl != null){
                                        $scope.courseCard = $scope.courseCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-earth"></i>'+ $scope.course.DepartmentUrl +'</a>';
                                      }
                                      if ($scope.courseCard.PeopleNames != null){
                                        $scope.courseCard = $scope.courseCard + '<a href="#" class="item item-icon-left"> <i class="icon ion-person-stalker"></i>'+ $scope.course.PeopleNames +'</a>';
                                      }

                                      $scope.teacherCard = $scope.teacherCard + '</div>';


                                        if ($scope.course.Description == null){
                                          $scope.course.Description = "Нет описания";
                                          console.log('$scope.course.Description:', $scope.course.Description)
                                        }

                                      });
                             }
                             getItems ();

                             $ionicModal.fromTemplateUrl('coursedecription.html', {
                             scope: $scope,
                             animation: 'slide-in-up'
                           }).then(function(modal) {
                             $scope.modal = modal;
                           });
                           $scope.openModal = function() {
                             $scope.modal.show();
                           };
                           $scope.closeModal = function() {
                             $scope.modal.hide();
                           };
                           // Cleanup the modal when we're done with it!
                           $scope.$on('$destroy', function() {
                             $scope.modal.remove();
                           });
                           // Execute action on hide modal
                           $scope.$on('modal.hidden', function() {
                             // Execute action
                           });
                           // Execute action on remove modal
                           $scope.$on('modal.removed', function() {
                             // Execute action
                           });

}])

.controller('mainpageCtrl', ['$scope', '$ionicModal', function($scope, $ionicModal) {
                $ionicModal.fromTemplateUrl('mainpagedecription.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                $scope.modal = modal;
              });
              $scope.openModal = function() {
                $scope.modal.show();
              };
              $scope.closeModal = function() {
                $scope.modal.hide();
              };
              // Cleanup the modal when we're done with it!
              $scope.$on('$destroy', function() {
                $scope.modal.remove();
              });
              // Execute action on hide modal
              $scope.$on('modal.hidden', function() {
                // Execute action
              });
              // Execute action on remove modal
              $scope.$on('modal.removed', function() {
                // Execute action
              });

}])


.controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $ionicModal) {

            $ionicPlatform.ready(function() {

                //  $ionicLoading.show({
                //    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
                //   });

                 var posOptions = {
                 enableHighAccuracy: true,
                 timeout: 20000,
                 maximumAge: 0
                 };
                 $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

                                     var lat  = 55.766099;
                                     var long = 37.685613;

                                     var myLatlng = new google.maps.LatLng(lat, long);

                                     var mapOptions = {
                                     center: myLatlng,
                                     zoom: 15,
                                     mapTypeId: google.maps.MapTypeId.ROADMAP
                                     };

                                     var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                                     var marker = new google.maps.Marker({
                                      position: myLatlng,
                                      map: map,
                                      title: 'МГТУ им. Н.Э.Баумана'
                                    });

                                     $scope.map = map;
                                     $ionicLoading.hide();

                                     }, function(err) {
                                    //  $ionicLoading.hide();
                                     console.log(err);
                                     });
          });

          $ionicModal.fromTemplateUrl('contactsdetails.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });
        $scope.openModal = function() {
          $scope.modal.show();
        };
        $scope.closeModal = function() {
          $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
          $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
          // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
          // Execute action
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
	},
  {
		id: 'page-shoulders',
		uuid:'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0',
		major: 2,
		minor: 2
	},
  {
		id: 'page-face',
		uuid:'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0',
		major: 0,
		minor: 33331
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
  var timeNow = Date.now();
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
  // if ((beacon.proximity == 'ProximityImmediate' || beacon.proximity == 'ProximityNear')
	// 	&& app.currentPage != pageId)
	// {
  //   console.log('******* Testlog Inside Level 1, pageId: ' + pageId + ' proximity: ' + beacon.proximity + ' rssi: ' + beacon.rssi + ' *******')
	// 	app.gotoPage(pageId)
	// 	return
	// }
  // else if
  //   (beacon.rssi < -56 && beacon.rssi > -71 && app.currentPage != pageId)
	// {
  //   pageId = "page-shoulders";
  //   console.log('******* Testlog Inside Level 2, pageId: ' + pageId + ' proximity: ' + beacon.proximity + ' rssi: ' + beacon.rssi + ' *******')
	// 	app.gotoPage(pageId)
	// 	return
	// }

	// If the beacon represents the current page but is far away,
	// then show the default page.
	//if ((beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityUnknown')
  // if ((beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityUnknown')
	// 	&& app.currentPage == pageId)
	// {
  //   console.log('******* Testlog Outside, pageId: ' + pageId + ' proximity: ' + beacon.proximity + ' rssi: ' + beacon.rssi + ' *******')
	// 	app.gotoPage('page-default')
	// 	return
	// }

  beacon.timeStamp = Date.now() + 100000;
  var time = beacon.timeStamp + 100000;
  // beacon.timeStamp.setSeconds(beacon.timeStamp.getSeconds() + 5);
  console.log('----*******----> timeNow: ' + timeNow)
  console.log('----*******----> beacon.timeStamp + 5sec: ' + time)

  //if (beacon.timeStamp > timeNow) {
  var delay=3000; //3 second

  setTimeout(function() {
        if ((beacon.proximity == 'ProximityImmediate' || beacon.proximity == 'ProximityNear')
      		&& app.currentPage == 'page-default')
      	{
          console.log('----*******----> timeNow 2: ' + timeNow)
          console.log('----*******----> beacon.timeStamp 2: ' + beacon.timeStamp)
      		app.gotoPage(pageId)
      		return
      	}

      	// If the beacon represents the current page but is far away,
      	// then show the default page.
      	if ((beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityUnknown')
      		&& app.currentPage == pageId)
      	{
      		app.gotoPage('page-default')
      		return
      	}

  }, delay)
  // else if
  //   (beacon.rssi < -56 && beacon.rssi > -71 && app.currentPage == pageId)
	// {
  //   pageId = "page-shoulders";
  //   console.log('******* Testlog Inside Level 2, pageId: ' + pageId + ' proximity: ' + beacon.proximity + ' rssi: ' + beacon.rssi + ' *******')
  //   console.log('----*******----> Hide current page: ' + app.currentPage)
  //   app.gotoPage(pageId)
	// 	return
	// }
}


app.gotoPage = function(pageId)
{
  console.log('----*******----> Hide current page: ' + app.currentPage)
	app.hidePage(app.currentPage)
  console.log('----*******----> Open page: ' + pageId)
	app.showPage(pageId)
	app.currentPage = pageId
  console.log('----*******----> New current page: ' + app.currentPage)
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
