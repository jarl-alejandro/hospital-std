'use strict'

const hoja1 = angular.module('Hospital')

hoja1.controller('hoja1Conroller', function ($scope, $http) {
  $scope.ant_maternos = []
  $scope.ant_familiares = []
  $scope.ant_prenatales = []
  $scope.nacimientos = []
  $scope.recien_nacidos = []

  $http.get('src/doctor/form28A/service/items.php?tipo=3')
  .then(response => {
     $scope.ant_maternos = response.data
     console.log(response)
  })

  $http.get('src/doctor/form28A/service/items.php?tipo=4')
  .then(response => $scope.ant_familiares = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=5')
  .then(response => $scope.ant_prenatales = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=6')
  .then(response => $scope.nacimientos = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=7')
  .then(response => $scope.recien_nacidos = response.data)

  $scope.handleNext = () => {
    $('#hoja__1').slideUp()
    $('#hoja__2').slideDown()
  }
})
