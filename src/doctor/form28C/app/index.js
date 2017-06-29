'use strict'

const form28C = angular.module('Hospital')

form28C.controller('form28CController',  function ($scope, $http, $stateParams, $location) {
  const paciente = $stateParams.id
  const turno = $stateParams.turno
  let array_sistemas = []
  let array_fisicos = []

  $scope.activoForm28 = false
  $scope.sistemas = []
  $scope.fisicos = []
  $scope.data = {
    motivo: '',
    enfermedad: '',
    metodo:'',
    clasificacion: '',
    antPersonales:'',
    antfamiliares: '',
    paciente,
    turno
  }

  $http.get(`src/doctor/form28C/service/paciente.php?id=${paciente}&turno=${turno}`)
    .then(response => {
      console.log(response)
      if (response.data.turno === 1) $scope.activoForm28 = turno
      $scope.data.antPersonales = response.data.paciente.hgc_antp_pacie
      $scope.data.antfamiliares = response.data.paciente.hgc_antf_pacie
    })

  $scope.handleSave = function () {
    const items_sistemas = Array.prototype.slice.call(document.querySelectorAll('.items_sistemas'))
    const items_fisicico = Array.prototype.slice.call(document.querySelectorAll('.items_fisicico'))

    array_sistemas = []
    array_fisicos = []

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

    if (validarForm()) {
      $scope.activoForm28 = false
      $scope.data.sistemas = array_sistemas
      $scope.data.fisicos = array_fisicos

      $http.post('src/doctor/form28C/service/save.php', $scope.data)
        .then(response => {
          console.log(response)
          if (response.data === '201') {
            Materialize.toast('Se ha guardado con exito', 4000)
            $location.path('/doctor')
            $scope.activoForm28 = false
          } else {
            $scope.activoForm28 = false
            Materialize.toast('Intente nuevamente', 4000)
          }
        })
    }
  }

  $http.get('src/doctor/form28C/service/sistemas.php')
    .then(response => $scope.sistemas = response.data)

  $http.get('src/doctor/form28C/service/fisico.php')
    .then(response => $scope.fisicos = response.data)

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
    }
    if (data.metodo === '') {
      Materialize.toast('Ingrese el metodo del desarollo psicomotor', 4000)
      return false
    }
    if (data.clasificacion === '') {
      Materialize.toast('Ingrese la clasificacion del desarollo psicomotor', 4000)
      return false
    } else return true
  }
})
