'use strict'

angular.module('Hospital')
.controller('AdultCtrlSignos', function ($scope, $http, $stateParams) {
  const id = $stateParams.id
  const turno = $stateParams.turno
  $scope.procedimientos = []

  $http.get('src/datos/procedimientos/service/getAll.php')
  .then(response => $scope.procedimientos = response.data )

  $scope.data = {
    presionAcostada: '',
    presionSentado: '',
    temperatura: '',
    pulso7: '',
    frecuencia: '',
    peso: '',
    talla: '',
    imc: '',
    perimetroCintura: '',
    perimetroCadera: '',
    perimetroPantorrilla: '',
    responsables: '',
    procedimiento: '',
    grupoPrioritado: '',
    turno,
    historiaClinica: id,
    id: '',
  }

  $scope.cerrar = () => {
    closeForm()
  }

  function closeForm () {
    $('#formPlusAdultoMayor65').slideUp()
    $('label.active').removeClass('active')

    $scope.data = {
      presionAcostada: '',
      presionSentado: '',
      temperatura: '',
      pulso7: '',
      frecuencia: '',
      peso: '',
      talla: '',
      imc: '',
      perimetroCintura: '',
      perimetroCadera: '',
      perimetroPantorrilla: '',
      responsables: '',
      turno,
      historiaClinica: id,
      id: '',
      procedimiento: '',
      grupoPrioritado: '',
    }
  }

  $scope.save = () => {

    if (validForm()) {
      let checked = document.querySelector('.checkedAdulto:checked')
      $scope.data.tamizajeRapido = checked.value
      $http.post('src/enfermera/signos-vitales/service/save-adulto-65.php', $scope.data)
      .then(response => {
      if (response.data === "201") {
        $scope.activeSignosBtn = true
        Materialize.toast('Se ha guarado con exito', 4000)
        closeForm()
        localStorage.setItem('activar', true)
      }
    })
    }
  }

  function validForm () {
    if (!$scope.data.presionAcostada) {
      Materialize.toast('Ingrese el presion acostada', 4000)
      return false
    }
    if (!$scope.data.presionSentado) {
      Materialize.toast('Ingrese el presion sentado', 4000)
      return false
    }
    if (!$scope.data.temperatura) {
      Materialize.toast('Ingrese la temperatura', 4000)
      return false
    }
    if (!$scope.data.pulso7) {
      Materialize.toast('Ingrese el pulso', 4000)
      return false
    }
    if (!$scope.data.frecuencia) {
      Materialize.toast('Ingrese la frecuencia', 4000)
      return false
    }
    if (!$scope.data.peso) {
      Materialize.toast('Ingrese el peso', 4000)
      return false
    }
    if (!$scope.data.talla) {
      Materialize.toast('Ingrese la talla', 4000)
      return false
    }
    if (!$scope.data.imc) {
      Materialize.toast('Ingrese el imc', 4000)
      return false
    }
    if (!$scope.data.perimetroCintura) {
      Materialize.toast('Ingrese el perimetro cintura', 4000)
      return false
    }
    if (!$scope.data.perimetroCadera) {
      Materialize.toast('Ingrese el perimetro cadera', 4000)
      return false
    }
    if (!$scope.data.perimetroPantorrilla) {
      Materialize.toast('Ingrese el perimetro pantorrilla', 4000)
      return false
    }
    if (!$scope.data.responsables) {
      Materialize.toast('Ingrese el responsables', 4000)
      return false
    }
    if (!document.querySelector('.checkedAdulto:checked')) {
      Materialize.toast('Selecione el tamizaje pàpido', 4000)
      return false
    }
    if (!$scope.data.procedimiento) {
      Materialize.toast('Ingrese el procedimiento', 4000)
      return false
    }
    if (!$scope.data.grupoPrioritado) {
      Materialize.toast('Ingrese el grupo prioritario', 4000)
      return false
    }
    else return true
  }
})
