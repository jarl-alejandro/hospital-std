'use strict'

const cie10 = angular.module('Hospital')

cie10.controller('cie10Controller', function ($scope, $http) {
  $('.formContainer').slideUp()
  $scope.data = { codigo: '', detalle: '', id: '' }
  $scope.cie10 = []

  $http.get('src/archivos/cie10/service/getAll.php')
    .then(response => $scope.cie10 = response.data )

  $scope.handleShowForm = function (e) {
    $('.formContainer').slideDown()
  }
  $scope.handleCancel = function (e) {
    $scope.data = { codigo: '', detalle: '', id: '' }
    $('.formContainer').slideUp()
  }
  $scope.handleSave = function (e) {
    if ($scope.data.codigo === "") {
     Materialize.toast("Ingresa el codigo", 4000)
      return false
    }
    if ($scope.data.detalle === "") {
     Materialize.toast("Ingresa el detalle", 4000)
      return false
    }

    $http.post("src/archivos/cie10/service/save.php", {
      'codigo': $scope.data.codigo,
      'detalle': $scope.data.detalle,
      'id': $scope.data.id
    }).then(response => {
      if (response.data == 201) {
        Materialize.toast("Se ha guardado con exito", 4000)
        $scope.data = { codigo: '', detalle: '', id: '' }
        $('.formContainer').slideUp()
        $http.get('src/archivos/cie10/service/getAll.php').then(response => $scope.cie10 = response.data)
      }
    })
  }

  $scope.get = function (codigo, detalle, id) {
    $scope.data = { codigo, detalle, id }
    $('.formContainer').slideDown()
  }

  $scope.delete = function (id) {
    $http.post("src/archivos/cie10/service/delete.php", { id })
    .then(response => {
      if (response.data == 201) {
        Materialize.toast("Se ha eliminado con exito", 4000)
        $http.get('src/archivos/cie10/service/getAll.php').then(response => $scope.cie10 = response.data)
      }
    })
  }
})
