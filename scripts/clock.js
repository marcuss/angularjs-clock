// MODULE
var angularApp = angular.module('angularApp', ['ngMessages', 'ngResource', 'countrySelect']);
"use strict";


// CONTROLLERS
angularApp.controller('mainController', ['$scope', '$log', '$filter', '$resource', '$http', '$interval', '$timeout','$window',
                                         function ($scope, $log, $filter, $resource, $http, $interval, $timeout, $window) {
//      function GeoTestCtrl($scope, $window) {
    $scope.supportsGeo = $window.navigator;
    $scope.position = null;
    $scope.doTest1 = function() {
        window.navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
                $scope.position = position;
            });
        }, function(error) {
            alert(error);
        });
    };
    
    $scope.doTest2 = function() {
        $window.navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
                $scope.position = position;
            });
        }, function(error) {
            alert(error);
        });
    };

//}                                       
    $scope.doTest1();
    $log.error($scope.position);                             
    $scope.alerts = [];                                       
                                           
    $scope.pushAlert = function (alertMessage){
      alert = {expired:false, message : alertMessage};
      $scope.alerts.push(alert);
      $timeout(function(alert) { $scope.alerts.splice( 0,1 );
                          $log.info(alert); }, 4000);
    }
                                           
   function callTimeServer(){                                    
    var dateTimeEndpoint =  'http://time.jsontest.com/';                                

    $http.get(dateTimeEndpoint)
                .success(function (result){
                      $scope.dateTime = result;
      					 $scope.localTime =  new Date(result.milliseconds_since_epoch);
      					 $log.info('Response from: '+ dateTimeEndpoint);
      					 $log.info(result);
      					 $scope.pushAlert("Time sync with "+ dateTimeEndpoint + " via rest");
    }).error(function (result, status){
                      $log.error(result);
      					 $scope.dateTime
                });
    } 
                                           

                                        
    callTimeServer();    
    $scope.pushAlert("started...");
                                           
    $interval(secondCounter, 1000);             
     function secondCounter() {
      	$scope.localTime.setSeconds($scope.localTime.getSeconds()+1);
    }
                                           
    //Synch again every minute   
    $interval(synchronizedClock, 1000*10);                                        
     function synchronizedClock() {
      	callTimeServer();
    }
                                           
   console.log($scope.selectedCountry);

}]);




