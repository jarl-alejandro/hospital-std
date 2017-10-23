'use strict'

const atendidos = angular.module('Hospital')

atendidos.controller('atendidosController', function ($scope, $http, $location) {
  $scope.pacientes = []

  $http.get('src/doctor/atendidos/service/getAll.php')
  .then(response =>{
    $scope.pacientes = response.data
    console.log(response.data);
  })

  $scope.handlePrint = turno => {
    window.open (`src/doctor/atendidos/reporte/form28A.php?turno=${turno}`,
      "_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=60, width=1200, height=600")
  }

  $scope.handleEdit = turno => {
    console.log(turno);

    if (turno.hgc_tipo_form === '056') {
      $location.path(`/form056/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/edit`)
    }
    else if (turno.hgc_tipo_form === 'hojadev') {
      $location.path(`/hoja-devolucion/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/edit`)
    }
    else if (turno.hgc_tipo_form === 'form28A') {
      $location.path(`/form28A/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/edit`)
    }
    else if (turno.hgc_tipo_form === 'form28C') {
      $location.path(`/form28C/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/edit`)
    }
    else if (turno.hgc_tipo_form === 'mayor') {
      $location.path(`/adulto-mayor/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/edit`)
    }
    else if (turno.hgc_tipo_form === 'may65') {
      $location.path(`/adulto-mayor-65/${turno.hgc_paci_turno}/${turno.hgc_id_turno}/edit`)
    }
    else Materialize.toast('Esta en proceso...', 4000)
  }

})
