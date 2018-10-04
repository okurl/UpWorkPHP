/*
	Login controller for NG_POLICIES app.
*/

NG_PMOne = angular.module("UpWork", []);

NG_PMOne.controller("mainCtrl", function ($rootScope, $scope, $timeout, $http, $location, $window) {

	console.log('login loaded');

	$scope.msg = 'Logging in to upwork portal. Please wait...';

	$scope.saveUpWorkToken = function () {
		if (localStorage.getItem('access_token') != null && localStorage.getItem('access_token') != undefined && localStorage.getItem('access_token') != "" && localStorage.getItem('access_secret') != null && localStorage.getItem('access_secret') != undefined && localStorage.getItem('access_secret') != "") {
			var data = {
				"UserId": localStorage.getItem('userId'),
				"Email": "",
				"Token": localStorage.getItem('access_token'),
				"Secret": localStorage.getItem('access_secret')
			};
			$http(
				{
					method: 'POST',
					url: 'https://pmpupwork.azurewebsites.net/UprowkWebApp/_api/upwork/tokenwrite_uat',
					data:data
				}).then(function successCallback(response) {
					console.log('Add Token success', response);
					$scope.msg = "Login successfully. window will close automatically.";
					$window.close();
				}, function errorCallback(response) {
						alert("Add Token Error - ", response);
						alert('Something went wrong please try again.');
						$window.close();
					});
		}
		else {
			$timeout(function () {
				$scope.saveUpWorkToken();
			}, 1100);
		}
	}


	//Initialize all functioins
	$scope.onInit = function () {
		if (localStorage.getItem('sitetoken') != null) {
			$scope.saveUpWorkToken();
		}
		else {
			$timeout(function () {
				$scope.onInit();
			}, 1000);
		}
	}
	$scope.onInit();
});






