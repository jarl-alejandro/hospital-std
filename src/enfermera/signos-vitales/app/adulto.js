'use strict'

angular.module('Hospital')
.controller('AdultCtrlSignos', function ($scope, $http, $stateParams) {
  const id = $stateParams.id
  const turno = $stateParams.turno
  $scope.procedimientos = []

  $http.get('src/datos/procedimientos/service/getAll.php')
  .then(response => $scope.procedimientos = response.data )

  $scope.data = {
    presionAcostada: $('#mayor65-parterialAcostado').val(),
    presionSentado: $('#mayor65-parterialSentada').val(),
    temperatura: $('#mayor65-temperatura').val(),
    pulso7: $('#mayor65-pulso7min').val(),
    frecuencia: $('#mayor65-frecuencia').val(),
    peso: $('#mayor65-peso').val(),
    talla: $('#mayor65-talla').val(),
    imc: $('#mayor65-imc').val(),
    perimetroCintura: $('#mayor65-perimetroCintura').val(),
    perimetroCadera: $('#mayor65-perimetroCadera').val(),
    perimetroPantorrilla: $('#mayor65-perimetroPantorrilla').val(),
    responsables: $('#mayor65-responsables').val(),
    procedimiento: $('#formMayor65-procedimiento').val(),
    grupoPrioritado: $('#formMayor65-grupoPrioritado').val(),
    turno,
    historiaClinica: id,
    id: $('#idAdultoMayor65').val(),
  }

  $scope.cerrar = () => {
    closeForm()
  }

  function closeForm () {
    $('#formPlusAdultoMayor65').slideUp()
    $('label.active').removeClass('active')

    setTimeout(() => {
      $scope.data = {
        presionAcostada: $('#mayor65-parterialAcostado').val(),
        presionSentado: $('#mayor65-parterialSentada').val(),
        temperatura: $('#mayor65-temperatura').val(),
        pulso7: $('#mayor65-pulso7min').val(),
        frecuencia: $('#mayor65-frecuencia').val(),
        peso: $('#mayor65-peso').val(),
        talla: $('#mayor65-talla').val(),
        imc: $('#mayor65-imc').val(),
        perimetroCintura: $('#mayor65-perimetroCintura').val(),
        perimetroCadera: $('#mayor65-perimetroCadera').val(),
        perimetroPantorrilla: $('#mayor65-perimetroPantorrilla').val(),
        responsables: $('#mayor65-responsables').val(),
        procedimiento: $('#formMayor65-procedimiento').val(),
        grupoPrioritado: $('#formMayor65-grupoPrioritado').val(),
        turno,
        historiaClinica: id,
        id: $('#idAdultoMayor65').val(),
      }
    }, 300)
  }

  $scope.save = () => {

    if (validForm()) {
      let checked = document.querySelector('.checkedAdulto:checked')
      $scope.data.tamizajeRapido = checked.value
      $http.post('src/enfermera/signos-vitales/service/save-adulto-65.php', $scope.data)
      .then(response => {
        console.log(response);
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
    $scope.data = {
      presionAcostada: $('#mayor65-parterialAcostado').val(),
      presionSentado: $('#mayor65-parterialSentada').val(),
      temperatura: $('#mayor65-temperatura').val(),
      pulso7: $('#mayor65-pulso7min').val(),
      frecuencia: $('#mayor65-frecuencia').val(),
      peso: $('#mayor65-peso').val(),
      talla: $('#mayor65-talla').val(),
      imc: $('#mayor65-imc').val(),
      perimetroCintura: $('#mayor65-perimetroCintura').val(),
      perimetroCadera: $('#mayor65-perimetroCadera').val(),
      perimetroPantorrilla: $('#mayor65-perimetroPantorrilla').val(),
      responsables: $('#mayor65-responsables').val(),
      procedimiento: $('#formMayor65-procedimiento').val(),
      grupoPrioritado: $('#formMayor65-grupoPrioritado').val(),
      turno,
      historiaClinica: id,
      id: $('#idAdultoMayor65').val(),
    }

    if (!$scope.data.presionAcostada) {
      $('#mayor65-presionAcostada').focus()
      Materialize.toast('Ingrese el presion acostada', 4000)
      return false
    }
    if (!$scope.data.presionSentado) {
      $('#mayor65-presionSentado').focus()
      Materialize.toast('Ingrese el presion sentado', 4000)
      return false
    }
    if (!$scope.data.temperatura) {
      $('#mayor65-temperatura').focus()
      Materialize.toast('Ingrese la temperatura', 4000)
      return false
    }
    if (!$scope.data.pulso7) {
      $('#mayor65-pulso7min').focus()
      Materialize.toast('Ingrese el pulso', 4000)
      return false
    }
    if (!$scope.data.frecuencia) {
      $('#mayor65-frecuencia').focus()
      Materialize.toast('Ingrese la frecuencia', 4000)
      return false
    }
    if (!$scope.data.peso) {
      $('#mayor65-peso').focus()
      Materialize.toast('Ingrese el peso', 4000)
      return false
    }
    if (!$scope.data.talla) {
      $('#mayor65-talla').focus()
      Materialize.toast('Ingrese la talla', 4000)
      return false
    }
    if (!$scope.data.imc) {
      $('#mayor65-imc').focus()
      Materialize.toast('Ingrese el imc', 4000)
      return false
    }
    if (!$scope.data.perimetroCintura) {
      $('#mayor65-perimetroCintura').focus()
      Materialize.toast('Ingrese el perimetro cintura', 4000)
      return false
    }
    if (!$scope.data.perimetroCadera) {
      $('#mayor65-perimetroCadera').focus()
      Materialize.toast('Ingrese el perimetro cadera', 4000)
      return false
    }
    if (!$scope.data.perimetroPantorrilla) {
      $('#mayor65-perimetroPantorrilla').focus()
      Materialize.toast('Ingrese el perimetro pantorrilla', 4000)
      return false
    }
    if (!$scope.data.responsables) {
      $('#mayor65-responsables').focus()
      Materialize.toast('Ingrese el responsables', 4000)
      return false
    }
    if (!document.querySelector('.checkedAdulto:checked')) {
      Materialize.toast('Selecione el tamizaje pàpido', 4000)
      return false
    }
    if (!$scope.data.procedimiento) {
      $('#formMayor65-procedimiento').focus()
      Materialize.toast('Ingrese el procedimiento', 4000)
      return false
    }
    if (!$scope.data.grupoPrioritado) {
      $('#formMayor65-grupoPrioritado').focus()
      Materialize.toast('Ingrese el grupo prioritario', 4000)
      return false
    }
    else return true
  }
})
