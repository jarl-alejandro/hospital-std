'use strict'

angular.module('Hospital')
.controller('formCtrl056', function ($scope, $http, $stateParams) {
  $scope.paciente = {}
  $scope.empresa = {}

  $http.get(`src/doctor/form056/service/paciente.php?id=${$stateParams.id}`)
  .then(response => {
    $scope.paciente = response.data.paciente
    $scope.apellidos = $scope.paciente.hgc_ape_pacie.split(" ")
    $scope.provincia = `${$scope.paciente.hgc_desc_provi}, ${$scope.paciente.hgc_desc_canton}, ${$scope.paciente.hgc_desc_parro}`
    console.log($scope.paciente)
  })

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) $scope.empresa = response.data.empresa
  })

})
