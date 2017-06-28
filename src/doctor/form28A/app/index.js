'use strict'

const form28A = angular.module('Hospital')

form28A.controller('form28AController',  function ($scope, $http) {
  $scope.sistemas = []
  $scope.fisicos = []

  $http.get('src/doctor/form28A/service/sistemas.php')
    .then(response => $scope.sistemas = response.data)

  $http.get('src/doctor/form28A/service/fisico.php')
    .then(response => $scope.fisicos = response.data)
})
