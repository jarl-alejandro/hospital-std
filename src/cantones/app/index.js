'use strict'


const cantones = angular.module('Hospital')

cantones.controller('cantonesController', function ($scope, toaster, $http) {
	$scope.showForm = false
	$scope.data = { provincia: '', id: '', canton: '' }
  $scope.cantones = []
	$scope.provincias = []

	$http.get('src/cantones/service/getAll.php')
		.then(response => $scope.cantones = response.data )

  $http.get('src/provincias/service/getAll.php')
    .then(response => $scope.provincias = response.data )

	$scope.handleShowForm = function (e) {
		$scope.showForm = true
	}
	$scope.handleCancel = function (e) {
		$scope.data = { provincia: '', id: '', canton: '' }
		$scope.showForm = false
	}
	$scope.handleSave = function (e) {
		if ($scope.data.canton == "") {			
			toaster.pop('error', "Error", "Ingresa el canton")
			return false
		}
    if ($scope.data.provincia == "") {      
      toaster.pop('error', "Error", "Ingresa la provincia")
      return false
    }
		$http.post("src/cantones/service/save.php", 
      { 'provincia': $scope.data.provincia, 'id': $scope.data.id, 'canton': $scope.data.canton })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha guardado con exito")
      		$scope.data = { canton: '', id: '', provincia: '' }
					$scope.showForm = false
					$http.get('src/cantones/service/getAll.php')
						.then(response =>$scope.cantones = response.data)
      	}
      })
	}

	$scope.get = function (id, canton, provincia) {
		$scope.data = { provincia, id, canton }
		$scope.showForm = true
	}

	$scope.delete = function (id) {
		$http.post("src/cantones/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha eliminado con exito")
					$http.get('src/cantones/service/getAll.php')
						.then(response => $scope.cantones = response.data)
      	}
      })
	}
})