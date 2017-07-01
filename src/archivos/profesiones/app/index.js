'use strict'


const profesiones = angular.module('Hospital')

profesiones.controller('profesionesController', function ($scope, toaster, $http) {
	$('.formContainer').slideUp()
	$scope.data = { profesion: '', id: '' }
	$scope.profesiones = []

	$http.get('src/archivos/profesiones/service/getAll.php')
		.then(response => $scope.profesiones = response.data )

	$scope.handleShowForm = function (e) {
		$('.formContainer').slideDown()
	}
	$scope.handleCancel = function (e) {
		$scope.data = { profesion: '', id: '' }
		$('.formContainer').slideUp()
	}
	$scope.handleSave = function (e) {
		if ($scope.data.profesion == "") {
			Materialize.toast("Ingresa el profesion", 4000)
			return false
		}
		$http.post("src/archivos/profesiones/service/save.php", { 'profesion': $scope.data.profesion, 'id': $scope.data.id })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		Materialize.toast("Se ha guardado con exito", 4000)
      		$scope.data = { profesion: '', id: '' }
					$('.formContainer').slideUp()
					$http.get('src/archivos/profesiones/service/getAll.php')
						.then(response =>$scope.profesiones = response.data)
      	}
      })
	}

	$scope.get = function (id, profesion) {
		$scope.data = { profesion, id }
		$('.formContainer').slideDown()
	}

	$scope.delete = function (id) {
		$http.post("src/archivos/profesiones/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		Materialize.toast("Se ha eliminado con exito", 4000)
					$http.get('src/archivos/profesiones/service/getAll.php')
						.then(response => $scope.profesiones = response.data)
      	}
      })
	}
})
