'use strict'

angular.module('Hospital')
.controller('hoja1Conroller', function ($scope, $http) {
  $scope.ant_maternos = []
  $scope.ant_familiares = []
  $scope.ant_prenatales = []
  $scope.nacimientos = []
  $scope.recien_nacidos = []
  $scope.abstre = {
    embarazo: false,
    gemelar: false
  }

  $http.get('src/doctor/form28A/service/items.php?tipo=3')
  .then(response => $scope.ant_maternos = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=4')
  .then(response => $scope.ant_familiares = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=5')
  .then(response => $scope.ant_prenatales = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=6')
  .then(response => $scope.nacimientos = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=7')
  .then(response => $scope.recien_nacidos = response.data)
})
.controller('signosFormController', function ($scope, $http, $stateParams) {
  $scope.signos = {}
  const turno = $stateParams.turno

  $http.get(`src/doctor/form28A/service/signosVitales.php?turno=${turno}`)
  .then(response => $scope.signos = response.data)
})
