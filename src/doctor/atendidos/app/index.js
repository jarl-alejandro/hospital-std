'use strict'

const atendidos = angular.module('Hospital')

atendidos.controller('atendidosController', function ($scope, $http, $location) {
  $('.browser-default').select2()

  $scope.pacientes = []
  $scope.pacientesFilter = []
  $scope.data = {
    paciente: '',
    inicio: '',
    final: ''
  }
  

  $http.get('src/doctor/atendidos/service/getAll.php')
  .then(response => $scope.pacientes = response.data)

  $http.get('src/doctor/atendidos/service/pacientes.php')
  .then(response => {
    $scope.pacientesFilter = response.data
    $('.browser-default').select2()
  })

  $scope.sacar_edad = (paciente) => {
    const nacimiento = paciente.hgc_fecn_pacie;
    const consulta = paciente.hgc_fecha_consulta;
    const duracion = duration(new Date(nacimiento), new Date(consulta));
    return `${duracion.years} años ${duracion.months} meses`;
  }

  $scope.onAceptPaciente = () => {
    if (!$scope.data.paciente) {
      Materialize.toast('Ingrese el paciente', 4000)
      return false
    }

    $http.get(`src/doctor/atendidos/service/filterPacient.php?pacientes=${$scope.data.paciente}`)
    .then(response => {
      $scope.pacientes = response.data
      $scope.onCancelPaciente()
      setTimeout(() => {
        $scope.onCancelPaciente()
      }, 1000)
    })
  }

  $scope.onAlarmAcept = () => {
    let inicio = $scope.data.inicio
    let final = $scope.data.final

    if (!inicio) {
      Materialize.toast('Ingrese la fecha de inicio', 4000)
      $('#fecha_inicio').focus()
      return false
    }
    if (!final) {
      Materialize.toast('Ingrese la fecha de final', 4000)
      $('#fecha_final').focus()
      return false
    }
    if (inicio > final) {
      Materialize.toast('Ingrese la fecha de correcta', 4000)
      $('#fecha_final').focus()
      return false
    }

    $http.get(`src/doctor/atendidos/service/filter_fecha.php?inicio=${inicio}&final=${final}`)
    .then(response => {
      $scope.pacientes = response.data
      $scope.onAlarmClose()
    })
  }

  $scope.onAlarmClose = () => {
    $('#alarmas-modal').modal('close')
    $scope.data.inicio = ''
    $scope.data.final = ''
  }

  $scope.onCancelPaciente = () => {
    $('#pacientes-modal').modal('close')
    $scope.data.paciente = ''
    $('.browser-default').select2()
  }

  $scope.handlePrint = turno => {
    window.open (`src/doctor/atendidos/reporte/form28A.php?turno=${turno}`,
      "_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=60, width=1200, height=600")
  }

  $scope.filter_alarm = () => {
    $('#alarmas-modal').modal('open')
  }
  $scope.filter_pacient = () => {
    $('#pacientes-modal').modal('open')
  }

  $scope.handleSee = turno => {
    redirect_form(turno, 'get')
  }

  $scope.handleEdit = turno => {
    redirect_form(turno, 'edit')
  }

  function redirect_form (turno, action) {
    if (turno.hgc_tipo_form === '056') {
      $location.path(`/form056/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/${action}`)
    }
    else if (turno.hgc_tipo_form === 'hojadev') {
      $location.path(`/hoja-devolucion/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/${action}`)
    }
    else if (turno.hgc_tipo_form === 'form28A') {
      $location.path(`/form28A/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/${action}`)
    }
    else if (turno.hgc_tipo_form === 'form28C') {
      $location.path(`/form28C/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/${action}`)
    }
    else if (turno.hgc_tipo_form === 'mayor') {
      $location.path(`/adulto-mayor/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/${action}`)
    }
    else if (turno.hgc_tipo_form === 'may65') {
      $location.path(`/adulto-mayor-65/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/${action}`)
    }
    else Materialize.toast('Esta en proceso...', 4000)
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
