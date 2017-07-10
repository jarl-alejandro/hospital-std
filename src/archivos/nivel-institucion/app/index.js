'use strict'

const nivelInstitucion = angular.module('Hospital')

nivelInstitucion.controller('nivelInstitucionController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '' }
  $scope.instituciones = []
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

    $http.post('src/archivos/nivel-institucion/service/save.php', {
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
    $http.post('src/archivos/nivel-institucion/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (institucion) => {
    $scope.data = {
      descripcion: institucion.hgc_desc_inst,
      visible: institucion.hgc_est_inst,
      id: institucion.hgc_codi_inst
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (institucion) => {
    $http.post('src/archivos/nivel-institucion/service/visible.php', {
      id: institucion.hgc_codi_inst,
      visible: institucion.hgc_est_inst === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/nivel-institucion/service/getAll.php')
      .then(response => {
        console.log(response)
        $scope.instituciones = response.data
      })
  }

})
