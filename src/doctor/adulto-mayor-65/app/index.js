'use strict'

angular.module('Hospital')
.controller('adultoMayor65Ctrl', function ($scope, $http, $stateParams, $location) {
  const paciente = $stateParams.id
  const turno = $stateParams.turno

  $scope.pacient = {}
  $scope.empresa = {}
  $scope.signos = {}

  $scope.data = { paciente, turno }
  $scope.cie10 = [
    { name: '', cie: '', isActive: false, check: '', detalle: '' }
  ]

  $http.get(`src/doctor/adulto-mayor/service/signos.php?turno=${turno}`)
  .then(response => {
    $scope.signos = response.data
    let tami = document.querySelector(`.checkedAdulto[value="${$scope.signos.hgc_tami_sigvit}"]`)
    tami.checked = true
    $('.Signos label').addClass('active')
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

  $scope.save = function () {
    $scope.data.estadoGeneral = document.querySelector('.estadoGeneral:checked').value
    $scope.data.alertaRiesgo = document.querySelector('.alertaRiesgo:checked').value
    $scope.data.habitosNocivos = document.querySelector('.habitosNocivos:checked').value
    $scope.data.clinicoQuirurgicos = document.querySelector('.clinicoQuirurgicos:checked').value
    $scope.data.farcologicos = document.querySelector('.farcologicos input:checked').value
    $scope.data.sindromeGeriatricos = document.querySelector('.sindromeGeriatricos input:checked').value

    $scope.data.cie10 = $scope.cie10

    $http.post(`src/doctor/adulto-mayor-65/service/${$stateParams.action}.php`, $scope.data)
    .then(response => {
      if (response.data === '201') {
        Materialize.toast('Se ha guardado con exito', 4000)
        $location.path('/doctor')
      }
    })
  }

})
