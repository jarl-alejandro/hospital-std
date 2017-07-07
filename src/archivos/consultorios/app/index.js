'use strict'

const consultorio = angular.module('Hospital')

consultorio.controller('consultorioController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '' }
  $scope.consultorios = []
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

    $http.post('src/archivos/consultorios/service/save.php', {
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
    $http.post('src/archivos/consultorios/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (consultorio) => {
    $scope.data = {
      descripcion: consultorio.hgc_desc_cons,
      visible: consultorio.hgc_est_cons,
      id: consultorio.hgc_codi_cons
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (consultorio) => {
    $http.post('src/archivos/consultorios/service/visible.php', {
      id: consultorio.hgc_codi_cons,
      visible: consultorio.hgc_est_cons === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/consultorios/service/getAll.php')
      .then(response => $scope.consultorios = response.data)
  }

})
