'use strict'

const especialidad = angular.module('Hospital')

especialidad.controller('especialidadController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '', servicio: '' }
  $scope.especialidades = []
  $scope.servicios = []
  getAll()

  $http.get('src/archivos/servicios/service/getAll.php')
    .then(response => $scope.servicios = response.data)

  $scope.handleShowForm = () => $('#modalInstitucion').modal('open')

  $scope.handleClose = () => {
    $scope.data = { descripcion: '', visible: true, id: '', servicio: '' }
    $('label.active').removeClass('active')
  }

  $scope.handleSave = function () {
    if ($scope.data.descripcion.trim() === '') {
      Materialize.toast('Debe ingresar la descripcion', 4000)
      return false
    }
    if ($scope.data.servicio.trim() === '') {
      Materialize.toast('Debe ingresar el servicio', 4000)
      return false
    }

    $http.post('src/archivos/especialidades/service/save.php', {
      id: $scope.data.id,
      descripcion: $scope.data.descripcion,
      visible: $scope.data.visible === true ? 1 : 0,
      servicio: $scope.data.servicio
    }).then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha guardado con exito', 4000)
        $scope.data = { descripcion: '', visible: true, id: '', servicio: '' }
        $('label.active').removeClass('active')
        $('#modalInstitucion').modal('close')
        getAll()
      }
    })
  }

  $scope.handleDelete = (id) => {
    $http.post('src/archivos/especialidades/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (especialidad) => {
    $scope.data = {
      descripcion: especialidad.hgc_desc_espe,
      visible: especialidad.hgc_est_espe,
      id: especialidad.hgc_codi_espe,
      servicio: especialidad.hgc_serv_espe
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (especialidad) => {
    $http.post('src/archivos/especialidades/service/visible.php', {
      id: especialidad.hgc_codi_espe,
      visible: especialidad.hgc_est_espe === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/especialidades/service/getAll.php')
      .then(response => $scope.especialidades = response.data)
  }

})
