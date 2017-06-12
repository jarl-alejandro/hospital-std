'use strict'

const cie10Two = angular.module('Hospital')

cie10Two.controller('cie10TwoController', function ($scope, toaster, $http) {
  $scope.showForm = false
  $scope.data = { codigo: '', detalle: '', id: '', cie10: '' }
  $scope.cie10 = []
  $scope.cie10Child = []

  $http.get('src/archivos/cie10-1/service/getAll.php')
    .then(response => $scope.cie10 = response.data )

  $http.get('src/archivos/cie10-2/service/getAll.php')
    .then(response => $scope.cie10Child = response.data )

  $scope.handleShowForm = function (e) {
    $scope.showForm = true
  }
  $scope.handleCancel = function (e) {
    $scope.data = { codigo: '', detalle: '', id: '', cie10: '' }
    $scope.showForm = false
  }
  $scope.handleSave = function (e) {
    if ($scope.data.codigo === "") {
      toaster.pop('error', "Error", "Ingresa el codigo")
      return false
    }
    if ($scope.data.detalle === "") {
      toaster.pop('error', "Error", "Ingresa el detalle")
      return false
    }
    if ($scope.data.cie10 === "") {
      toaster.pop('error', "Error", "Ingresa el cie 10")
      return false
    }
    $http.post("src/archivos/cie10-2/service/save.php", {
      'codigo': $scope.data.codigo,
      'detalle': $scope.data.detalle,
      'id': $scope.data.id,
      'cie10': $scope.data.cie10,
    }).then(response => {
      console.log(response)
      if (response.data == 201) {
        toaster.pop('info', "Se ha guardado con exito")
        $scope.data = { codigo: '', detalle: '', id: '', cie10: '' }
        $scope.showForm = false
        $http.get('src/archivos/cie10-2/service/getAll.php')
          .then(response => $scope.cie10Child = response.data)
      }
    })
  }

  $scope.get = function (codigo, detalle, id, cie10) {
    $scope.data = { codigo, detalle, id, cie10 }
    $scope.showForm = true
  }

  $scope.delete = function (id) {
    $http.post("src/archivos/cie10-2/service/delete.php", { id })
    .then(response => {
      if (response.data == 201) {
        toaster.pop('info', "Se ha eliminado con exito")
        $http.get('src/archivos/cie10-2/service/getAll.php')
          .then(response => $scope.cie10Child = response.data)
      }
    })
  }
})
