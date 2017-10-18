'use strict'

angular.module('Hospital')
.controller('SolicitudCtrl', function ($scope, $http) {
  $scope.empresa = {}
  $scope.form = { paciente: '', especialidad: '', medico: '', tipo: '' }
  $scope.pacientes = []
  $scope.espcialidades = []
  $scope.medicos = []

  $scope.isLoader = false
  $scope.enableSend = false

  let $select = $('.browser-default')
  $select.select2()
  getData()

  $scope.save = () => {
    if (valid()) {
      $scope.form.fecha = $('#inicio').val()
        $scope.enableSend = true

      $http.post('src/doctor/solicitud/service/save.php', $scope.form)
      .then(response => {
        console.log(response)
        if (response.data === '201') {
          Materialize.toast('Se ha guardado con exito', 4000)
          $scope.form = { paciente: '', especialidad: '', medico: '', tipo: '' }
          $('#paciente').val('')
          $('#especialidad').val('')
          $('#medico').val('')
          $('#tipo').val('')
          $('#inicio').val('')
          $select.trigger('change.select2')
        }
        else {
          Materialize.toast('Tenemos problemasa', 4000)
          console.log(response);
        }
        $scope.enableSend = false

      })
    }
  }

  $scope.changeEspecialidad = () => {
    if ($scope.form.especialidad !== null) {
      $http.get(`src/doctor/receta/service/medico.php?especialidad=${$scope.form.especialidad}`)
      .then(response => {
        $scope.medicos = response.data
      })
    }
  }

  function valid () {
    let form = $scope.form

    if (!form.tipo) {
      Materialize.toast('Ingrese el tipo', 4000)
      $('#tipo').focus()
      return false
    }
    if (!form.paciente) {
      Materialize.toast('Ingrese el paciente', 4000)
      $('#paciente').focus()
      return false
    }
    if (!form.especialidad) {
      Materialize.toast('Ingrese la especialidad', 4000)
      $('#especialidad').focus()
      return false
    }
    if (!form.medico) {
      Materialize.toast('Ingrese el medico', 4000)
      $('#medico').focus()
      return false
    }
    if (!$('#inicio').val().trim()) {
      Materialize.toast('Ingrese la fecha', 4000)
      $('#inicio').focus()
      return false
    }
    else return true
  }

  function getData () {
    $http.get('src/doctor/receta/service/empresa.php')
    .then(response => $scope.empresa = response.data)

    $http.get('src/doctor/receta/service/pacientes.php')
    .then(response => {
      $scope.pacientes = response.data
      $scope.isLoader = true
    })

    $http.get('src/doctor/receta/service/especialidad.php')
    .then(response => $scope.espcialidades = response.data)
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
    min: new Date()
  });
})
