'use strict'

const doctor = angular.module('Hospital')

doctor.controller('pacientesDoctorController', function ($scope, $http, $location) {
  $scope.pacientes = []

  $http.get('src/doctor/pacientes/service/getAll.php')
    .then(response => $scope.pacientes = response.data)

  $scope.form = object => {
    const parametros = object.fecha.split('-')
    const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
    const now = new Date()
    const year = now.getFullYear() - fecha.getFullYear()
    const moth = now.getMonth() - fecha.getMonth()
    const age = (year * 12) + moth

    if (age < 2) $location.path(`/form28A/${object.id}/${object.turno}`)
    else $location.path(`/form28C/${object.id}/${object.turno}`)
  }
})
