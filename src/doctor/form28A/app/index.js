'use strict'

const form28A = angular.module('Hospital')

form28A.controller('form28AController', function ($scope, $http, $stateParams, $location) {
  const paciente = $stateParams.id
  const turno = $stateParams.turno
  const hoy = new Date()

  const dia = hoy.getDate() < 10 ? '0' + hoy.getDate() : hoy.getDate()
  const mes = hoy.getMonth() < 10 ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)

  $scope.activoForm28 = false
  $scope.fecha = `${dia}/${mes}/${hoy.getFullYear()}`
  $scope.sistemas = []
  $scope.fisicos = []
  $scope.pacient = {}
  $scope.empresa = {}
  $scope.year = hoy.getFullYear()
  $scope.data = {
    motivo: '',
    enfermedad: '',
    paciente,
    turno,
    gestasPrevias: '',
    abortos: '',
    partos: '',
    partosVaginales: '',
    cesarias: '',
    nacidosVivos: '',
    hijosVivos: '',
    muertosMenor7: '',
    muertosMayor7: '',
    nacidosMuertos: '',
    fechaEmbarazo: '',
    tamizaje: '',
    condicionEgreso: '',
    referido: '',
    edadGestion: '',
    relacionPeso: '',
    tipoficacionSanguinea: '',
    tipoficacionSanguineaCheck: 'no',
    examenesEspeciales: '',
    examenesEspecialesCheck: 'no',
    apagar1Min: '',
    apagar5Min: '',
    longitud: '',
    pCefalico: '',
    pesoNacer: '',
    reanimacion: '',
    reanimacionCheck: 'no'
  }

	let array_sistemas = []
  let array_fisicos = []
  let array_form = []
  let array_atendido = []

  $http.get(`src/doctor/form28C/service/consultas.php?id=${paciente}`)
  .then(response => {
    $scope.consulta = response.data.count + 1
    $scope.edad = calcularEdad(response.data.form.hgc_fecn_pacie)
  })

  $http.get('src/doctor/form28A/service/sistemas.php')
  .then(response => $scope.sistemas = response.data)

  $http.get('src/doctor/form28A/service/fisico.php')
  .then(response => $scope.fisicos = response.data)

  $http.get(`src/doctor/form28A/service/paciente.php?id=${paciente}`)
  .then(response => $scope.pacient = response.data)

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) {
      $scope.empresa = response.data.empresa
    }
  })

  $scope.handleBack = () => {
    $('#hoja__1').slideDown()
    $('#hoja__2').slideUp()
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  $scope.handleSave = () => {
    const items_sistemas = [...document.querySelectorAll('.items_sistemas')]
    const items_fisicico = [...document.querySelectorAll('.items_fisicico')]
    const items__form = [...document.querySelectorAll('.items__form')]
    const items_atendido = [...document.querySelectorAll('.item_atendido')]

    array_sistemas = []
    array_fisicos = []
    array_form = []
    array_atendido = []

    for(let i in items_sistemas) {
      let sistemas = items_sistemas[i]
      if(sistemas.checked === true) {
        let tipo = sistemas.value.split('_')[0]
        let id = sistemas.value.split('_')[1]
        let observacion = document.getElementById(`input-system-${id}`).value
        array_sistemas.push({ id, tipo, observacion })
      }
    }

    for(let i in items_fisicico) {
      let fisico = items_fisicico[i]
      if(fisico.checked === true) {
        let tipo = fisico.value.split('_')[0]
        let id = fisico.value.split('_')[1]
        let observacion = document.getElementById(`input-fisico-${id}`).value
        array_fisicos.push({ id, tipo, observacion })
      }
    }

    for (let i in items__form) {
      let item = items__form[i]
      if (item.checked === true) {
        let tipo = item.value.split('_')[0]
        let id = item.value.split('_')[1]
        let seccion = item.value.split('_')[2]
        let observacion = document.getElementById(`input__form-${id}`).value

        array_form.push({ id, tipo, observacion, seccion })
      }
    }

    for (let i in items_atendido) {
      let item = items_atendido[i]
      if (item.checked === true) {
        let tipo = item.id.split('_')[0]
        let atendido = item.id.split('_')[1]

        array_atendido.push({ atendido, tipo })
      }
    }

    if (validarForm()) {
      $scope.activoForm28 = true
      $scope.data.sistemas = array_sistemas
      $scope.data.fisicos = array_fisicos
      $scope.data.form = array_form
      $scope.data.atendido = array_atendido

      $http.post('src/doctor/form28A/service/save.php', $scope.data)
      .then(response => {
        console.log(response)
        if (response.data === '201') {
          Materialize.toast('Se ha guardado con exito', 4000)
          $location.path('/doctor')
          $scope.activoForm28 = false
        } else {
        Materialize.toast('Intente nuevamente', 4000)
          $scope.activoForm28 = false
        }
      })
    }
  }

  function validarForm () {
    const data = $scope.data

    if (data.motivo === '') {
      Materialize.toast('Ingrese el motivo de la consulta', 4000)
      return false
    }
    if (data.enfermedad === '') {
      Materialize.toast('Ingrese la enfermedad o problemas actual', 4000)
      return false
    }
    if (array_sistemas.length !== $scope.sistemas.length) {
      Materialize.toast('Debe selecionar la revision de organos y sistemas', 4000)
      return false
    }
    if (array_fisicos.length !== $scope.fisicos.length) {
      Materialize.toast('Debe selecionar los examenes fisicos', 4000)
      return false
    } else return true
  }

})
