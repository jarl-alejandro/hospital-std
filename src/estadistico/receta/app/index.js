'use strict'

angular.module('Hospital')
.controller('RecetaAdmisionCtrl', function ($scope, $http) {
  $scope.recetas = []

  $http.get('src/estadistico/receta/service/recetas.php')
  .then(response => $scope.recetas = response.data)
})
