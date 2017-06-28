'use strict'

const singosVitales = angular.module('Hospital')

singosVitales.controller('singosVitalesController', function ($scope, toaster, $http) {
  $scope.pacientes = []

  $http.get('src/enfermera/signos-vitales/service/pacientes.php')
    .then(response => $scope.pacientes = response.data)
})

singosVitales.controller('pacienteSignoController', function ($scope, $http, $stateParams) {
  const id = $stateParams.id
  const turno = $stateParams.turno
  $scope.activeSignosBtn = false
  $scope.menor = false
  $scope.paciente = {}
  $scope.signosVitales = []
  $scope.data = {
    temperatura: '', frCardica: '', frRespiratoria: '', prArterial: '', peso: '',
    talla: '', prEncefalico: '', estado: '', longitud: '', pulso: '', turno, historiaClinica: id
  }

  $http.get(`src/enfermera/signos-vitales/service/turno.php?id=${turno}`)
    .then(response => {
      if (response.data.hgc_esta_turno === 'signosVitales') $scope.activeSignosBtn = true
    })

  $http.get(`src/enfermera/signos-vitales/service/getAll.php?id=${id}`)
    .then(response => $scope.signosVitales = response.data)

  $http.get(`src/enfermera/signos-vitales/service/pacienteOne.php?id=${id}`)
    .then(response => {
      $scope.paciente = response.data
      const parametros = $scope.paciente.hgc_fecn_pacie.split('-')
      const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
      const now = new Date()
      const year = now.getFullYear() - fecha.getFullYear()
      const moth = now.getMonth() - fecha.getMonth()
      const age = (year * 12) + moth

      if (age < 2) $scope.menor = true
      else $scope.menor = false
    })

  $scope.handleShowForm = function handleShowForm () {
    $('.formPlus').slideDown()
  }

  $scope.handleCancel = function handleCancel () {
    $('.formPlus').slideUp()
  }

  $scope.handleSave = function handleSave () {
    if (validar()) {
      $http.post('src/enfermera/signos-vitales/service/save.php', $scope.data)
      .then(response => {
        if (response.data === "201") {
          $scope.activeSignosBtn = true
          Materialize.toast('Se ha guarado con exito', 4000)
          $('.formPlus').slideUp()
          $('label.active').removeClass('active')
          $scope.data = {
            temperatura: '', frCardica: '', frRespiratoria: '', prArterial: '', peso: '',
            talla: '', prEncefalico: '', estado: '', longitud: '', pulso: '', turno, historiaClinica: id
          }
          $http.get(`src/enfermera/signos-vitales/service/getAll.php?id=${id}`)
          .then(response => $scope.signosVitales = response.data)
        }
      })
    }
  }

  function validar () {
    const data = $scope.data
    if (data.temperatura === '') {
      Materialize.toast('Ingrese la temperatura', 4000)
      return false
    }
    else if ($scope.menor === false) {
      if (data.frCardica === '') {
        Materialize.toast('Ingrese la frecuencia cardiaca', 4000)
        return false
      }
      if (data.frRespiratoria === '') {
        Materialize.toast('Ingrese la frecuencia respiratoria', 4000)
        return false
      }
      if (data.prArterial === '') {
        Materialize.toast('Ingrese el presion arterial', 4000)
        return false
      }
      if (data.peso === '') {
        Materialize.toast('Ingresa el peso', 4000)
        return false
      }
      if (data.talla === '') {
        Materialize.toast('Ingresa la talla', 4000)
        return false
      }
      if (data.prEncefalico === '') {
        Materialize.toast('Ingresa el perimetro encefalico', 4000)
        return false
      }
      if (data.estado === '') {
        Materialize.toast('Ingresa el estado de nutricion', 4000)
        return false
      } else return true
    }
    else if ($scope.menor === true) {
      if (data.pulso === '') {
        Materialize.toast('Ingrese el pulso', 4000)
        return false
      }
      if (data.peso === '') {
        Materialize.toast('Ingrese el peso', 4000)
        return false
      }
      if (data.longitud === '') {
        Materialize.toast('Ingresa la longitud', 4000)
        return false
      }
      if (data.prEncefalico === '') {
        Materialize.toast('Ingresa el perimetro encefalico', 4000)
        return false
      } else return true
    }
    else return true
  }

})
