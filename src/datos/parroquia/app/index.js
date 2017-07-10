'use strict'

const parroquia = angular.module('Hospital')

parroquia.controller('parroquiaController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $('ul.tabs').tabs()
  $('.browser-default').select2()

  $scope.data = { parroquia: '', id: '', canton: '', circuito: '' }
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
    if (validar()) {
      $http.post("src/datos/parroquia/service/save.php",{
        'canton': $scope.data.canton,
        'id': $scope.data.id,
        'parroquia': $scope.data.parroquia,
        'circuito': $scope.data.circuito
      }).then(response => {
        console.log(response)
        if (response.data == 201) {
          Materialize.toast("Se ha guardado con exito", 4000)
          clear()
          getAll()
        }
      })
    }
  }

  $scope.get = function (parroquia) {
    setTimeout(() => {
      $('#circuitos').val(parroquia.hgc_circ_parro).trigger('change')
      $('#canton').val(parroquia.hgc_cant_parro).trigger('change')
    }, 100)

    $scope.data = {
      parroquia: parroquia.hgc_desc_parro,
      id: parroquia.hgc_codi_parro,
      canton: parroquia.hgc_cant_parro,
      circuito: parroquia.hgc_circ_parro
    }
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
    $scope.data = { parroquia: '', id: '', canton: '', circuito: '' }
  }

  function validar () {
    if ($scope.data.parroquia == "") {
      Materialize.toast("Ingresa la parroquia", 4000)
      return false
    }
    if ($scope.data.canton == "") {
      Materialize.toast("Ingresa el canton", 4000)
      return false
    }
    if ($scope.data.circuitos === "") {
      Materialize.toast(`Seleciona el circuito`)
      return false
    } else return true
  }

})
