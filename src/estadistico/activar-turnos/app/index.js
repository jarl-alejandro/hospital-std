'use strict'

const turnosActivar = angular.module('Hospital')

turnosActivar.controller('turnosActiveController', function ($scope, $http, $location) {

  $scope.turnos = []
  
  $http.get('src/estadistico/activar-turnos/service/getAll.php')
    .then(response => $scope.turnos = response.data)

  $scope.handleActivar = function (id) {
    $http.post('src/estadistico/activar-turnos/service/update.php', { id })
      .then(response => {
        console.log(response)
        if (response.data === '201') {
          Materialize.toast('El turno esta activado', 4000)
          
          $http.get('src/estadistico/activar-turnos/service/getAll.php')
            .then(response => $scope.turnos = response.data)
        }
      })
  }

})
