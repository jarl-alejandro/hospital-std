'use strict'

angular.module('Hospital')
.controller('adultoMayorCtrl', function ($scope, $http, $stateParams) {
  const paciente = $stateParams.id
  const turno = $stateParams.turno

  $scope.pacient = {}
  $scope.empresa = {}
  $scope.data = {}
  $scope.edad = { years: '', months: '', days: '' }

  $http.get(`src/doctor/form28A/service/paciente.php?id=${paciente}`)
  .then(response => $scope.pacient = response.data)

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) {
      $scope.empresa = response.data.empresa
    }
  })

  $http.get(`src/doctor/form28C/service/consultas.php?id=${paciente}`)
  .then(response => {
    $scope.consulta = response.data.count + 1
    const parametros = response.data.paciente.hgc_fecn_pacie.toString().split('-')
    const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
    const now = new Date()

    $scope.edad = duration(now, fecha)
  })

})
