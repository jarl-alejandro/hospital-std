'use strict'


const generos = angular.module('Hospital')

generos.controller('generosController', function ($scope, toaster, $http) {
	$scope.showForm = false
	$scope.data = { genero: '', id: '' }
	$scope.generos = []

	$http.get('src/generos/service/getAll.php')
		.then(response => $scope.generos = response.data )

	$scope.handleShowForm = function (e) {
		$scope.showForm = true
	}
	$scope.handleCancel = function (e) {
		$scope.data = { genero: '', id: '' }
		$scope.showForm = false
	}
	$scope.handleSave = function (e) {
		if ($scope.data.genero == "") {
			toaster.pop('error', "Error", "Ingresa el genero")
			return false
		}
		$http.post("src/generos/service/save.php", { 'genero': $scope.data.genero, 'id': $scope.data.id })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha guardado con exito")
      		$scope.data = { genero: '', id: '' }
					$scope.showForm = false
					$http.get('src/generos/service/getAll.php')
						.then(response =>$scope.generos = response.data)
      	}
      })
	}

	$scope.get = function (id, genero) {
		$scope.data = { genero: genero, id: id }
		$scope.showForm = true
	}

	$scope.delete = function (id) {
		$http.post("src/generos/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha eliminado con exito")
					$http.get('src/generos/service/getAll.php')
						.then(response => $scope.generos = response.data)
      	}
      })
	}
})