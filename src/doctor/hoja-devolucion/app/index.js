'use strict'

angular.module('Hospital')
.controller('HojaDevolucionCtrl', function ($scope, $http, $stateParams, $location) {
  const fecha = new Date()

  $scope.paciente = {}
  $scope.empresa = {}
  $scope.signos = {}
  $scope.guardandoConsult = false

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
    $scope.ageCumplid = edad.years < 10 ? '0'+ edad.years : edad.years
    $scope.ageYear = $scope.ageCumplid.toString().split('')
    $scope.ageMonth = edad.months < 10 ? '0' + edad.months : edad.months
    $scope.ageMonth = $scope.ageMonth.toString().split('')

    $http.get(`src/doctor/hoja-devolucion/service/signos.php?id=${$stateParams.turno}`)
    .then(snap => $scope.signos = snap.data)

    $scope.centil = `${$scope.signos.hgc_peso_sigvit} / ${$scope.ageCumplid}`
    $scope.deTalla = `${$scope.signos.hgc_talla_sigvit} / ${$scope.ageCumplid}`

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

    $('.SignosVitalesDevolucion .input-field label').addClass('active')
  })

  $scope.handleDateVisit = () => $('.month-turno').slideDown()

  //Guarda y Edita el formularo "hoja de devolucion"
  $scope.data = {
    paciente: $stateParams.id,
    turno: $stateParams.turno,
    enfermedadActual: '',
    planTratamiento: '',
  }

  $scope.saveForm = () => {
    $scope.guardandoConsult = true

    const inputCompanion = document.querySelector('.Informacion-consulta-companion input:checked')
    const inputCivilStatus = document.querySelector('.Informacion-consulta-civilStatus input:checked')
    const estudios = document.querySelector('.Evolucion-estudios__list input:checked')
    const menstruacionCheck = document.querySelector('.noMenstruacion:checked')
    const tannerSigno = document.querySelector('.tannerSigno:checked')

    const listMotivo = [...document.querySelectorAll('.Motivo-consulta .consulta-cie--code input')]
    const listDiagnostico = [...document.querySelectorAll('.DiagnosticoCIE10 p input')]


    const motivoConsulta = []

    listMotivo.map(item => {
      if (item.value !== '') {
        motivoConsulta.push({
          tipo: item.id.split("-")[1] === 'company' ? 'company' : 'adolecente',
          valor: item.value
        })
      }
    })

    listDiagnostico.map(item => {
      if (item.value !== '') {
        motivoConsulta.push({
          tipo: 'diagnostico',
          valor: item.value
        })
      }
    })

    $scope.data.companion = inputCompanion !== null ? inputCompanion.value : ''
    $scope.data.civilStatus = inputCivilStatus !== null ? inputCivilStatus.value : ''
    $scope.data.tanner = tannerSigno !== null ? tannerSigno.value : ''
    $scope.data.estudios = estudios !== null ? estudios.value : ''
    $scope.data.noMenstruacion = menstruacionCheck !== null ? menstruacionCheck.value : ''

    $scope.data.motivo = motivoConsulta
    $scope.data.menstruacion = $('#menstruacion').val()

    $scope.data.fechaProxima = $('#fecha_proxima_visita').val()
    $scope.data.doctorTurno = localStorage.getItem('doctor')
    $scope.data.codigoForm = $('#codigoForm056').val()

    $http.post(`src/doctor/hoja-devolucion/service/${$stateParams.action}.php`, $scope.data)
    .then(response => {
      console.log(response);
      if (response.data === '201') {
        $scope.guardandoConsult = false
        $location.path(`/grafica-form056/${$stateParams.id}/${$stateParams.turno}`)
      }
    })
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
