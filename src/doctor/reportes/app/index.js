'use strict'

angular.module('Hospital')
.controller('reportesController', function ($scope, $http, $location) {
  $scope.pacientes = []

  $http.get('src/doctor/reportes/service/getAll.php')
  .then(response =>{
    $scope.pacientes = response.data
    console.log(response.data);
  })

  $scope.handlePrint = turno => {
    if (turno.hgc_tipo_form === '056') {
      window.open (`${URL_REPORTES}/form056/${turno.hgc_paci_turno}/${turno.hgc_id_turno}`,
        "_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=60, width=1200, height=600")
    }
    else if (turno.hgc_tipo_form === 'hojadev') {
      window.open (`${URL_REPORTES}/hojadev/${turno.hgc_paci_turno}/${turno.hgc_id_turno}`,
        "_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=60, width=1200, height=600")
    }
    else if (turno.hgc_tipo_form === 'form28A') {
      window.open (`${URL_REPORTES}/form28A/${turno.hgc_paci_turno}/${turno.hgc_id_turno}`,
        "_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=60, width=1200, height=600")
    }
    else if (turno.hgc_tipo_form === 'form28C') {
      window.open (`${URL_REPORTES}/form28C/${turno.hgc_paci_turno}/${turno.hgc_id_turno}`,
        "_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=60, width=1200, height=600")
    }
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
    else Materialize.toast('Esta en proceso...', 4000)
  }

})
