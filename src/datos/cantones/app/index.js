'use strict'

const cantones = angular.module('Hospital')

cantones.controller('cantonesController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $scope.data = { provincia: '', id: '', canton: '', distrito: '' }
  $scope.cantones = []
  $scope.distritos = []
  $scope.provincias = []

  $http.get('src/datos/cantones/service/getAll.php')
    .then(response => $scope.cantones = response.data )

  $http.get('src/datos/cantones/service/distrito.php')
    .then(response => $scope.distritos = response.data)

  $http.get('src/datos/provincias/service/getAll.php')
    .then(response => $scope.provincias = response.data )

  $scope.handleShowForm = function (e) {
    $('.formContainer').slideDown()
  }

  $scope.handleCancel = function (e) {
    $scope.data = { provincia: '', id: '', canton: '', distrito: '' }
    $('.formContainer').slideUp()
  }

  $scope.handleSave = function (e) {
    if ($scope.data.canton == "") {
      Materialize.toast("Ingresa el canton", 4000)
      return false
    }
    if ($scope.data.provincia == "") {
      Materialize.toast("Ingresa la provincia", 4000)
      return false
    }
    $http.post("src/datos/cantones/service/save.php", {
      'provincia': $scope.data.provincia,
      'id': $scope.data.id,
      'canton': $scope.data.canton,
      'distrito': $scope.data.distrito
     })
      .then(response => {
        console.log(response)
        if (response.data == 201) {
          Materialize.toast("Se ha guardado con exito", 4000)
          $scope.data = { canton: '', id: '', provincia: '', distrito: '' }
          $('.formContainer').slideUp()
          $http.get('src/datos/cantones/service/getAll.php')
            .then(response => $scope.cantones = response.data)
        }
      })
  }

  $scope.get = function (id, canton, provincia, distrito) {
    $scope.data = { provincia, id, canton, distrito }
    $('.formContainer').slideDown()
  }

  $scope.delete = function (id) {
    $http.post("src/datos/cantones/service/delete.php", { id })
      .then(response => {
        if (response.data == 201) {
          Materialize.toast("Se ha eliminado con exito", 4000)
          $http.get('src/datos/cantones/service/getAll.php')
            .then(response => $scope.cantones = response.data)
        }
      })
  }
})
