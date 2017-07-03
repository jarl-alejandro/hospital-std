'use strict'


const pacientes = angular.module('Hospital')

pacientes.controller('pacientesController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $scope.data = { id: '', cedula: '', nombre: '', apellido: '', fechaNac: '', dni: '', telefono: '', ceulular: '', direccion: '', email: '', sexo: '', profesion: ''}
  $scope.pacientes = []
  $scope.generos = []

  $http.get('src/datos/generos/service/getAll.php')
    .then(response => $scope.generos = response.data )

  $http.get('src/archivos/pacientes/service/getAll.php')
    .then(response => $scope.pacientes = response.data )

  $scope.handleShowForm = function (e) {
    $('.formContainer').slideDown()
  }
  $scope.handleCancel = function (e) {
    $scope.data = { id: '', cedula: '', nombre: '', apellido: '', fechaNac: '', dni: '', telefono: '', ceulular: '', direccion: '', email: '', sexo: '', profesion: ''}
    $('.formContainer').slideUp()
  }
  $scope.handleSave = function (e) {
    if ($scope.data.cedula == "") {
      Materialize.toast("Ingresa la cedula", 4000)
      return false
    }
    if ($scope.data.nombre == "") {
      Materialize.toast("Ingresa el nombre", 4000)
      return false
    }
    if ($scope.data.apellido == "") {
      Materialize.toast("Ingresa el apellido", 4000)
      return false
    }
    if ($scope.data.fechaNac == "") {
      Materialize.toast("Ingresa la fecha de nacimiento", 4000)
      return false
    }
    if ($scope.data.dni == "") {
      Materialize.toast("Ingresa el dni", 4000)
      return false
    }
    if ($scope.data.telefono == "") {
      Materialize.toast("Ingresa el telefono", 4000)
      return false
    }
    if ($scope.data.ceulular == "") {
      Materialize.toast("Ingresa el ceulular", 4000)
      return false
    }
    if ($scope.data.direccion == "") {
      Materialize.toast("Ingresa la direccion", 4000)
      return false
    }
    if ($scope.data.email == "") {
      Materialize.toast("Ingresa el email", 4000)
      return false
    }
    if ($scope.data.sexo == "") {
      Materialize.toast("Ingresa el genero", 4000)
      return false
    }

    $http.post("src/archivos/pacientes/service/save.php", { 'pacientes': $scope.data })
      .then(response => {
        console.log(response)
        if (response.data == 201) {
          Materialize.toast("Se ha guardado con exito", 4000)
          $scope.data = { profesion: '', id: '' }
          $('.formContainer').slideUp()
          $http.get('src/archivos/pacientes/service/getAll.php')
            .then(response => $scope.pacientes = response.data)
        }
      })
  }

  $scope.get = function (paciente) {
    $scope.data = {
      id: paciente.hgc_codi_pacie,
      cedula: paciente.hgc_cedu_pacie,
      nombre: paciente.hgc_nom_pacie,
      apellido: paciente.hgc_ape_pacie,
      fechaNac: new Date(paciente.hgc_fecn_pacie),
      dni: paciente.hgc_dni_pacie,
      telefono: paciente.hgc_tele_pacie,
      ceulular: paciente.hgc_celu_pacie,
      direccion: paciente.hgc_direc_pacie,
      email: paciente.hgc_emai_pacie,
      sexo: paciente.hgc_sexo_pacie
    }
    $('.formContainer').slideDown()
  }

  $scope.delete = function (id) {
    $http.post("src/archivos/pacientes/service/delete.php", { 'id':id })
      .then(response => {
        if (response.data == 201) {
          Materialize.toast("Se ha eliminado con exito", 4000)
          $http.get('src/archivos/pacientes/service/getAll.php')
            .then(response => $scope.pacientes = response.data)
        }
      })
  }
})
