'use strict'

angular.module('Hospital')
.controller('AdultMenorCtrlSignos', function ($scope, $http, $stateParams) {
  const id = $stateParams.id
  const turno = $stateParams.turno

  $scope.procedimientos = []

  $http.get('src/datos/procedimientos/service/getAll.php')
  .then(response => $scope.procedimientos = response.data )

  let date = new Date()
  $scope.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  let monthIndex = date.getMonth()
  let month = $scope.months[monthIndex]
  $scope.fecha = `${date.getDate()} de ${month} del ${date.getFullYear()}`

  $scope.formMenor65 = {
    temperatura: $('#formMenor65-temperatura').val(),
    presionArterial: $('#formMenor65-presionArterial').val(),
    pulso: $('#formMenor65-pulso').val(),
    frecuencia: $('#formMenor65-frecuencia').val(),
    peso: $('#formMenor65-peso').val(),
    talla: $('#formMenor65-talla').val(),
    procedimiento: $('#formMenor65-procedimiento').val(),
    grupoPrioritado: $('#formMenor65-grupoPrioritado').val(),
    historiaClinica: id,
    id: $('#idAdultoMenor65').val(),
    turno
  }

  $scope.cerrarMenor65 = () => {
    $('#formPlusAdultoMenor65').slideUp()
    $('#formMenor65-temperatura').val('')
    $('#formMenor65-presionArterial').val('')
    $('#formMenor65-pulso').val('')
    $('#formMenor65-frecuencia').val('')
    $('#formMenor65-peso').val('')
    $('#formMenor65-talla').val('')
    $('#formMenor65-procedimiento').val('')
    $('#formMenor65-grupoPrioritado').val('')
    $('#idAdultoMenor65').val('')

    $scope.formMenor65 = {
      temperatura: $('#formMenor65-temperatura').val(),
      presionArterial: $('#formMenor65-presionArterial').val(),
      pulso: $('#formMenor65-pulso').val(),
      frecuencia: $('#formMenor65-frecuencia').val(),
      peso: $('#formMenor65-peso').val(),
      talla: $('#formMenor65-talla').val(),
      procedimiento: $('#formMenor65-procedimiento').val(),
      grupoPrioritado: $('#formMenor65-grupoPrioritado').val(),
      historiaClinica: id,
      id: $('#idAdultoMenor65').val(),
      turno
    }
    // setTimeout(() => {}, 100)
  }

  $scope.saveMenor65 = () => {
    if (validaForm()) {
      $http.post('src/enfermera/signos-vitales/service/save-menor-65.php', $scope.formMenor65)
      .then(response => {
        if (response.data === '201') {
          localStorage.setItem('activar', true)
          $scope.cerrarMenor65()
          Materialize.toast('Se ha guardado con exito', 4000)
          // setTimeout(() => location.reload(), 300)
        }
        else {
          Materialize.toast('Tenemos problemas', 4000)
          console.log(response)
        }
      })
    }
  }

  function validaForm () {
    $scope.formMenor65 = {
      temperatura: $('#formMenor65-temperatura').val(),
      presionArterial: $('#formMenor65-presionArterial').val(),
      pulso: $('#formMenor65-pulso').val(),
      frecuencia: $('#formMenor65-frecuencia').val(),
      peso: $('#formMenor65-peso').val(),
      talla: $('#formMenor65-talla').val(),
      procedimiento: $('#formMenor65-procedimiento').val(),
      grupoPrioritado: $('#formMenor65-grupoPrioritado').val(),
      historiaClinica: id,
      id: $('#idAdultoMenor65').val(),
      turno
    }

    let form = $scope.formMenor65

    if (!form.temperatura.trim()) {
      $('#formMenor65-temperatura').focus()
      Materialize.toast('Ingrese la temperatura', 4000)
      return false
    }
    if (!form.presionArterial.trim()) {
      $('#formMenor65-presionArterial').focus()
      Materialize.toast('Ingrese la presion arterial', 4000)
      return false
    }
    if (!form.pulso.trim()) {
      $('#formMenor65-pulso').focus()
      Materialize.toast('Ingrese la pulso', 4000)
      return false
    }
    if (!form.frecuencia.trim()) {
      $('#formMenor65-frecuencia').focus()
      Materialize.toast('Ingrese la frecuencia', 4000)
      return false
    }
    if (!form.peso.trim()) {
      $('#formMenor65-peso').focus()
      Materialize.toast('Ingrese la peso', 4000)
      return false
    }
    if (!form.talla.trim()) {
      $('#formMenor65-talla').focus()
      Materialize.toast('Ingrese la talla', 4000)
      return false
    }
    if (!form.procedimiento.trim()) {
      $('#formMenor65-procedimiento').focus()
      Materialize.toast('Ingrese la procedimiento', 4000)
      return false
    }
    if (!form.grupoPrioritado.trim()) {
      $('#formMenor65-grupoPrioritado').focus()
      Materialize.toast('Ingrese la grupo prioritario', 4000)
      return false
    }
    else return true
  }

})
