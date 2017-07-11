'use strict'

const parroquia = angular.module('Hospital')

parroquia.controller('parroquiaController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $('ul.tabs').tabs()

  $scope.data = { parroquia: '', id: '', canton: '', ciruitos: [] }
  $scope.parroquias = []
  $scope.cantones = []
  $scope.ciruitos = []
  getAll()

  $http.get('src/datos/cantones/service/getAll.php')
    .then(response => $scope.cantones = response.data )

  $http.get('src/datos/parroquia/service/ciruitos.php')
    .then(response => $scope.ciruitos = response.data )

  $scope.handleShowForm = () => $('.formContainer').slideDown()
  $scope.handleCancel = () => clear()

  $scope.handleSave = function (e) {
    if ($scope.data.parroquia == "") {
      Materialize.toast("Ingresa la parroquia", 4000)
      return false
    }
    if ($scope.data.canton == "") {
      Materialize.toast("Ingresa el canton", 4000)
      return false
    }

    $http.post("src/datos/parroquia/service/save.php",{
      'canton': $scope.data.canton,
      'id': $scope.data.id,
      'parroquia': $scope.data.parroquia
    }).then(response => {
      if (response.data == 201) {
        Materialize.toast("Se ha guardado con exito", 4000)
        clear()
        getAll()
      }
    })
  }

  $scope.get = function (id, parroquia, canton) {
    $scope.data.parroquia = parroquia
    $scope.data.id = id
    $scope.data.canton = canton
    $('.formContainer').slideDown()
  }

  $scope.delete = function (id) {
    $http.post("src/datos/parroquia/service/delete.php", { id })
      .then(response => {
        if (response.data == 201) {
          Materialize.toast("Se ha eliminado con exito", 4000)
          getAll()
        }
      })
  }

  function getAll () {
    $http.get('src/datos/parroquia/service/getAll.php')
      .then(response => $scope.parroquias = response.data)
  }

  function clear () {
    $('.formContainer').slideUp()
    $scope.data = { parroquia: '', id: '', canton: '', ciruitos: [] }
  }

})
