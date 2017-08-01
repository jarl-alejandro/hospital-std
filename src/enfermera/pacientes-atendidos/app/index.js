'use strict'

const pacientesAtendidos = angular.module('Hospital');

pacientesAtendidos.controller('pacAtenController', function ($scope, $http) {
  $scope.pacientes = []

  $http.get('src/enfermera/pacientes-atendidos/service/get.php')
  .then(response => {
    $scope.pacientes = response.data
    console.log(response)
  })
})