'use strict'

const cantones = angular.module('Hospital')

cantones.controller('cantonesController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $scope.data = { provincia: '', id: '', canton: '', distrito: '' }
  $scope.cantones = []
  $scope.distritos = []
  $scope.provincias = []
  $('.browser-default').select2()

  getAll()

  $http.get('src/datos/cantones/service/distrito.php')
    .then(response => $scope.distritos = response.data)

  $http.get('src/datos/provincias/service/getAll.php')
    .then(response => $scope.provincias = response.data)

  $scope.handleShowForm = () => $('.formContainer').slideDown()
  $scope.handleCancel = () => clear()

  $scope.handleSave = function (e) {
    if (validar()) {
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
          getAll()
          clear()
        }
      })
    }
  }

  $scope.get = function (id, canton, provincia, distrito) {
    $scope.data = { provincia, id, canton, distrito }
    setTimeout(() => {
      $('#provincia').val(provincia).trigger('change')
      $('#distrito').val(distrito).trigger('change')
    }, 100)
    $('.formContainer').slideDown()
  }

  $scope.delete = function (id) {
    $http.post("src/datos/cantones/service/delete.php", { id })
      .then(response => {
        if (response.data == 201) {
          Materialize.toast("Se ha eliminado con exito", 4000)
          getAll()
        }
      })
  }

  function getAll () {
    $http.get('src/datos/cantones/service/getAll.php')
      .then(response => $scope.cantones = response.data)
  }

  function clear () {
    $scope.data = { provincia: '', id: '', canton: '', distrito: '' }
    $('.formContainer').slideUp()
    setTimeout(() => {
      $('#provincia').val('').trigger('change')
      $('#distrito').val('').trigger('change')
    }, 100)
  }

  function validar () {
    if ($scope.data.canton == "") {
      Materialize.toast("Ingresa el canton", 4000)
      return false
    }
    if ($scope.data.provincia == "") {
      Materialize.toast("Ingresa la provincia", 4000)
      return false
    } if ($scope.data.distrito == "") {
      Materialize.toast("Selecione la distrito", 4000)
      return false
    } else return true
  }
})
