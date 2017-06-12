'use strict'


const etnias = angular.module('Hospital')

etnias.controller('etniasController', function ($scope, toaster, $http) {
	$scope.showForm = false
	$scope.data = { etnia: '', id: '' }
	$scope.etnias = []

	$http.get('src/datos/etnias/service/getAll.php')
		.then(response => $scope.etnias = response.data )

	$scope.handleShowForm = function (e) {
		$scope.showForm = true
	}
	$scope.handleCancel = function (e) {
		$scope.data = { pais: '', id: '' }
		$scope.showForm = false
	}
	$scope.handleSave = function (e) {
		if ($scope.data.etnia == "") {
			toaster.pop('error', "Error", "Ingresa el etnia")
			return false
		}
		$http.post("src/datos/etnias/service/save.php", { 'etnia': $scope.data.etnia, 'id': $scope.data.id })
      .then(response => {
      	console.log(response)
					$scope.etnias = []
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha guardado con exito")
      		$scope.data = { etnia: '', id: '' }
					$scope.showForm = false
					$http.get('src/datos/etnias/service/getAll.php')
						.then(response => $scope.etnias = response.data)
      	}
      })
	}

	$scope.get = function (id, etnia) {
		$scope.data = { etnia: etnia, id: id }
		$scope.showForm = true
	}

	$scope.delete = function (id) {
		$http.post("src/datos/etnias/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha eliminado con exito")
					$http.get('src/datos/etnias/service/getAll.php')
						.then(response => $scope.etnias = response.data)
      	}
      })
	}
})
