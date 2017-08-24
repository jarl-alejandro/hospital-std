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

    const duracion = duration(fecha, now)

    if (duracion.months < 2 && duracion.years <= 0) $location.path(`/form28A/${object.id}/${object.turno}`)
    else if (duracion.months >= 2 && duracion.years <= 9) $location.path(`/form28C/${object.id}/${object.turno}`)
    else if (duracion.years >= 10) {
      $http.get(`src/doctor/pacientes/service/form056_verify.php?paciente=${object.id}`)
      .then(response => {
        if (response.data === '0') $location.path(`/form056/${object.id}/${object.turno}/save`)
        if (response.data === '1') $location.path(`/hoja-devolucion/${object.id}/${object.turno}/save`)
      })
    }
  }
})
