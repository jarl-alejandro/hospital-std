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
    if (validar()) {
      $('#hoja__1').slideUp()
      $('#hoja__2').slideDown()
    }
  }

  function validar () {
    const gestasPrevias = $('#gestas_previas')
    const abortos = $('#abortos')
    const partos = $('#partos')
    const partosVaginales = $('#partos__vaginales')
    const cesarias = $('#cesarias')
    const nacidoVivos = $('#nacido_vivos')
    const nacidoMuerto = $('#nacido_muerto')
    const hijosVivos = $('#hijos_vivos')
    const muerto7menor = $('#muerto7menor')
    const muerto7mayor = $('#muerto7mayor')
    const totalPartos = parseInt(abortos.val()) + parseInt(partos.val())
    const totalCesaria = parseInt(partosVaginales.val()) + parseInt(cesarias.val())
    const nacidosVivosMu = parseInt(nacidoVivos.val()) + parseInt(nacidoMuerto.val())
    const lifeDied = parseInt(muerto7mayor.val()) + parseInt(muerto7menor.val()) + parseInt(hijosVivos.val())

    const menorChecked = document.querySelector('#menor1').checked
    const gemelarChecked = document.querySelector('#gemelar_previo').checked

    if (menorChecked === true) {
      if ($('#fecha_embarazoAnt').val().trim() === '') {
        Materialize.toast('Ingrese la fecha', 4000)
        $('#fecha_embarazoAnt').focus()
        return false
      }
      else if (gemelarChecked === false) {
        return true
      }
    }
    if (gemelarChecked === true) {
      if (gestasPrevias.val().trim() === '') {
        Materialize.toast('Ingrese la gestas previas', 4000)
        gestasPrevias.focus()
        return false
      }
      if (abortos.val().trim() === '') {
        Materialize.toast('Ingrese los abortos', 4000)
        abortos.focus()
        return false
      }
      if (partos.val().trim() === '') {
        Materialize.toast('Ingrese los partos', 4000)
        partos.focus()
        return false
      }
      if (totalPartos != gestasPrevias.val()) {
        Materialize.toast('No coindicen los partos que ha nacido', 4000)
        partos.focus()
        return false
      }
      if (partosVaginales.val() === '') {
        Materialize.toast('Ingrese los partos vaginales', 4000)
        partosVaginales.focus()
        return false
      }
      if (cesarias.val() === '') {
        Materialize.toast('Ingrese las cesarias', 4000)
        cesarias.focus()
        return false
      }
      if (totalCesaria != partos.val()) {
        Materialize.toast('No coinciden los partos', 4000)
        cesarias.focus()
        return false
      }
      if (nacidoVivos.val() === '') {
        Materialize.toast('Ingrese los hijos nacidos vivos', 4000)
        nacidoVivos.focus()
        return false
      }
      if (nacidoMuerto.val() === '') {
        Materialize.toast('Ingrese los hijos nacidos muertos', 4000)
        nacidoMuerto.focus()
        return false
      }
      if (nacidosVivosMu != totalCesaria) {
        Materialize.toast('No coinciden los hijo', 4000)
        nacidoVivos.focus()
        return false
      }
      if (hijosVivos.val() === '') {
        Materialize.toast('Ingrese los hijos vivos', 4000)
        hijosVivos.focus()
        return false
      }
      if (muerto7menor.val() === '') {
        Materialize.toast('Ingrese los hijos muertos menor a 7 dias', 4000)
        muerto7menor.focus()
        return false
      }
      if (muerto7mayor.val() === '') {
        Materialize.toast('Ingrese los hijos muertos menor a 7 dias', 4000)
        muerto7mayor.focus()
        return false
      }
      if (nacidoVivos.val() != lifeDied) {
        Materialize.toast('No coinciden los hijo', 4000)
        muerto7mayor.focus()
        return false
      }
      else if (menorChecked === false) return true
      else return true
    }

    if (menorChecked === false && gemelarChecked === false) {
      return true
    }
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


hoja1.controller('signosFormController', function ($scope, $http, $stateParams) {
  $scope.signos = {}
  const turno = $stateParams.turno

  $http.get(`src/doctor/form28A/service/signosVitales.php?turno=${turno}`)
  .then(response => $scope.signos = response.data)
})
