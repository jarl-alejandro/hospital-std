'use strict'


const paises = angular.module('Hospital')

paises.controller('paisController', function ($scope, toaster, $http) {
	$scope.showForm = false
	$scope.data = { pais: '', id: '' }
	$scope.paises = []

	$http.get('src/datos/paises/service/getAll.php')
		.then(response => $scope.paises = response.data )

	$scope.handleShowForm = function (e) {
		$scope.showForm = true
	}
	$scope.handleCancel = function (e) {
		$scope.data = { pais: '', id: '' }
		$scope.showForm = false
	}
	$scope.handleSave = function (e) {
		if ($scope.data.pais == "") {
			toaster.pop('error', "Error", "Ingresa el pais")
			return false
		}
		$http.post("src/datos/paises/service/save.php", { 'pais': $scope.data.pais, 'id': $scope.data.id })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha guardado con exito")
      		$scope.data = { pais: '', id: '' }
					$scope.showForm = false
					$http.get('src/datos/paises/service/getAll.php')
						.then(response =>$scope.paises = response.data)
      	}
      })
	}

	$scope.get = function (id, pais) {
		$scope.data = { pais: pais, id: id }
		$scope.showForm = true
	}

	$scope.delete = function (id) {
		$http.post("src/datos/paises/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha eliminado con exito")
					$http.get('src/datos/paises/service/getAll.php')
						.then(response => $scope.paises = response.data)
      	}
      })
	}
})
