'use strict'


const paises = angular.module('Hospital')

paises.controller('paisController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $scope.data = { pais: '', id: '' }
  $scope.paises = []

  $http.get('src/datos/paises/service/getAll.php')
    .then(response => $scope.paises = response.data )

  $scope.handleShowForm = function (e) {
    $('.formContainer').slideDown()
  }
  $scope.handleCancel = function (e) {
    $scope.data = { pais: '', id: '' }
    $('.formContainer').slideUp()
  }
  $scope.handleSave = function (e) {
    if ($scope.data.pais == "") {
      Materialize.toast("Ingresa el pais", 4000)
      return false
    }
    $http.post("src/datos/paises/service/save.php", { 'pais': $scope.data.pais, 'id': $scope.data.id })
      .then(response => {
        console.log(response)
        if (response.data == 201) {
          Materialize.toast("Se ha guardado con exito", 4000)
          $scope.data = { pais: '', id: '' }
          $('.formContainer').slideUp()
          $http.get('src/datos/paises/service/getAll.php')
            .then(response =>$scope.paises = response.data)
        }
      })
  }

  $scope.get = function (id, pais) {
    $scope.data = { pais: pais, id: id }
    $('.formContainer').slideDown()
  }

  $scope.delete = function (id) {
    $http.post("src/datos/paises/service/delete.php", { id })
      .then(response => {
        if (response.data == 201) {
          Materialize.toast("Se ha eliminado con exito", 4000)
          $http.get('src/datos/paises/service/getAll.php')
            .then(response => $scope.paises = response.data)
        }
      })
  }
})
