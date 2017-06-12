'use strict'

const barrios = angular.module('Hospital')

barrios.controller('barriosController', function ($scope, toaster, $http) {
	$scope.showForm = false
	$scope.data = { barrio: '', id: '', parroquia: '' }
  $scope.barrios = []
	$scope.parroquias = []

	$http.get('src/datos/barrios/service/getAll.php')
		.then(response => $scope.barrios = response.data )

  $http.get('src/datos/parroquia/service/getAll.php')
    .then(response => $scope.parroquias = response.data )

	$scope.handleShowForm = function (e) {
		$scope.showForm = true
	}
	$scope.handleCancel = function (e) {
		$scope.data = { barrio: '', id: '', parroquia: '' }
		$scope.showForm = false
	}
	$scope.handleSave = function (e) {
		if ($scope.data.barrio == "") {
			toaster.pop('error', "Error", "Ingresa el barrio")
			return false
		}
    if ($scope.data.parroquia == "") {
      toaster.pop('error', "Error", "Ingresa la parroquia")
      return false
    }
		$http.post("src/datos/barrios/service/save.php",
      { 'barrio': $scope.data.barrio, 'id': $scope.data.id, 'parroquia': $scope.data.parroquia })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha guardado con exito")
      		$scope.data = { barrio: '', id: '', parroquia: '' }
					$scope.showForm = false
					$http.get('src/datos/barrios/service/getAll.php')
						.then(response =>$scope.barrios = response.data)
      	}
      })
	}

	$scope.get = function (id, barrio, parroquia) {
		$scope.data = { barrio, id, parroquia }
		$scope.showForm = true
	}

	$scope.delete = function (id) {
		$http.post("src/datos/barrios/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha eliminado con exito")
					$http.get('src/datos/barrios/service/getAll.php')
						.then(response => $scope.barrios = response.data)
      	}
      })
	}
})
