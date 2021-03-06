// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('iu3App', ['ionic', 'iu3App.controllers', 'ngCordova', 'ngCordovaBeacon', 'jett.ionic.filter.bar', 'angular.filter'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider) {

  var backText = "Назад";
  $ionicConfigProvider.backButton.previousTitleText(false).text(backText).icon('ion-ios-arrow-back');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
         controller: 'MapController'
      }
    }
  })

  .state('app.main', {
    url: '/main',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html',
        controller: 'mainpageCtrl'
      }
    }
  })

  .state('app.groupslist', {
    url: '/groupslist',
    views: {
      'menuContent': {
        templateUrl: 'templates/groupslist.html',
        controller: 'GroupsCtrl'
      }
    }
  })

  .state('app.beacon', {
    url: '/beacon',
    views: {
      'menuContent': {
        templateUrl: 'templates/beacon.html',
        controller:  'BeaconCtrl'
      }
    }
  })


  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller:  'BeaconCtrll'
        }
      }
    })

    .state('app.plan', {
        url: '/plan',
        views: {
          'menuContent': {
            templateUrl: 'templates/plan.html',
            controller:  'PlanCtrl'
          }
        }
      })
    .state('app.teachers', {
       url: '/teachers',
       views: {
         'menuContent': {
           templateUrl: 'templates/teachers.html',
           controller: 'GetTeachersJson'
         }
       }
    })

    .state('app.publications', {
       url: '/publications',
       views: {
         'menuContent': {
           templateUrl: 'templates/publications.html',
           controller: 'GetPublicationsJson'
         }
       }
    })

    .state('app.publicationDetails', {
       url: '/:publicationId',
       params : { publication: null, },
       views: {
         'menuContent': {
           templateUrl: 'templates/publication.html',
           controller: 'PublicationCtrl'
         }
       }
    })



    .state('app.teachersDetails', {
       url: '/:teacherId',
       params : { teacher: null, },
       views: {
         'menuContent': {
           templateUrl: 'templates/teacher.html',
           controller: 'TeacherCtrl'
         }
       }
    })



    .state('app.schedule', {
           // params: { teacher: null, }
       url: '/:groupName',
       params : { group: null, },
       views: {
         'menuContent': {
           templateUrl: 'templates/schedule.html',
           controller: 'ScheduleCtrl'
         }
       }
    })

    .state('app.plandetails', {

       url: '/:planId',
       params : { plan: null, },
       views: {
           'menuContent': {
           templateUrl: 'templates/plandetails.html',
           controller: 'PlanDetailsCtrl'
           }
        }
    })
     .state('app.plansection', {
        url: '/:sectionId',
        params : { section: null, },
        views: {
            'menuContent': {
            templateUrl: 'templates/plansection.html',
            controller: 'PlanSectionCtrl'
            }
        }
    })

    .state('app.courseDetails', {
       url: '/:courseId',
       params : { course: null, },
       views: {
           'menuContent': {
           templateUrl: 'templates/plancourse.html',
           controller: 'courseDetailsCtrl'
           }
       }
   })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');


});
