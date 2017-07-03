'use strict'

const generos = angular.module('Hospital')

generos.controller('generosController', function ($scope, $http) {
	$('.formContainer').slideUp()
	$scope.data = { genero: '', id: '' }
	$scope.generos = []

	$http.get('src/datos/generos/service/getAll.php')
		.then(response => $scope.generos = response.data )

	$scope.handleShowForm = function (e) {
		$('.formContainer').slideDown()
	}
	$scope.handleCancel = function (e) {
		$scope.data = { genero: '', id: '' }
		$('.formContainer').slideUp()
	}
	$scope.handleSave = function (e) {
		if ($scope.data.genero == "") {
			Materialize.toast("Ingresa el genero", 4000)
			return false
		}
		$http.post("src/datos/generos/service/save.php", { 'genero': $scope.data.genero, 'id': $scope.data.id })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		Materialize.toast("Se ha guardado con exito", 4000)
      		$scope.data = { genero: '', id: '' }
					$('.formContainer').slideUp()
					$http.get('src/datos/generos/service/getAll.php')
						.then(response =>$scope.generos = response.data)
      	}
      })
	}

	$scope.get = function (id, genero) {
		$scope.data = { genero: genero, id: id }
		$('.formContainer').slideDown()
	}

	$scope.delete = function (id) {
		$http.post("src/datos/generos/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		Materialize.toast("Se ha eliminado con exito", 4000)
					$http.get('src/datos/generos/service/getAll.php')
						.then(response => $scope.generos = response.data)
      	}
      })
	}
})
