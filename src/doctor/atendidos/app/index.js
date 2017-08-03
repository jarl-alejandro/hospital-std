'use strict'

const atendidos = angular.module('Hospital')

atendidos.controller('atendidosController', function ($scope, $http, $location) {
  $scope.pacientes = []

  $http.get('src/doctor/atendidos/service/getAll.php')
  .then(response => $scope.pacientes = response.data)

  $scope.handlePrint = turno => {
    window.open (`src/doctor/atendidos/reporte/form28A.php?turno=${turno}`,
      "_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=60, width=1200, height=600")
  }

})
