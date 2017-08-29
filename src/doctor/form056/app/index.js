'use strict'

angular.module('Hospital')
.controller('formCtrl056', function ($scope, $http, $stateParams, $rootScope) {
  const fecha = new Date()

  $scope.paciente = {}
  $scope.empresa = {}
  $scope.mensajeFlag = false
  $scope.domicilioFlag = false

  $scope.flagEducacion = false
  $scope.flagTrabaja = false
  $scope.urologia = false
  $scope.relacionesSexualCheck = false

  $scope.hoy = fecha.getDate() < 10 ? '0'+fecha.getDate() : fecha.getDate()
  $scope.month = fecha.getMonth() < 10 ? '0'+(fecha.getMonth() + 1) : fecha.getMonth() + 1
  $scope.year = fecha.getFullYear().toString().split('')

  $scope.hoy = $scope.hoy.toString().split('')
  $scope.month = $scope.month.toString().split('')


  $scope.antecendesPersonales = [
    { id:'ant1', name: 'PERINATALES normales', options: [
      {id:'ant1-1', name:'si', class:'si-check', val: 1},
      {id:'ant1-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant1-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant2', name: 'CRECIMIENTO normal', options: [
      {id:'ant2-1', name:'si', class:'si-check', val: 1},
      {id:'ant2-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant2-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant3', name: 'DESARROLLO normal', options: [
      {id:'ant3-1', name:'si', class:'si-check', val: 1},
      {id:'ant3-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant3-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant4', name: 'VACUNAS COMPLETAS', options: [
      {id:'ant4-1', name:'si', class:'si-check', val: 1},
      {id:'ant4-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant4-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant5', name: 'ENFERMEDADES CRÒNICAS', options: [
      {id:'ant5-1',name:'si', class:'si-check', val: 1},
      {id:'ant5-2',name:'no se', class:'nose-check', val: 2},
      {id:'ant5-3',name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant6', name: 'ENFERMEDADES INFECTO CONTAGIOSAS', options: [
      {id:'ant6-1', name:'si', class:'si-check', val: 1},
      {id:'ant6-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant6-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant7', name: 'ACCIDENTES INTOXICACIÒN', options: [
      {id:'ant7-1', name:'si', class:'si-check', val: 1},
      {id:'ant7-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant7-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant8', name: 'CIRUGÌA HOSPITALIZACIÒN', options: [
      {id:'ant8-1', name:'si', class:'si-check', val: 1},
      {id:'ant8-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant8-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant9', name: 'USO DE MEDICINAS O SUSTANCIAS', options: [
      {id:'ant9-1', name:'si', class:'si-check', val: 1},
      {id:'ant9-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant9-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant10', name: 'TRASTORNOS PSICOLOGICOS', options: [
      {id:'ant10-1', name:'si', class:'si-check', val: 1},
      {id:'ant10-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant10-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant11', name: 'MALTRATO', options: [
      {id:'ant11-1', name:'si', class:'si-check', val: 1},
      {id:'ant11-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant11-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant12', name: 'JUDICIALES', options: [
      {id:'ant12-1', name:'si', class:'si-check', val: 1},
      {id:'ant12-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant12-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant13', name: 'OTROS', options: [
      {id:'ant13-1', name:'si', class:'si-check', val: 1},
      {id:'ant13-2', name:'no', class:'no-check', val: 3}
    ] },
  ]

  $scope.antecendesFamiliares = [
    { id: 'antFam1', name: 'DIABETES', options: [
        {id:'antFam1-1', name:'si', class:'si-check', val: 1},
        {id:'antFam1-2', name:'no se', class:'nose-check', val: 2},
        {id:'antFam1-3', name:'no', class:'no-check', val: 3}
      ]
    },
    { id: 'antFam2', name: 'OBESIDAD', options: [
      {id:'antFam2-1', name:'si', class:'si-check', val: 1},
      {id:'antFam2-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam2-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam3', name: 'CARDIOVASC. (HTA, cardiopatia, etc)', options: [
      {id:'antFam3-1', name:'si', class:'si-check', val: 1},
      {id:'antFam3-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam3-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam4', name: 'ALERGÌA', options: [
      {id:'antFam4-1', name:'si', class:'si-check', val: 1},
      {id:'antFam4-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam4-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam5', name: 'INFECCIONES (TBC, VHI, etc)', options: [
      {id:'antFam5-1', name:'si', class:'si-check', val: 1},
      {id:'antFam5-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam5-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam6', name: 'TRASTORNOS PSICOLOGICOS', options: [
      {id:'antFam6-1', name:'si', class:'si-check', val: 1},
      {id:'antFam6-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam6-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam7', name: 'ALCOHOL DROGAS', options: [
      {id:'antFam7-1', name:'si', class:'si-check', val: 1},
      {id:'antFam7-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam7-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam8', name: 'VIOLENCIA INTRAFAMILIAR', options: [
      {id:'antFam8-1', name:'si', class:'si-check', val: 1},
      {id:'antFam8-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam8-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam9', name: 'MADRE ADOLESC.', options: [
      {id:'antFam9-1', name:'si', class:'si-check', val: 1},
      {id:'antFam9-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam9-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam10', name: 'JUDICIALES', options: [
      {id:'antFam10-1', name:'si', class:'si-check', val: 1},
      {id:'antFam10-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam10-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam11', name: 'OTROS', options: [
      {id:'antFam11-1', name:'si', class:'si-check', val: 1},
      {id:'antFam11-2', name:'no', class:'no-check', val: 2}]
    },
  ]

  $scope.familia = [
    { id: 'familia1', name: 'madre', options: [
      { id: 'familia1-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia1-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia1-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia2', name: 'padre', options: [
      { id: 'familia2-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia2-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia2-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia3', name: 'madrastra', options: [
      { id: 'familia3-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia3-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia3-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia4', name: 'padrastro', options: [
      { id: 'familia4-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox'},
      { id: 'familia4-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio'},
      { id: 'familia4-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio'},
    ]},
    { id: 'familia5', name: 'hermanos', options: [
      { id: 'familia5-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia5-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia5-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia6', name: 'pareja', options: [
      { id: 'familia6-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia6-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia6-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia7', name: 'hijo', options: [
      { id: 'familia7-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia7-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia7-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia8', name: 'otros', options: [
      { id: 'familia8-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia8-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia8-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
  ]

  $scope.vive = [
    { id: 'vive1', name: 'en instituc.', options: [
      { id: 'vive1-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'vive1-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
    ]},
    { id: 'vive2', name: 'en la calle', options: [
      { id: 'vive2-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'vive2-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
    ]},
    { id: 'vive3', name: 'solo', options: [
      { id: 'vive3-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'vive3-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
    ]},
    { id: 'vive4', name: 'COMPARTE LA CAMA', options: [
      { id: 'vive4-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio'},
      { id: 'vive4-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox'},
    ]},
  ]

  $scope.nivelInstruccion = [
    { instr: 'analfabeto', name: 'analbabeto', options: [ 'padreAnalbabeto' ] },
    { instr: 'prim. incomp', name: 'prim-incomp', options: [ 'primIncompPadre' ] },
    { instr: 'primario', name: 'primario', options: [ 'primarioPadre' ] },
    { instr: 'secund./tècnicos', name: 'secund-tecnico', options: [ 'secundTecnicoPadre' ] },
    { instr: 'univ./terciario', name: 'univ-terciario', options: [ 'univTerciarioPadre' ] },
  ]

  $scope.trabajo = [
    { trab: 'ninguno', name: 'ninguno', options: [ 'padreNinguno' ] },
    { trab: 'no estable', name: 'no-estable', options: [ 'padreNoEstable' ] },
    { trab: 'estable', name: 'estable', options: [ 'padreEstable'] },
  ]

  $http.get(`src/doctor/form056/service/paciente.php?id=${$stateParams.id}`)
  .then(response => {
    $scope.paciente = response.data.paciente
    $scope.apellidos = $scope.paciente.hgc_ape_pacie.split(' ')
    $scope.nacimiento = $scope.paciente.hgc_fecn_pacie.split('-')
    $scope.provincia = `${$scope.paciente.hgc_desc_provi}, ${$scope.paciente.hgc_desc_canton}, ${$scope.paciente.hgc_desc_parro}`

    $scope.domicilioFlag = $scope.paciente.hgc_tele_pacie === null
          || $scope.paciente.hgc_tele_pacie === '' ? false : true

    $scope.mensajeFlag = $scope.paciente.hgc_celu_pacie === null
          || $scope.paciente.hgc_celu_pacie === '' ? false : true

    const edad = duration(fecha, new Date($scope.paciente.hgc_fecn_pacie))
    $scope.ageYear = edad.years < 10 ? '0'+ edad.years : edad.years
    $scope.ageYear = $scope.ageYear.toString().split('')
    $scope.ageMonth = edad.months < 10 ? '0' + edad.months : edad.months
    $scope.ageMonth = $scope.ageMonth.toString().split('')

    response.data.sexo.hgc_desc_genero === 'Mujer' ? $scope.urologia = true : $scope.urologia = false
  })

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

  $scope.handleNextPaper = () => {
    $('.Paper1').slideUp()
    $('.Paper2').slideDown()
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  $scope.handleBackPaper1 = () => {
    $('.Paper1').slideDown()
    $('.Paper2').slideUp()
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  $scope.refreshCheck = (clase) => {
    const grid = [...document.querySelectorAll(`${clase} input:checked`)]
    grid.map(item => item.checked = false)
  }

  $rootScope.shouldBeDisabled = (item) => {
    if (item.type === 'checkbox') {
      const clase = item.id.split('-')[0]
      const cheked = document.querySelector(`#${item.id}`).checked
      document.querySelector(`#${clase}-2`).disabled = cheked
      document.querySelector(`#${clase}-3`).disabled = cheked
      if (cheked === true) {
        document.querySelector(`#${clase}-2`).checked = false
        document.querySelector(`#${clase}-3`).checked = false
      }
    }
  }

  $scope.refreshCheckVive = (clase) => {
    $scope.refreshCheck(clase)
    document.querySelector('#vive4-2').disabled = true
    document.querySelector('#vive4-1').disabled = true
    document.querySelector('#vive2-1').disabled = false
    document.querySelector('#vive2-2').disabled = false
    document.querySelector('#vive3-1').disabled = false
    document.querySelector('#vive3-2').disabled = false

    document.querySelector('#vive2-1').checked = false
    document.querySelector('#vive2-2').checked = false
    document.querySelector('#vive3-1').checked = false
    document.querySelector('#vive3-2').checked = false

    document.querySelector('#vive4-2').checked = false
    document.querySelector('#vive4-1').checked = false
  }

  $scope.shouldInsDisabled = (item) => {
    if (item.id === 'vive1-1') {
      document.querySelector('#vive4-2').disabled = false
      document.querySelector('#vive4-1').disabled = false
      document.querySelector('#vive2-1').disabled = true
      document.querySelector('#vive2-2').disabled = true
      document.querySelector('#vive3-1').disabled = true
      document.querySelector('#vive3-2').disabled = true

      document.querySelector('#vive2-1').checked = false
      document.querySelector('#vive2-2').checked = false
      document.querySelector('#vive3-1').checked = false
      document.querySelector('#vive3-2').checked = false

    }
    else if (item.id === 'vive1-2') {
      document.querySelector('#vive4-2').disabled = true
      document.querySelector('#vive4-1').disabled = true
      document.querySelector('#vive2-1').disabled = false
      document.querySelector('#vive2-2').disabled = false
      document.querySelector('#vive3-1').disabled = false
      document.querySelector('#vive3-2').disabled = false
      document.querySelector('#vive4-2').checked = false
      document.querySelector('#vive4-1').checked = false
    }
  }


  $rootScope.noEscolariz = () => {
    $scope.flagEducacion = document.querySelector('#noEscolariz').checked
    if ($scope.flagEducacion === true) {
      $scope.refreshCheck('.noEscolirizadoCheck')
      const grid = [...document.querySelectorAll('.noEscolirizadoCheck input[type="text"]')]
      grid.map(item => item.value = '')
    }
  }

  $rootScope.trabajaCheck = () => {
    const check = document.querySelector('#TrabajoActividad-trabaja').checked
    $scope.flagTrabaja = !check
    if (check === false) {
      $scope.refreshCheck('.refresWorkPaper')
      const grid = [...document.querySelectorAll('.TrabajoPaper input[type="text"]')]
      grid.map(item => item.value = '')
    }
  }

  $rootScope.relacionesSexual = () => {
    $scope.relacionesSexualCheck = document.querySelector('#relacionesSexuales-no').checked
    if ($scope.relacionesSexualCheck === true) {
      $scope.refreshCheck('.Sex--item')
      const grid = [...document.querySelectorAll('.Sex--item input[type="text"]')]
      grid.map(item => item.value = '')
    }
  }

  $scope.disabledInput = false
  $rootScope.repeatYearDisabled = () => {
    $scope.disabledInput = document.querySelector('#repeatYearCausa-no').checked
    $('#obsYearRepeat').val('')
  }

  $scope.disabledOtherActiv = false
  $rootScope.handleDisabledOtherActividades = () => {
    $scope.disabledOtherActiv = document.querySelector('#OtrasActividades-no').checked
    if ($scope.disabledOtherActiv) $('.obsActivity').val('')
  }

  $scope.workInsalubreDis = false
  $rootScope.handleWorkDisabInsalubre = () => {
    $scope.workInsalubreDis = document.querySelector('#TrabajoInsalubre-no').checked
    if ($scope.workInsalubreDis) $('#obserTypeWork').val('')
  }

  $scope.deserExclDis = false
  $rootScope.handleDeserExclDis = () => {
    $scope.deserExclDis = document.querySelector('#DisercionEstudia-no').checked
    if ($scope.deserExclDis) $('#causaDesercionExcl').val('')
  }

  $scope.disabledEducNoForm = false
  $rootScope.handleDisEducaNoFormal = () => {
    $scope.disabledEducNoForm = document.querySelector('#EducacionNoFormalEstudia-no').checked
    if ($scope.disabledEducNoForm) $('#cualEducFormal').val('')
  }

  $scope.otherToxico = false
  $rootScope.handleOtherToxico = () => {
    $scope.otherToxico = document.querySelector('#OtroToxico-no').checked
    if ($scope.otherToxico) $('#frecunciaTypo').val('')
  }

  $scope.conduceVehiculoDisab = false
  $rootScope.handleDriveCar = () => {
    $scope.conduceVehiculoDisab = document.querySelector('#ConduceVehiculo-no').checked
    if ($scope.conduceVehiculoDisab) $('#cual-conduce-carro').val('')
  }

  $scope.trasmiSexuDis = false
  $rootScope.handleTrasmiSexual = () => {
    $scope.trasmiSexuDis = document.querySelector('#EnfTranSexual-no').checked
    if ($scope.trasmiSexuDis) $('#cual-trasmision-sexual').val('')
  }

  $scope.ageStartDisab = false
  $rootScope.handleAgeStartSex = () => {
    $scope.ageStartDisab = document.querySelector('#volundariaSex-no').checked
    if ($scope.ageStartDisab) $('#edad-inicio-sex').val('')
  }

  $scope.handleDateVisit = () => $('.month-turno').slideDown()

})
