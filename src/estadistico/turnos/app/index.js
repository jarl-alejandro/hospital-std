'use strict'

const turnos = angular.module('Hospital')

turnos.controller('turnosController', function ($scope, toaster, $http, $location) {
  $('select').material_select()
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

  $http.get('src/archivos/pacientes/service/getAll.php')
    .then(response => $scope.pacientes = response.data )

  $scope.handleShowForm = function handleShowForm () {
    $('.formPlus').slideDown()
  }

  $scope.handleCancel = function handleCancel () {
    $('.formPlus').slideUp()
  }
  $scope.handleSave = function handleSave () {
    if (validar()) {
      $http.post('src/estadistico/turnos/service/guardar.php', {
        paciente: $('#paciente').val(),
        doctor: $('#doctor').val(),
        fecha: $('#fecha').val(),
        horaInicio: $('#horaInicio').val(),
      }).then(response => {
        if (response.status === 201) {
          $('.formPlus').slideUp()
          Materialize.toast('Se ha guarado con exito', 4000)
        }
      })
      Materialize.toast('Guardando', 4000)
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
})
