'use strict'

angular.module('Hospital')
.controller('adultoMayorCtrl', function ($scope, $http, $stateParams, $location) {
  const paciente = $stateParams.id
  const turno = $stateParams.turno

  $scope.pacient = {}
  $scope.empresa = {}
  $scope.signos = {}
  $scope.data = {
    paciente, turno,
    cardiopatia: '',
    diabetis: '',
    vascular: '',
    hipertension: '',
    cancer: '',
    tuberculosis: '',
    mental: '',
    infecciosa: '',
    otroantece: '',
    sinantecedente: '',
    motivo: '',
    enfermedad: '',
    antpersonal: '',
    tratamiento: '',
    cabeza: '',
    cuello: '',
    torax: '',
    abdomen: '',
    pelvis: '',
    extremidades: '',
  }
  $scope.edad = { years: '', months: '', days: '' }
  $scope.cie10 = [
    { name: '', cie: '', isActive: false, check: '', detalle: '' }
  ]

  $http.get(`src/doctor/adulto-mayor/service/signos.php?turno=${turno}`)
  .then(response => {
    $scope.signos = response.data
  })

  $http.get(`src/doctor/form28A/service/paciente.php?id=${paciente}`)
  .then(response => $scope.pacient = response.data)

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) {
      $scope.empresa = response.data.empresa
    }
  })

  $http.get(`src/doctor/form28C/service/consultas.php?id=${paciente}`)
  .then(response => {
    $scope.consulta = response.data.count + 1
    const parametros = response.data.paciente.hgc_fecn_pacie.toString().split('-')
    const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
    const now = new Date()

    $scope.edad = duration(now, fecha)
  })

  $scope.save = () => {
    console.log($scope.data)
    $scope.data.cie = $scope.cie10
    $http.post(`src/doctor/adulto-mayor/service/${$stateParams.action}.php`, $scope.data)
    .then(response => {
      console.log(response);
      if (response.data === '201') {
        Materialize.toast('Se ha guardado con exito', 4000)
        $location.path('/doctor')
      }
    })

  }

  $scope.handleNewCIE10 = () => {
    $scope.cie10.push({ name: '', cie: '', isActive: false, check: '', detalle:'' })
  }

  $scope.cieGetName = (event, item) => {
    if (event.which === 13) {
      let name = item.name.toLowerCase()
      $http.get(`src/doctor/form28C/service/filterNombreCI10.php?nombre=${name}`)
      .then(response => {
        item.cie = response.data.hgc_codi_c10
        item.isActive = true
      })
    }
  }

  $scope.cieGet = (event, item) => {
    if (event.which === 13) {
      $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${item.cie}&len=${item.cie.length}`)
      .then(response => {
        item.name = response.data.hgc_desc_c10
        item.isActive = true
      })
    }
  }

  $scope.isActionGet = false

  if ($stateParams.action === 'get') {
    $scope.isActionGet = true
  }

  if ($stateParams.action === 'edit' || $stateParams.action === 'get') {
    $http.get(`src/doctor/adulto-mayor/service/get.php?turno=${turno}`)
    .then(response => {
      $('.input-field label').addClass('active')
      let main = response.data.main
      $scope.cie10 = []
      $scope.data = {
        id: main.hgc_cod_ma,
        motivo: main.hgc_mot_ma,
        enfermedad: main.hgc_enf_ma,
        antpersonal: main.hgc_ant_ma,
        cardiopatia: main.hgc_car_ma === '1' ? true : false,
        diabetis: main.hgc_dia_ma === '1' ? true : false,
        vascular: main.hgc_vas_ma === '1' ? true : false,
        hipertension: main.hgc_hip_ma === '1' ? true : false,
        cancer: main.hgc_car_ma === '1' ? true : false,
        tuberculosis: main.hgc_tub_ma === '1' ? true : false,
        mental: main.hgc_men_ma  === '1' ? true : false,
        infecciosa: main.hgc_inf_ma  === '1' ? true : false,
        otroantece: main.hgc_otro_ma  === '1' ? true : false,
        sinantecedente: main.hgc_sin_ma  === '1' ? true : false,
        cabeza: main.hgc_cab_ma,
        cuello: main.hgc_cue_ma,
        torax: main.hgc_tor_ma,
        abdomen: main.hgc_abs_ma,
        pelvis: main.hgc_pel_ma,
        extremidades: main.hgc_ext_ma,
        examenFisico: main.hgc_exf_ma,
        tratamiento: main.hgc_tra_ma,
      }

      response.data.detail.map(item => {
        let codcie = item.hgc_cie_ma
        $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${codcie}&len=${codcie.length}`)
        .then(cie_response => {
          $scope.cie10.push({
            name: cie_response.data.hgc_desc_c10,
            cie: item.hgc_cie_ma,
            isActive: true,
            check: item.hgc_tip_ma,
          })
        })
      })

    })
  }
})
