'use strict'

angular.module('Hospital')
.controller('redacaCtrl', function ($scope, $http) {
  $('.browser-default').select2()

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
    max: new Date()
  });

  $scope.byDate = () => {
    $('.Redaca-fecha').slideDown()
    $('.mask').show()
  }

  $scope.byYear = () => {
    $('.mask').show()
    $('.Redaca-anual').slideDown()
  }

  $scope.byMonth = () =>  {
    $('.mask').show()
    $('.Redaca-month').slideDown()
  }

  $scope.handleMask = () => {
    $('.Redaca-fecha').slideUp()
    $('.mask').hide()
    $('#inicio').val('')
    $('#hasta').val('')
  }

  $scope.handleCloseYear = () => {
    $('.mask').hide()
    $('.Redaca-anual').slideUp()
    $('#year').val('')
  }

  $scope.handleSaveYear = () => {
    if (validarYear()) {
      let year = $('#year').val()
      document.location = `year.php?year=${year}`
      $scope.handleCloseYear()
    }
  }

  $scope.handleCloseMonth = () => {
    $('.mask').hide()
    $('.Redaca-month').slideUp()
    $('#month').val('')
  }

  $scope.handleSaveMonth = () => {
    if (validarMonth()) {
      let month = $('#month').val()
      document.location = `month.php?month=${month}`
      $scope.handleCloseMonth()
    }
  }

  $scope.handleSave = () => {
    if (validPassword()) {
      let desde = $('#inicio').val()
      let hasta = $('#hasta').val()
      document.location = `fecha.php?desde=${desde}&hasta=${hasta}`
      $scope.handleMask()
    }
  }

  function validPassword () {
    let inicio = $('#inicio')
    let hasta = $('#hasta')

    if (!inicio.val().trim()) {
      Materialize.toast('Ingrese la fecha desde donde desea buscar', 4000)
      inicio.focus()
      return false
    }
    if (!hasta.val().trim()) {
      Materialize.toast('Ingrese la fecha hasta donde desea buscar', 4000)
      hasta.focus()
      return false
    }
    if (inicio.val().trim() >= hasta.val().trim()) {
      Materialize.toast('La fecha que ingreso es incorrecta', 4000)
      hasta.focus()
      return false
    }
    else return true
  }

  function validarYear () {
    let year = $('#year')

    if (!year.val().trim()) {
      Materialize.toast('Ingrese el año', 4000)
      $('#year').focus()
      return false
    }
    if (year.val().trim().length !== 4) {
      Materialize.toast('Ingrese el año correcto ', 4000)
      $('#month').focus()
      return false
    }
    else return true
  }

  function validarMonth () {
    let month = $('#month')

    if (!month.val().trim()) {
      Materialize.toast('Ingrese el mes', 4000)
      $('#month').focus()
      return false
    }
    else return true
  }

})
