'use strict'

const distrito = angular.module('Hospital')

distrito.controller('distritoController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '' }
  $scope.distritos = []
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

    $http.post('src/archivos/distrito/service/save.php', {
      id: $scope.data.id,
      descripcion: $scope.data.descripcion,
      visible: $scope.data.visible === true ? 1 : 0,
    }).then(response => {
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
    $http.post('src/archivos/distrito/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (distrito) => {
    $scope.data = {
      descripcion: distrito.hgc_desc_dist,
      visible: distrito.hgc_est_dist,
      id: distrito.hgc_codi_dist
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (distrito) => {
    $http.post('src/archivos/distrito/service/visible.php', {
      id: distrito.hgc_codi_dist,
      visible: distrito.hgc_est_dist === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/distrito/service/getAll.php')
      .then(response => $scope.distritos = response.data)
  }

})
