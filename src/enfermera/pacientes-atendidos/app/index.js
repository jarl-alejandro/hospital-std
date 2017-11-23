'use strict'

const pacientesAtendidos = angular.module('Hospital');

pacientesAtendidos.controller('pacAtenController', function ($scope, $http) {
  $scope.pacientes = []
  $scope.dates = { desde: '', hasta: '' }
  $scope.fechaReporte = $scope.dates
  $scope.typeReport = ''
  $('.tooltipped').tooltip({delay: 50})

  $http.get('src/enfermera/pacientes-atendidos/service/get.php')
  .then(response => {
    console.log(response)
    $scope.pacientes = response.data;
  })

  $scope.modalAlarmIn = () => {
    $('#date-modal').modal('open')
  }
  $scope.modalMonthsIn = () => {
    $('#months-modal').modal('open')
  }

  $scope.modalDayIn = () => {
    $scope.typeReport = 'day'
    
    $http.get(`src/enfermera/pacientes-atendidos/service/filter_day.php`)
    .then(response => $scope.pacientes = response.data)
  }

  $scope.filterGeneral = () => {
    $scope.typeReport = ''

    $http.get('src/enfermera/pacientes-atendidos/service/get.php')
    .then(response => $scope.pacientes = response.data)
  }

  $scope.filter_close = () => {
    $('#months-modal').modal('close')
  }

  $scope.filter_months = (month) => {
    $scope.mes = month
    $http.get(`src/enfermera/pacientes-atendidos/service/filter_month.php?month=${month}`)
    .then(response => {
      $scope.typeReport = 'mes'
      $scope.pacientes = response.data
      $scope.filter_close()
    })
  }

  $scope.closeFilterDate = () => {
    $('#date-modal').modal('close')
    $scope.fechaReporte = $scope.dates
    $scope.dates = { desde: '', hasta: '' }    
  }

  $scope.printAtendidos = () => {
    let url = ''

    if ($scope.typeReport === 'day') {
      url = `src/enfermera/pacientes-atendidos/reporte/atendidos.php?type=day`
    }
    if ($scope.typeReport === 'mes') {
      url = `src/enfermera/pacientes-atendidos/reporte/atendidos.php?type=mes&month=${$scope.mes}`
    }
    if ($scope.typeReport === 'fecha') {
      const dates = $scope.fechaReporte
      url = `src/enfermera/pacientes-atendidos/reporte/atendidos.php?type=fecha&desde=${dates.desde}&hasta=${dates.hasta}`
    }
    else {
      url = `src/enfermera/pacientes-atendidos/reporte/atendidos.php`
    }

    window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=60, width=1200, height=" + "600")
  }

  $scope.onFilterByDate = () => {
    const dates = $scope.dates
    $scope.typeReport = 'fecha'
    $scope.fechaReporte = $scope.dates

    if (validFormDates()) {
      $http.get(`src/enfermera/pacientes-atendidos/service/filter_dates.php
        ?desde=${dates.desde}&hasta=${dates.hasta}`
      )
      .then(response => {
        $scope.pacientes = response.data
        $scope.closeFilterDate()
      })
    }
  }

  function validFormDates () {
    const dates = $scope.dates
    
    if (!dates.desde) {
      Materialize.toast('Ingrese la fecha de inicio de reporte', 4000)
      return false
    }
    if (!dates.hasta) {
      Materialize.toast('Ingrese la fecha de fin de reporte', 4000)
      return false
    }
    if (dates.desde >= dates.hasta) {
      Materialize.toast('Ingrese una fecha correcta', 4000)
      return false
    }
    else return true
  }

  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15,
    clear: 'Limpiar',
    close: 'OK',
    today: 'Hoy',
    format: 'yyyy/mm/dd',
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
