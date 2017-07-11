'use strict'

const tipologia = angular.module('Hospital')

tipologia.controller('tipologiaController', function ($scope, $http) {
  $scope.data = { descripcion: '', visible: true, id: '', nivelInstitucion: '' }
  $scope.tipologias = []
  $scope.niveles = []
  getAll()

  $http.get('src/archivos/tipologia/service/nivel-institucion.php')
    .then(response => $scope.niveles = response.data)

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
    if ($scope.data.nivelInstitucion === '') {
      Materialize.toast('Debe selecionar el nivel de institucion', 4000)
      return false
    }

    $http.post('src/archivos/tipologia/service/save.php', {
      id: $scope.data.id,
      descripcion: $scope.data.descripcion,
      visible: $scope.data.visible === true ? 1 : 0,
      nivelInstitucion: $scope.data.nivelInstitucion
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
    $http.post('src/archivos/tipologia/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleEdit = (tipologia) => {
    $scope.data = {
      descripcion: tipologia.hgc_desc_tipo,
      visible: tipologia.hgc_est_tipo,
      id: tipologia.hgc_codi_tipo,
      nivelInstitucion: tipologia.hgc_nivel_tipo
    }
    $('.input-field label').addClass('active')
    $('#modalInstitucion').modal('open')
  }

  $scope.handleVisible = (tipologia) => {
    $http.post('src/archivos/tipologia/service/visible.php', {
      id: tipologia.hgc_codi_tipo,
      visible: tipologia.hgc_est_tipo === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  function getAll () {
    $http.get('src/archivos/tipologia/service/getAll.php')
      .then(response => $scope.tipologias = response.data)
  }

})
