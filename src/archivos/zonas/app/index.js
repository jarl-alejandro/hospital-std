'use strict'

const zonas = angular.module('Hospital')

zonas.controller('zonasController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '' }
  $scope.zonas = []
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

    $http.post('src/archivos/zonas/service/save.php', {
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
    $http.post('src/archivos/zonas/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (zona) => {
    $scope.data = {
      descripcion: zona.hgc_desc_zona,
      visible: zona.hgc_est_zona,
      id: zona.hgc_codi_zona
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (zona) => {
    $http.post('src/archivos/zonas/service/visible.php', {
      id: zona.hgc_codi_zona,
      visible: zona.hgc_est_zona === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/zonas/service/getAll.php')
      .then(response => $scope.zonas = response.data)
  }

})
