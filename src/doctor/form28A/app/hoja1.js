'use strict'

const hoja1 = angular.module('Hospital')

hoja1.controller('hoja1Conroller', function ($scope, $http) {
  $scope.ant_maternos = []
  $scope.ant_familiares = []
  $scope.ant_prenatales = []
  $scope.nacimientos = []
  $scope.recien_nacidos = []
  $scope.abstre = {
    embarazo: false,
    gemelar: false
  }

  $http.get('src/doctor/form28A/service/items.php?tipo=3')
  .then(response => $scope.ant_maternos = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=4')
  .then(response => $scope.ant_familiares = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=5')
  .then(response => $scope.ant_prenatales = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=6')
  .then(response => $scope.nacimientos = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=7')
  .then(response => $scope.recien_nacidos = response.data)

  $scope.handleNext = () => {
    $('#hoja__1').slideUp()
    $('#hoja__2').slideDown()
  }

  $('.datepicker').pickadate({
   selectMonths: true,
   selectYears: 15,
   clear: 'Limpiar',
   close: 'OK',
   today: 'Hoy',
   format: 'dd-mm-yyyy',
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
