'use strict'

const turnos = angular.module('Hospital')

turnos.controller('turnosController', function ($scope, $http, $location) {
  $('select').material_select()
  $('.modal').modal()

  $scope.turnos = []
  $scope.pacientes = []
  $scope.doctor = []
  $scope.servicios = []
  $scope.especialidades = []
  $scope.especialidad_name = ''
  $scope.data = {
    especialidad: '',
    servicio: '',
    fecha: '',
    horaInical: '',
    horaFinal: '',
    paciente: '',
    doctor: ''
  }
  $scope.buscador = { doctor: '', paciente: '' }

  $http.get('src/estadistico/turnos/service/getAll.php')
    .then(response => $scope.turnos = response.data)

  $http.get('src/estadistico/turnos/service/pacientes.php')
    .then(response => $scope.pacientes = response.data)

  $http.get('src/archivos/servicios/service/getAll.php')
    .then(response => $scope.servicios = response.data)

  $scope.handleShowForm = () => $('.formPlus').slideDown()
  $scope.handleCancelForm = () =>  closeTurnoForm()

  $scope.handlePaciente = function (id) {
    $scope.data.paciente = id
    $('#pacienteModal').modal('close')
  }

  $scope.handleHorario = () => {
    let horario_turno = Array.prototype.slice.call(
      document.querySelectorAll('.horario__turno')
    )
    let horaIndex = 0

    for (let i in horario_turno) {
      let item = horario_turno[i]
      if (item.checked === true && item.disabled === false) {
        horaIndex++
        $scope.data.fecha = localStorage.getItem('fecha')
        $scope.data.horaInical = item.dataset.inicio
        $scope.data.horaFinal = item.dataset.fin
        $('#modalAgendaListFecha').modal('close')
        $('.month-turno').slideUp()
        $('.days-moth').slideUp()
        return false
      }
    }
    if (horaIndex === 0){
      Materialize.toast('Debe ingresar un hora para el turno', 4000)
    }
  }

  $scope.handleDoctor = function (id) {
    $scope.data.doctor = id
    localStorage.setItem('doctor', id)
    $('#doctorModal').modal('close')

    $('#serviciosList').slideDown()
    $('#especialidadesList').slideUp()
    $('#doctorTable').slideUp()
  }

  $scope.handleSiguiente = (index) => {
    if (index === 1) {
      if ($scope.data.servicio === '') {
        Materialize.toast('Debe selecionar el servicio', 4000)
        return false
      }
      $('#serviciosList').slideUp()
      $('#especialidadesList').slideDown()

      $http.get(`src/estadistico/turnos/service/especialidades.php
        ?service=${$scope.data.servicio}`
      ).then(response => $scope.especialidades = response.data)

    } else if (index === 2) {

      if ($scope.data.especialidad === '') {
        Materialize.toast('Debe selecionar la especialidad', 4000)
        return false
      }
      const select = document.querySelector('#especialidad')
      $scope.especialidad_name = select.children[select.selectedIndex].innerText.trim()

      $http.get(`src/estadistico/turnos/service/doctor.php
        ?especialidad=${$scope.data.especialidad}`
      ).then(response => $scope.doctor = response.data)

      $('#especialidadesList').slideUp()
      $('#doctorTable').slideDown()
    }
  }

  $scope.handleAtras = (index) => {
    if (index === 1) {
      $('#serviciosList').slideDown()
      $('#especialidadesList').slideUp()
    } else if (index === 2) {
      $('#especialidadesList').slideDown()
      $('#doctorTable').slideUp()
    }
  }

  $scope.handleCancel = () => {
    $('#serviciosList').slideDown()
    $('#especialidadesList').slideUp()
    $('#doctorTable').slideUp()
  }

  $scope.handleSave = function handleSave () {
    if (validar()) {

      $http.post('src/estadistico/turnos/service/save.php', {
        paciente: $scope.data.paciente,
        doctor: $scope.data.doctor,
        fecha: $scope.data.fecha,
        horaInicio: $scope.data.horaInical,
        horaFin: $scope.data.horaFinal,
        id: ''
      }).then(response => {
        if (response.data === "201") {
          localStorage.setItem('fecha', '')
          localStorage.setItem('doctor', '')
          closeTurnoForm()
          Materialize.toast('Debe activar el turno', 4000)
          $("label.active").removeClass('active')
          $('#paciente').val('')
          $('#fecha').val('')
          $('#doctor').val('')
          $('#horaInicio').val('')
          $http.get('src/estadistico/turnos/service/getAll.php')
            .then(response => $scope.turnos = response.data )
        }
      })
    }
  }

  function closeTurnoForm () {
    $scope.data = {
      especialidad: '',
      servicio: '',
      fecha: '',
      horaInical: '',
      horaFinal: '',
      paciente: '',
      doctor: ''
    }
    $('.formPlus').slideUp()
  }

  function validar () {
    if ($('#paciente').val() === '') {
      Materialize.toast("Ingresa el paciente", 4000)
      $('#paciente').focus()
      return false
    }
    if ($('#doctor').val() === '') {
      Materialize.toast("Ingresa el doctor", 4000)
      $('#doctor').focus()
      return false
    }
    if ($('#fecha').val() === '') {
      Materialize.toast("Ingresa la fecha", 4000)
      $('#fecha').focus()
      return false
    }
    if ($('#horaInicio').val() === '') {
      Materialize.toast("Ingrese la hora de inicio ", 4000)
      $('#horaInicio').focus()
      return false
    } else return true
  }

  $scope.handleFecha = () => $('.month-turno').slideDown()
})
