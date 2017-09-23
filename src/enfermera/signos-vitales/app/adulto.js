'use strict'

angular.module('Hospital')
.controller('AdultCtrlSignos', function ($scope, $http, $stateParams) {
  const id = $stateParams.id
  const turno = $stateParams.turno

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
    id: ''
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
      turno,
      historiaClinica: id,
      id: ''
    }
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
      id: ''
    }
  }

  $scope.save = () => {
    let checked = document.querySelector('.checkedAdulto:checked')
    $scope.data.tamizajeRapido = checked.value

    console.log($scope.data)

    $http.post('src/enfermera/signos-vitales/service/save-adulto-65.php', $scope.data)
    .then(response => {
      console.log(response)
      if (response.data === "201") {
        $scope.activeSignosBtn = true
        Materialize.toast('Se ha guarado con exito', 4000)
        closeForm()
        localStorage.setItem('activar', true)
        $http.get(`src/enfermera/signos-vitales/service/getAll.php?id=${id}`)
        .then(response => $scope.signosVitales = response.data)
      }

    })
  }

})
