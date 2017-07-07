'use strict'

const horarios = angular.module('Hospital')

horarios.controller('horariosController', function ($scope, $http) {
  $scope.horarios = []
  $scope.data = { entrada: '', salida: '', visible: true, id: '' }
  getAll()

  $scope.handleShowForm = () => $('#modalInstitucion').modal('open')
  $scope.handleClose = () => close()

  $scope.handleSave = () => {
    if (validar()) {
      $http.post('src/archivos/horarios/service/save.php', {
        entrada: $('#entrada').val(),
        salida: $('#salida').val(),
        visible: $scope.data.visible === true ? 1 : 0,
        id: $scope.data.id
      }).then(response => {
        console.log(response)
        if (response.data === '201') {
          Materialize.toast('Se ha gurdado con exito', 4000)
          $('#modalInstitucion').modal('close')
          close()
          getAll()
        }
      })
    }
  }

  $scope.handleDelete = (id) => {
    $http.post('src/archivos/horarios/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        Materialize.toast('Se ha eliminado con exito', 4000)
        getAll()
      }

    })
  }

  $scope.handleVisible = (horario) => {
    $http.post('src/archivos/horarios/service/visible.php', {
      id: horario.hgc_codi_hora,
      visible: horario.hgc_est_hora === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  $scope.handleEdit = (horario) => {
    $('#entrada').val(horario.hgc_ent_hora)
    $('#salida').val(horario.hgc_sal_hora)
    $scope.data = { visible: horario.hgc_est_hora, id: horario.hgc_codi_hora }
    $('#modalInstitucion').modal('open')
  }

  function getAll () {
    $http.get('src/archivos/horarios/service/getAll.php')
      .then(response => $scope.horarios = response.data)
  }

  function validar () {
    const entrada = $('#entrada')
    const salida = $('#salida')

    if (entrada.val().trim() === '' || entrada.val().trim() === '00:00') {
      entrada.focus()
      Materialize.toast('Ingrese la hora de entrada', 4000)
      return false
    }
    if (salida.val().trim() === '' || salida.val().trim() === '00:00') {
      salida.focus()
      Materialize.toast('Ingrese la hora de salida', 4000)
      return false
    }
    if (entrada.val().trim() > salida.val().trim()) {
      salida.focus()
      Materialize.toast('La hora de salida no puede ser menor que la hora entrada', 4000)
      return false
    }
    else return true
  }

  function close () {
    $('#entrada').val('')
    $('#salida').val('')
    $scope.data = { entrada: '', salida: '', visible: true, id: '' }
  }
})
