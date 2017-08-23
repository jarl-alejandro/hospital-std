'use strict'

angular.module('Hospital')
.controller('HojaDevolucionCtrl', function ($scope, $http, $stateParams) {
  const fecha = new Date()

  $scope.paciente = {}
  $scope.empresa = {}

  $scope.hoy = fecha.getDate() < 10 ? '0'+fecha.getDate() : fecha.getDate()
  $scope.month = fecha.getMonth() < 10 ? '0'+(fecha.getMonth() + 1) : fecha.getMonth() + 1
  $scope.year = fecha.getFullYear().toString().split('')

  $scope.hoy = $scope.hoy.toString().split('')
  $scope.month = $scope.month.toString().split('')

  $http.get(`src/doctor/form056/service/paciente.php?id=${$stateParams.id}`)
  .then(response => {
    $scope.paciente = response.data.paciente
    $scope.apellidos = $scope.paciente.hgc_ape_pacie.split(' ')

    const edad = duration(fecha, new Date($scope.paciente.hgc_fecn_pacie))
    $scope.ageYear = edad.years < 10 ? '0'+ edad.years : edad.years
    $scope.ageYear = $scope.ageYear.toString().split('')
    $scope.ageMonth = edad.months < 10 ? '0' + edad.months : edad.months
    $scope.ageMonth = $scope.ageMonth.toString().split('')

    response.data.sexo.hgc_desc_genero === 'Mujer' ? $scope.urologia = true : $scope.urologia = false
  })

  $http.get(`src/doctor/hoja-devolucion/service/consultas.php?id=${$stateParams.id}`)
  .then(response => $scope.contlasN = response.data)

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) $scope.empresa = response.data.empresa
  })

  $http.get(`src/doctor/form056/service/signos.php?id=${$stateParams.turno}`)
  .then(response => {
    $scope.signos = response.data
    const edadPaciente = duration(new Date($scope.paciente.hgc_fecn_pacie), new Date($scope.signos.hgc_fecha_sigvit))

    $scope.cetilPesoEdad = `${$scope.signos.hgc_peso_sigvit} / ${edadPaciente.years}`
    $scope.deTallaEdad = `${$scope.signos.hgc_talla_sigvit} / ${edadPaciente.years}`
  })

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

  $scope.handleDateVisit = () => $('.month-turno').slideDown()

})
