'use strict'

angular.module('Hospital')
.controller('AdultCtrlSignos', function ($scope, $http) {

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
  }

  $scope.cerrar = () => {
    $('#formPlusAdultoMayor65').slideUp()
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
    }
  }
  $scope.save = () => {
    let checked = document.querySelector('.checkedAdulto:checked')
    $scope.data.tamizajeRapido = checked.value
    $scope.data.id = ''

    console.log($scope.data)

    $http.post('src/enfermera/signos-vitales/service/save-adulto-65.php', $scope.data)
    .then(response => {
      console.log(response)
    })
  }

})