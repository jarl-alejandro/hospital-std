'use strict'

const doctor = angular.module('Hospital')

doctor.controller('pacientesDoctorController', function ($scope, $http) {
  $scope.pacientes = []

  $http.get('src/doctor/pacientes/service/getAll.php')
    .then(response => $scope.pacientes = response.data)
})
