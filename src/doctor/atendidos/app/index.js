'use strict'

const atendidos = angular.module('Hospital')

atendidos.controller('atendidosController', function ($scope, $http) {
  $scope.pacientes = []

  $http.get('src/doctor/atendidos/service/getAll.php')
  .then(response => {
    $scope.pacientes = response.data
    console.log(response)
  })
})
