'use strict'


const paises = angular.module('Hospital')

paises.controller('paisController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $scope.data = { pais: '', id: '', codigoPostal:'' }
  $scope.paises = []
  getAll()

  $scope.handleShowForm = () =>$('.formContainer').slideDown()
  $scope.handleCancel = () => clear()

  $scope.handleSave = function (e) {
    if (validar()) {
      $http.post("src/datos/paises/service/save.php", {
        'pais': $scope.data.pais,
        'id': $scope.data.id,
        'codigoPostal': $scope.data.codigoPostal
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

  $scope.get = function (id, pais, codigoPostal) {
    $scope.data = { pais, id, codigoPostal }
    $('.formContainer label').addClass('active')
    $('.formContainer').slideDown()
  }

  $scope.delete = function (id) {
    $http.post("src/datos/paises/service/delete.php", { id })
      .then(response => {
        if (response.data == 201) {
          Materialize.toast("Se ha eliminado con exito", 4000)
          getAll()
        }
      })
  }

  function getAll () {
    $http.get('src/datos/paises/service/getAll.php')
    .then(response => $scope.paises = response.data )
  }

  function clear () {
    $scope.data = { pais: '', id: '', codigoPostal: '' }
    $('.formContainer label.active').removeClass('active')
    $('.formContainer').slideUp()
  }

  function validar () {
    const data = $scope.data
    if (data.pais === '') {
      Materialize.toast('Ingrese el pais', 4000)
      $('#pais').focus()
      return false
    }
    if (data.codigoPostal === '') {
      Materialize.toast('Ingrese el codigo postal', 4000)
      $('#codigoPostal').focus()
      return false
    }
    else return true
  }
})
