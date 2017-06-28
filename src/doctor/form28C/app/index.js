'use strict'

const form28C = angular.module('Hospital')

form28C.controller('form28CController',  function ($scope, $http) {
  $scope.sistemas = []
  $scope.fisicos = []

  $http.get('src/doctor/form28C/service/sistemas.php')
    .then(response => $scope.sistemas = response.data)

  $http.get('src/doctor/form28C/service/fisico.php')
    .then(response => $scope.fisicos = response.data)
})
