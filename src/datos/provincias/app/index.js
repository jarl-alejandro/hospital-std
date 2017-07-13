'use strict'


const provincias = angular.module('Hospital')

provincias.controller('provinciasController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $scope.data = { provincia: '', id: '', pais: '', zona:'' }
  $scope.provincias = []
  $scope.paises = []
  $scope.zonas = []
  $('.browser-default').select2()

  $http.get('src/datos/provincias/service/zonas.php')
    .then(response => $scope.zonas = response.data)

  $http.get('src/datos/provincias/service/getAll.php')
    .then(response => $scope.provincias = response.data )

  $http.get('src/datos/paises/service/getAll.php')
    .then(response => $scope.paises = response.data )

  $scope.handleShowForm = function (e) {
    $('.formContainer').slideDown()
  }

  $scope.handleCancel = function (e) {
    $scope.data = { provincia: '', id: '', pais: '', zona:'' }
    $('.formContainer').slideUp()
    setTimeout(() => {
      $('#pais').val('').trigger('change')
      $('#zonas').val('').trigger('change')
    }, 100)
  }

  $scope.handleSave = function (e) {
    if ($scope.data.provincia == "") {
      Materialize.toast("Ingresa la provincia", 4000)
      return false
    }
    if ($scope.data.pais == "") {
      Materialize.toast("Ingresa el pais", 4000)
      return false
    }
    if ($scope.data.zona === '') {
      Materialize.toast('Selecione la zona', 4000)
      return false
    }

    $http.post("src/datos/provincias/service/save.php", {
      'provincia': $scope.data.provincia,
      'id': $scope.data.id,
      'pais': $scope.data.pais,
      'zona': $scope.data.zona
    }).then(response => {
        console.log(response)
        if (response.data == 201) {
          Materialize.toast("Se ha guardado con exito", 4000)
          $scope.data = { provincias: '', id: '', pais: '', zona:'' }
          $('.formContainer').slideUp()
          $http.get('src/datos/provincias/service/getAll.php')
            .then(response =>$scope.provincias = response.data)
        }
      })
  }

  $scope.get = function (id, provincia, pais, zona) {
    $scope.data = { provincia, id, pais, zona }
    setTimeout(() => {
      $('#pais').val(pais).trigger('change')
      $('#zonas').val(zona).trigger('change')
    }, 100)
    $('.formContainer').slideDown()
  }

  $scope.delete = function (id) {
    $http.post("src/datos/provincias/service/delete.php", { id })
      .then(response => {
        if (response.data == 201) {
          Materialize.toast("Se ha eliminado con exito", 4000)
          $http.get('src/datos/provincias/service/getAll.php')
            .then(response => $scope.provincias = response.data)
        }
      })
  }
})
