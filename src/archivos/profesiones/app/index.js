'use strict'


const profesiones = angular.module('Hospital')

profesiones.controller('profesionesController', function ($scope, toaster, $http) {
	$scope.showForm = false
	$scope.data = { profesion: '', id: '' }
	$scope.profesiones = []

	$http.get('src/archivos/profesiones/service/getAll.php')
		.then(response => $scope.profesiones = response.data )

	$scope.handleShowForm = function (e) {
		$scope.showForm = true
	}
	$scope.handleCancel = function (e) {
		$scope.data = { profesion: '', id: '' }
		$scope.showForm = false
	}
	$scope.handleSave = function (e) {
		if ($scope.data.profesion == "") {
			toaster.pop('error', "Error", "Ingresa el profesion")
			return false
		}
		$http.post("src/archivos/profesiones/service/save.php", { 'profesion': $scope.data.profesion, 'id': $scope.data.id })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha guardado con exito")
      		$scope.data = { profesion: '', id: '' }
					$scope.showForm = false
					$http.get('src/archivos/profesiones/service/getAll.php')
						.then(response =>$scope.profesiones = response.data)
      	}
      })
	}

	$scope.get = function (id, profesion) {
		$scope.data = { profesion, id }
		$scope.showForm = true
	}

	$scope.delete = function (id) {
		$http.post("src/archivos/profesiones/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha eliminado con exito")
					$http.get('src/archivos/profesiones/service/getAll.php')
						.then(response => $scope.profesiones = response.data)
      	}
      })
	}
})
