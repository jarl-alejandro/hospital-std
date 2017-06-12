'use strict'


const sitemasFiscos = angular.module('Hospital')

sitemasFiscos.controller('sitemasFiscosController', function ($scope, toaster, $http) {
  $scope.showForm = false
  $scope.data = { tipo: '', detalle: '', id: '' }
  $scope.sitemasFiscos = []

  $http.get('src/archivos/sistemas-fisicos/service/getAll.php')
    .then(response => $scope.sitemasFiscos = response.data )

  $scope.handleShowForm = function (e) {
    $scope.showForm = true
  }
  $scope.handleCancel = function (e) {
    $scope.data = { tipo: '', detalle: '', id: '' }
    $scope.showForm = false
  }
  $scope.handleSave = function (e) {
    if ($scope.data.tipo === "") {
      toaster.pop('error', "Error", "Ingresa el tipo")
      return false
    }
    if ($scope.data.detalle === "") {
      toaster.pop('error', "Error", "Ingresa el detalle")
      return false
    }

    $http.post("src/archivos/sistemas-fisicos/service/save.php", {
      'tipo': $scope.data.tipo,
      'detalle': $scope.data.detalle,
      'id': $scope.data.id
    }).then(response => {
      if (response.data == 201) {
        toaster.pop('info', "Se ha guardado con exito")
        $scope.data = { tipo: '', detalle: '', id: '' }
        $scope.showForm = false
        $http.get('src/archivos/sistemas-fisicos/service/getAll.php')
          .then(response => $scope.sitemasFiscos = response.data)
      }
    })
  }

  $scope.get = function (tipo, detalle, id) {
    $scope.data = { tipo: tipo.toString(), detalle, id }
    $scope.showForm = true
  }

  $scope.delete = function (id) {
    $http.post("src/archivos/sistemas-fisicos/service/delete.php", { id })
    .then(response => {
      if (response.data == 201) {
        toaster.pop('info', "Se ha eliminado con exito")
        $http.get('src/archivos/sistemas-fisicos/service/getAll.php')
          .then(response => $scope.sitemasFiscos = response.data)
      }
    })
  }
})
