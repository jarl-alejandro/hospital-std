'use strict'


const sitemasFiscos = angular.module('Hospital')

sitemasFiscos.controller('sitemasFiscosController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $scope.data = { tipo: '', detalle: '', id: '' }
  $scope.sitemasFiscos = []

  $http.get('src/archivos/sistemas-fisicos/service/getAll.php')
    .then(response => $scope.sitemasFiscos = response.data )

  $scope.handleShowForm = function (e) {
    $('.formContainer').slideDown()
  }
  $scope.handleCancel = function (e) {
    $scope.data = { tipo: '', detalle: '', id: '' }
    $('.formContainer').slideUp()
  }
  $scope.handleSave = function (e) {
    if ($scope.data.tipo === "") {
      Materialize.toast("Ingresa el tipo", 4000)
      return false
    }
    if ($scope.data.detalle === "") {
      Materialize.toast("Ingresa el detalle", 4000)
      return false
    }

    $http.post("src/archivos/sistemas-fisicos/service/save.php", {
      'tipo': $scope.data.tipo,
      'detalle': $scope.data.detalle,
      'id': $scope.data.id
    }).then(response => {
      if (response.data == 201) {
        Materialize.toast("Se ha guardado con exito", 4000)
        $scope.data = { tipo: '', detalle: '', id: '' }
        $('.formContainer').slideUp()
        $http.get('src/archivos/sistemas-fisicos/service/getAll.php')
          .then(response => $scope.sitemasFiscos = response.data)
      }
    })
  }

  $scope.get = function (tipo, detalle, id) {
    $scope.data = { tipo: tipo.toString(), detalle, id }
    $('.formContainer').slideDown()
  }

  $scope.delete = function (id) {
    $http.post("src/archivos/sistemas-fisicos/service/delete.php", { id })
    .then(response => {
      if (response.data == 201) {
        Materialize.toast("Se ha eliminado con exito", 4000)
        $http.get('src/archivos/sistemas-fisicos/service/getAll.php')
          .then(response => $scope.sitemasFiscos = response.data)
      }
    })
  }

  $scope.renderType = function (type) {
    let name = ''
    if (type === 1) name = 'Revision actual de organos y sistemas'
    else if (type === 2) name = 'Examen Físico'
    else if (type === 3) name = 'Antecedentes Maternales'
    else if (type === 4) name = 'Antecedentes Familiares'
    else if (type === 5) name = 'Antecedentes Prenatales'
    else if (type === 6) name = 'Nacimiento'
    else if (type === 7) name = 'Recien Nacido'
    return name
  }
})
