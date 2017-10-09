'use strict'

angular.module('Hospital')
.controller('procedimientosController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $scope.data = { desc: '', id: '', codigoPostal:'' }
  $scope.procedimientos = []
  getAll()

  $scope.handleShowForm = () =>$('.formContainer').slideDown()
  $scope.handleCancel = () => clear()

  $scope.handleSave = function (e) {
    if (validar()) {
      $http.post("src/datos/procedimientos/service/save.php", {
        'desc': $scope.data.desc,
        'id': $scope.data.id,
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

  $scope.get = function (id, desc) {
    $scope.data = { desc, id }
    $('.formContainer label').addClass('active')
    $('.formContainer').slideDown()
  }

  $scope.delete = function (id) {
    $http.post("src/datos/procedimientos/service/delete.php", { id })
      .then(response => {
        if (response.data == 201) {
          Materialize.toast("Se ha eliminado con exito", 4000)
          getAll()
        }
      })
  }

  function getAll () {
    $http.get('src/datos/procedimientos/service/getAll.php')
    .then(response => $scope.procedimientos = response.data )
  }

  function clear () {
    $scope.data = { desc: '', id: ''}
    $('.formContainer label.active').removeClass('active')
    $('.formContainer').slideUp()
  }

  function validar () {
    const data = $scope.data
    if (data.desc === '') {
      Materialize.toast('Ingrese el procedimientos', 4000)
      $('#desc').focus()
      return false
    }
    else return true
  }
})
