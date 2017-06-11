'use strict'

const parroquia = angular.module('Hospital')

parroquia.controller('parroquiaController', function ($scope, toaster, $http) {
	$scope.showForm = false
	$scope.data = { parroquia: '', id: '', canton: '' }
  $scope.parroquias = []
	$scope.cantones = []

	$http.get('src/parroquia/service/getAll.php')
		.then(response => $scope.parroquias = response.data )

  $http.get('src/cantones/service/getAll.php')
    .then(response => $scope.cantones = response.data )

	$scope.handleShowForm = function (e) {
		$scope.showForm = true
	}
	$scope.handleCancel = function (e) {
		$scope.data = { parroquia: '', id: '', canton: '' }
		$scope.showForm = false
	}
	$scope.handleSave = function (e) {
		if ($scope.data.parroquia == "") {
			toaster.pop('error', "Error", "Ingresa la parroquia")
			return false
		}
    if ($scope.data.canton == "") {
      toaster.pop('error', "Error", "Ingresa el canton")
      return false
    }
		$http.post("src/parroquia/service/save.php",
      { 'canton': $scope.data.canton, 'id': $scope.data.id, 'parroquia': $scope.data.parroquia })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha guardado con exito")
      		$scope.data = { canton: '', id: '', parroquia: '' }
					$scope.showForm = false
					$http.get('src/parroquia/service/getAll.php')
						.then(response =>$scope.parroquias = response.data)
      	}
      })
	}

	$scope.get = function (id, parroquia, canton) {
		$scope.data = { parroquia, id, canton }
		$scope.showForm = true
	}

	$scope.delete = function (id) {
		$http.post("src/parroquia/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha eliminado con exito")
					$http.get('src/parroquia/service/getAll.php')
						.then(response => $scope.parroquias = response.data)
      	}
      })
	}
})
