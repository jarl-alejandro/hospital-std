'use strict'

angular.module('Hospital')
.controller('reportesAdminCtrl', function ($scope, $http, $location) {
  $scope.pacientes = []
  $scope.listPacientes = []
  $('.browser-default').select2()
  $('select').material_select()
  $('.modal').modal();
  $('.tooltipped').tooltip({delay: 50})

  $http.get('src/estadistico/reportes/service/getAll.php')
  .then(response => $scope.pacientes = response.data)

  $http.get('src/estadistico/reportes/service/getPatient.php')
  .then(response => {
    $scope.listPacientes = response.data
    console.log(response);
  })

  $scope.handleFilterByDate = () => $('#filterByDate').modal('open')
  $scope.handleFilterPatient = () => $('#filterByPatient').modal('open')
  $scope.handleFilterDoctor = () => $('#filterByDoctor').modal('open')

  $scope.handleAceptDate = () => {
    let fechaInicio = $('#fecha_inicio')
    let fechaFinal = $('#fecha_final')

    if (validFormByDate(fechaInicio, fechaFinal)) {
      $http.get(`src/estadistico/reportes/service/getByDate.php?inicio=${fechaInicio.val()}&final=${fechaFinal.val()}`)
      .then(response => $scope.pacientes = response.data)

      fechaInicio.val('')
      fechaFinal.val('')
      $('label.active').removeClass('active')
      $('#filterByDate').modal('close')
    }
  }

  $scope.handleAceptPatient = () => {
    let patient = $('#patient_selected')

    if (validarFormByPatient(patient)) {
      $http.get(`src/estadistico/reportes/service/getByPatient.php?patient=${patient.val()}`)
      .then(response => $scope.pacientes = response.data)
      patient.val('')
      $('label.active').removeClass('active')
      $('#filterByPatient').modal('close')
    }
  }

  $scope.handleAceptDoctor = () => {
    let doctor = $('#doctor_selected')
    alert(doctor.val())
    if (validarFormByDoctor(doctor)) {
      $http.get(`src/estadistico/reportes/service/getByDoctor.php?doctor=${doctor.val()}`)
      .then(response => $scope.pacientes = response.data)
      doctor.val('')
      $('label.active').removeClass('active')
      $('#filterByDoctor').modal('close')
    }
  }

  $scope.handlePrint = turno => {
    if (turno.hgc_tipo_form === '056') {
      $location.path(`/reporte/form056/${turno.hgc_paci_turno}/${turno.hgc_id_turno}`)
    }
    else if (turno.hgc_tipo_form === 'hojadev') {
      $location.path(`/reporte/hojadev/${turno.hgc_paci_turno}/${turno.hgc_id_turno}`)
    }
    else if (turno.hgc_tipo_form === 'form28A') {
      $location.path(`/reporte/form28A/${turno.hgc_paci_turno}/${turno.hgc_id_turno}`)
    }
    else if (turno.hgc_tipo_form === 'form28C') {
      $location.path(`/reporte/form28C/${turno.hgc_paci_turno}/${turno.hgc_id_turno}`)
    }
  }

  function validarFormByPatient (patient) {
    if (patient.val() === null) {
      patient.focus()
      Materialize.toast('Debe selecionar el paciente', 4000)
      return false
    }
    else return true
  }

  function validarFormByDoctor (doctor) {
    if (doctor.val() === null) {
      doctor.focus()
      Materialize.toast('Debe selecionar el doctor', 4000)
      return false
    }
    else return true
  }

  function validFormByDate (inicio, final) {
    if (inicio.val() === '') {
      inicio.focus()
      Materialize.toast('Debe ingresar la fecha de inicio', 4000)
      return false
    } else if (final.val() === '') {
      final.focus()
      Materialize.toast('Debe ingresar la fecha final', 4000)
      return false
    }
    return true
  }

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
    max: new Date(),
  })

})
