'use strict'

const actividad = angular.module('Hospital')

actividad.controller('actividadController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '' }
  $scope.actividades = []
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

    $http.post('src/archivos/actividad/service/save.php', {
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
    $http.post('src/archivos/actividad/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (actividad) => {
    $scope.data = {
      descripcion: actividad.hgc_desc_acti,
      visible: actividad.hgc_est_acti,
      id: actividad.hgc_codi_acti
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (actividad) => {
    $http.post('src/archivos/actividad/service/visible.php', {
      id: actividad.hgc_codi_acti,
      visible: actividad.hgc_est_acti === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/actividad/service/getAll.php')
      .then(response => $scope.actividades = response.data)
  }

})
