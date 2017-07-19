'use strict'

const atendidos = angular.module('Hospital')

atendidos.controller('atendidosController', function ($scope, $http, $location) {
  $scope.pacientes = []

  $http.get('src/doctor/atendidos/service/getAll.php')
  .then(response => $scope.pacientes = response.data)

  $scope.form = object => {
    const parametros = object.hgc_fecn_pacie.split('-')
    const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
    const now = new Date()
    const year = now.getFullYear() - fecha.getFullYear()
    const moth = now.getMonth() - fecha.getMonth()
    const age = (year * 12) + moth
    console.log(object)

    if (age < 2) $location.path(`/form28A/${object.hgc_paci_turno}/${object.hgc_id_turno}`)
    else $location.path(`/form28C/${object.hgc_paci_turno}/${object.hgc_id_turno}`)
  }
})
