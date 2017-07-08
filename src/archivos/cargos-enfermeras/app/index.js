'use strict'

const cargos = angular.module('Hospital')

cargos.controller('cargosController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '' }
  $scope.cargos = []
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

    $http.post('src/archivos/cargos-enfermeras/service/save.php', {
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
    $http.post('src/archivos/cargos-enfermeras/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (cargo) => {
    $scope.data = {
      descripcion: cargo.hgc_desc_carg,
      visible: cargo.hgc_est_carg,
      id: cargo.hgc_codi_carg
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (cargo) => {
    $http.post('src/archivos/cargos-enfermeras/service/visible.php', {
      id: cargo.hgc_codi_carg,
      visible: cargo.hgc_est_carg === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/cargos-enfermeras/service/getAll.php')
      .then(response => $scope.cargos = response.data)
  }

})
