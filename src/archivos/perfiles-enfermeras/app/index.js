'use strict'

const perfilesEnfermera = angular.module('Hospital')

perfilesEnfermera.controller('perfilEnfermerasController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '' }
  $scope.perfiles = []
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

    $http.post('src/archivos/perfiles-enfermeras/service/save.php', {
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
    $http.post('src/archivos/perfiles-enfermeras/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (perfil) => {
    $scope.data = {
      descripcion: perfil.hgc_desc_perf,
      visible: perfil.hgc_est_perf,
      id: perfil.hgc_codi_perf
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (perfil) => {
    $http.post('src/archivos/perfiles-enfermeras/service/visible.php', {
      id: perfil.hgc_codi_perf,
      visible: perfil.hgc_est_perf === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/perfiles-enfermeras/service/getAll.php')
      .then(response => $scope.perfiles = response.data)
  }

})
