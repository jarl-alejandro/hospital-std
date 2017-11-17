'use strict'

const pacientesAtendidos = angular.module('Hospital');

pacientesAtendidos.controller('pacAtenController', function ($scope, $http) {
  $scope.pacientes = []
  $('.tooltipped').tooltip({delay: 50})

  $http.get('src/enfermera/pacientes-atendidos/service/get.php')
  .then(response => $scope.pacientes = response.data)

  $scope.print_report = () => {
    alert('print....!!!')
  }

  $scope.modalAlarmIn = () => {
    $('#date-modal').modal('open')
  }
  $scope.modalDayIn = () => {
    $('#day-modal').modal('open')
  }
  $scope.modalMonthsIn = () => {
    $('#months-modal').modal('open')
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
    min: new Date(),
  })

})
