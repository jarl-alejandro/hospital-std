'use strict'

const singosVitales = angular.module('Hospital')

singosVitales.controller('singosVitalesController', function ($scope, toaster, $http) {
  
})

singosVitales.controller('pacienteSignoController', function ($scope, $http, $stateParams) {
  const id = $stateParams.id

  $scope.handleShowForm = function handleShowForm () {
    $('.formPlus').slideDown()
  }

  $scope.handleCancel = function handleCancel () {
    $('.formPlus').slideUp()
  }

  $scope.handleSave = function handleSave () {
    $('.formPlus').slideUp()
  }

})