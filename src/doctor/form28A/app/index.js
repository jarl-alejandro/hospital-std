'use strict'

const form28A = angular.module('Hospital')

form28A.controller('form28AController',  function ($scope, $http) {
  $scope.sistemas = []
  $scope.fisicos = []
  $scope.data = { motivo: '', enfermedad: '' }
  let array_sistemas = []
  let array_fisicos = []

  $http.get('src/doctor/form28A/service/sistemas.php')
    .then(response => $scope.sistemas = response.data)

  $http.get('src/doctor/form28A/service/fisico.php')
    .then(response => $scope.fisicos = response.data)

  $scope.handleSave = function () {
    const items_sistemas = Array.prototype.slice.call(document.querySelectorAll('.items_sistemas'))
    const items_fisicico = Array.prototype.slice.call(document.querySelectorAll('.items_fisicico'))

    array_sistemas = []
    array_fisicos = []

    for(let i in items_sistemas) {
      let sistemas = items_sistemas[i]
      if(sistemas.checked === true) {
        let id = sistemas.value.split('_')[1]
        let observacion = document.getElementById(`input-system-${id}`).value
        array_sistemas.push({ tipo: sistemas.value, observacion })
      }
    }

    for(let i in items_fisicico) {
      let fisico = items_fisicico[i]
      if(fisico.checked === true) {
        let id = fisico.value.split('_')[1]
        let observacion = document.getElementById(`input-fisico-${id}`).value
        array_fisicos.push({ tipo: fisico.value, observacion })
      }
    }

    if (validarForm()) {
      $scope.data.sistemas = array_sistemas
      $scope.data.fisicos = array_fisicos

      window.alert('Saved....')
      console.log($scope.data)
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
