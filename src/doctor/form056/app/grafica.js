'use strict'

angular.module('Hospital')
.controller('formGraphic056ABCtrl', function ($scope, $http, $stateParams) {

  $scope.paciente = {}

  $http.get(`src/doctor/form056/service/paciente.php?id=${$stateParams.id}`)
  .then(response => {
    $scope.paciente = response.data.paciente
    $scope.sexo = response.data.sexo.hgc_desc_genero
    $scope.title = $scope.sexo === 'Mujer' ? 'FORM. 056 A' : 'FORM. 056 B'

    if ($scope.sexo === 'Mujer') {
      $('.imc__img').attr('src', 'assets/img/graficas/mujeres/indice-masa-corporal.jpg')
      $('.evolucionMaduracion__img').attr('src', 'assets/img/graficas/mujeres/tanner.jpg')
      $('.velocidadCrecimiento__img').attr('src', 'assets/img/graficas/hombres/velocidad-de-crecimiento.jpg')
    }
    else {
      $('.imc__img').attr('src', 'assets/img/graficas/hombres/indice-de-masa-corporal.jpg')
      $('.evolucionMaduracion__img').attr('src', 'assets/img/graficas/hombres/tanner-hombres.jpg')
      $('.velocidadCrecimiento__img').attr('src', 'assets/img/graficas/hombres/velocidad-de-crecimiento.jpg')
    }

  })
})
