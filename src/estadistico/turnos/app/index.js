'use strict'

const turnos = angular.module('Hospital')

turnos.controller('turnosController', function ($scope, $http, $location) {
  $('select').material_select()
  $('.modal').modal()

  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15,
    clear: 'Limpiar',
    close: 'OK',
    today: 'Hoy',
    format: 'dd/mm/yyyy',
    monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dicembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    weekdaysLetter: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
    labelMonthNext: 'Siguiente mes',
    labelMonthPrev: 'Mes Anterior',
    labelMonthSelect: 'Selecione el mes',
    labelYearSelect: 'Selecione el año',
    min: new Date(),
  })
  $('.timepicker').pickatime({
    default: 'now',
    fromnow: 0,
    twelvehour: false,
    donetext: 'OK',
    cleartext: 'Limpiar',
    canceltext: 'Cancelar',
    autoclose: false,
    ampmclickable: true,
    aftershow: function(){}
  })

  $scope.turnos = []
  $scope.pacientes = []
  $scope.doctor = []
  $scope.data = {}
  $scope.buscador = { doctor: '', paciente: '' }

  $http.get('src/estadistico/turnos/service/getAll.php')
    .then(response => $scope.turnos = response.data )

  $http.get('src/estadistico/turnos/service/pacientes.php')
    .then(response => $scope.pacientes = response.data )

  $http.get('src/estadistico/turnos/service/doctor.php')
    .then(response => $scope.doctor = response.data )

  $scope.handleShowForm = function handleShowForm () {
    $('.formPlus').slideDown()
  }

  $scope.handleCancel = function handleCancel () {
    $('.formPlus').slideUp()
  }

  $scope.handlePaciente = function (id) {
    $scope.data.paciente = id
  }

  $scope.handleDoctor = function (id) {
    $scope.data.doctor = id
  }

  $scope.handleSave = function handleSave () {
    if (validar()) {
      const parametros = $('#fecha').val().split('/')
      const horaParam = $('#horaInicio').val().split(':')
      const fecha2 = new Date(parametros[2] , parametros[1]-1 , parametros[0], horaParam[0], parseInt(horaParam[1])+20)

      $http.post('src/estadistico/turnos/service/save.php', {
        paciente: $('#paciente').val(),
        doctor: $('#doctor').val(),
        fecha: $('#fecha').val(),
        horaInicio: $('#horaInicio').val(),
        horaFin: `${fecha2.getHours()}:${fecha2.getMinutes()}`,
        id: ''
      }).then(response => {
        if (response.data === "201") {
          $('.formPlus').slideUp()
          Materialize.toast('Se ha guarado con exito', 4000)
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

  // Inicio de paginador

  // Fin del paginador
})
