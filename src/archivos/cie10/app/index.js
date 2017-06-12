'use strict'

const cie10 = angular.module('Hospital')

cie10.controller('cie10Controller', function ($scope, toaster, $http) {
  $scope.showForm = false
  $scope.data = { codigo: '', detalle: '', id: '' }
  $scope.cie10 = []

  $http.get('src/archivos/cie10/service/getAll.php')
    .then(response => $scope.cie10 = response.data )

  $scope.handleShowForm = function (e) {
    $scope.showForm = true
  }
  $scope.handleCancel = function (e) {
    $scope.data = { codigo: '', detalle: '', id: '' }
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

    $http.post("src/archivos/cie10/service/save.php", {
      'codigo': $scope.data.codigo,
      'detalle': $scope.data.detalle,
      'id': $scope.data.id
    }).then(response => {
      if (response.data == 201) {
        toaster.pop('info', "Se ha guardado con exito")
        $scope.data = { codigo: '', detalle: '', id: '' }
        $scope.showForm = false
        $http.get('src/archivos/cie10/service/getAll.php').then(response => $scope.cie10 = response.data)
      }
    })
  }

  $scope.get = function (codigo, detalle, id) {
    $scope.data = { codigo, detalle, id }
    $scope.showForm = true
  }

  $scope.delete = function (id) {
    $http.post("src/archivos/cie10/service/delete.php", { id })
    .then(response => {
      if (response.data == 201) {
        toaster.pop('info', "Se ha eliminado con exito")
        $http.get('src/archivos/cie10/service/getAll.php').then(response => $scope.cie10 = response.data)
      }
    })
  }
})
