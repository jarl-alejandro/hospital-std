'use strict'

angular.module('Hospital')
.controller('form06SaveCtrl', function ($scope, $http, $stateParams) {
  $scope.data = {
    paciente: $stateParams.id,
    turno: $stateParams.turno,
    enfermedadActual: '',
    planTratamiento: '',
    numerosCuartos: '',
    ocupacion: '',
  }


  $scope.saveForm = () => {
    const inputCompanion = document.querySelector('.Informacion-consulta-companion input:checked')
    const inputCivilStatus = document.querySelector('.Informacion-consulta-civilStatus input:checked')
    const listMotivo = [...document.querySelectorAll('.Motivo-consulta .consulta-cie--code input')]
    const listDiagnostico = [...document.querySelectorAll('.DiagnosticoCIE10 p input')]
    const listObservacion = [...document.querySelectorAll('.observacion')]
    const motivoConsulta = []
    const observaciones = []

    listMotivo.map(item => {
      motivoConsulta.push({
        tipo: item.id.split("-")[1] === 'company' ? 'company' : 'adolecente',
        valor: item.value
      })
    })

    listDiagnostico.map(item => {
      motivoConsulta.push({
        tipo: 'diagnostico',
        valor: item.value
      })
    })

    listObservacion.map(item => {
      observaciones.push({
        tipo: item.dataset.tipo,
        desc: item.value,
      })
    })

    $scope.data.companion = inputCompanion !== null ? inputCompanion.value : ''
    $scope.data.civilStatus = inputCivilStatus !== null ? inputCivilStatus.value : ''
    $scope.data.motivo = motivoConsulta
    $scope.data.observaciones = observaciones

    $http.post('src/doctor/form056/service/save.php', $scope.data)
    .then(response => {
      console.log(response)
    })
  }

})
