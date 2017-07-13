'use strict'

const cie10One = angular.module('Hospital')

cie10One.controller('cie10OneController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $scope.data = { codigo: '', detalle: '', id: '', cie10: '' }
  $scope.cie10 = []
  $scope.cie10Child = []
  $('.browser-default').select2()

  $http.get('src/archivos/cie10/service/getAll.php')
    .then(response => $scope.cie10 = response.data )

  $http.get('src/archivos/cie10-1/service/getAll.php')
    .then(response => $scope.cie10Child = response.data )

  $scope.handleShowForm = function (e) {
    $('.formContainer').slideDown()
  }
  $scope.handleCancel = function (e) {
    $scope.data = { codigo: '', detalle: '', id: '', cie10: '' }
   $('.formContainer').slideUp()
   $('label.active').removeClass('active')
   setTimeout(() => {
     $('#cie10').val('').trigger('change')
   }, 100)
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
    if ($scope.data.cie10 === "") {
      Materialize.toast("Ingresa el cie 10", 4000)
      return false
    }
    $http.post("src/archivos/cie10-1/service/save.php", {
      'codigo': $scope.data.codigo,
      'detalle': $scope.data.detalle,
      'id': $scope.data.id,
      'cie10': $scope.data.cie10,
    }).then(response => {
      console.log(response)
      if (response.data == 201) {
        Materialize.toast("Se ha guardado con exito", 4000)
        $scope.data = { codigo: '', detalle: '', id: '', cie10: '' }

        $('.formContainer').slideUp()
        $http.get('src/archivos/cie10-1/service/getAll.php')
          .then(response => $scope.cie10Child = response.data)
      }
    })
  }

  $scope.get = function (codigo, detalle, id, cie10) {
    $scope.data = { codigo, detalle, id, cie10 }
   $('.formContainer').slideDown()
   setTimeout(() => {
     $('#cie10').val(cie10).trigger('change')
   }, 100)
  }

  $scope.delete = function (id) {
    $http.post("src/archivos/cie10-1/service/delete.php", { id })
    .then(response => {
      if (response.data == 201) {
       Materialize.toast("Se ha eliminado con exito", 4000)
        $http.get('src/archivos/cie10-1/service/getAll.php')
          .then(response => $scope.cie10Child = response.data)
      }
    })
  }
})
