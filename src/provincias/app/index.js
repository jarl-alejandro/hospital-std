'use strict'


const provincias = angular.module('Hospital')

provincias.controller('provinciasController', function ($scope, toaster, $http) {
	$scope.showForm = false
	$scope.data = { provincia: '', id: '', pais: '' }
  $scope.provincias = []
	$scope.paises = []

	$http.get('src/provincias/service/getAll.php')
		.then(response => $scope.provincias = response.data )

  $http.get('src/paises/service/getAll.php')
    .then(response => $scope.paises = response.data )

	$scope.handleShowForm = function (e) {
		$scope.showForm = true
	}
	$scope.handleCancel = function (e) {
		$scope.data = { provincia: '', id: '', pais: '' }
		$scope.showForm = false
	}
	$scope.handleSave = function (e) {
		if ($scope.data.provincia == "") {			
			toaster.pop('error', "Error", "Ingresa la provincia")
			return false
		}
    if ($scope.data.pais == "") {      
      toaster.pop('error', "Error", "Ingresa el pais")
      return false
    }
		$http.post("src/provincias/service/save.php", 
      { 'provincia': $scope.data.provincia, 'id': $scope.data.id, 'pais': $scope.data.pais })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha guardado con exito")
      		$scope.data = { provincias: '', id: '', pais: '' }
					$scope.showForm = false
					$http.get('src/provincias/service/getAll.php')
						.then(response =>$scope.provincias = response.data)
      	}
      })
	}

	$scope.get = function (id, provincia, pais) {
		$scope.data = { provincia, id, pais }
		$scope.showForm = true
	}

	$scope.delete = function (id) {
		$http.post("src/provincias/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha eliminado con exito")
					$http.get('src/provincias/service/getAll.php')
						.then(response => $scope.provincias = response.data)
      	}
      })
	}
})