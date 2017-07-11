'use strict'

const circuito = angular.module('Hospital')

circuito.controller('circuitoController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '' }
  $scope.circuitos = []
  getAll()

  $scope.handleShowForm = () => $('#modalInstitucion').modal('open')

  $scope.handleClose = () => {
    $scope.data = { descripcion: '', visible: true, id: '' }
    $('label.active').removeClass('active')
  }

  $scope.handleSave = function () {

    if ($scope.data.descripcion.trim() === '') {
      Materialize.toast('Debe ingresar la descripcion', 4000)
      return false
    }

    $http.post('src/archivos/circuito/service/save.php', {
      id: $scope.data.id,
      descripcion: $scope.data.descripcion,
      visible: $scope.data.visible === true ? 1 : 0,
    }).then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha guardado con exito', 4000)
        $scope.data = { descripcion: '', visible: true, id: '' }
        $('label.active').removeClass('active')
        $('#modalInstitucion').modal('close')
        getAll()
      }
    })
  }

  $scope.handleDelete = (id) => {
    $http.post('src/archivos/circuito/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (circuito) => {
    $scope.data = {
      descripcion: circuito.hgc_desc_circ,
      visible: circuito.hgc_est_circ,
      id: circuito.hgc_codi_circ
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (circuito) => {
    $http.post('src/archivos/circuito/service/visible.php', {
      id: circuito.hgc_codi_circ,
      visible: circuito.hgc_est_circ === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/circuito/service/getAll.php')
      .then(response => $scope.circuitos = response.data)
  }

})
