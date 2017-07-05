'use strict'

const servicios = angular.module('Hospital')

servicios.controller('serviciosController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '' }
  $scope.servicios = []
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

    $http.post('src/archivos/servicios/service/save.php', {
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
    $http.post('src/archivos/servicios/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (servicio) => {
    $scope.data = {
      descripcion: servicio.hgc_desc_serv,
      visible: servicio.hgc_est_serv,
      id: servicio.hgc_codi_serv
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (servicio) => {
    $http.post('src/archivos/servicios/service/visible.php', {
      id: servicio.hgc_codi_serv,
      visible: servicio.hgc_est_serv === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/servicios/service/getAll.php')
      .then(response => $scope.servicios = response.data)
  }

})
