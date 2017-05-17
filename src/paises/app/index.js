'use strict'


const paises = angular.module('Hospital')

paises.controller('paisController', function ($scope) {
	$scope.showForm = false
	$scope.data = {}

	$scope.handleShowForm = function (e) {
		$scope.showForm = true
	}
	$scope.handleCancel = function (e) {
		$scope.data = {}
		$scope.showForm = false
	}
	$scope.handleSave = function (e) {
		alert(JSON.stringify($scope.data))
	}
})