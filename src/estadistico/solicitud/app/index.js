'use strict'

angular.module('Hospital')
.controller('solicitudAdminisionCtrl', function ($scope, $http) {
  $scope.solicitud = []

  $http.get('src/estadistico/solicitud/service/solicitud.php')
  .then(response => $scope.solicitud = response.data)
})
