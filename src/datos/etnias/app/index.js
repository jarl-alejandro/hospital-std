'use strict'


const etnias = angular.module('Hospital')

etnias.controller('etniasController', function ($scope, toaster, $http) {
	$('.formContainer').slideUp()
	$scope.data = { etnia: '', id: '' }
	$scope.etnias = []

	$http.get('src/datos/etnias/service/getAll.php')
		.then(response => $scope.etnias = response.data )

	$scope.handleShowForm = function (e) {
		$('.formContainer').slideDown()
	}
	$scope.handleCancel = function (e) {
		$scope.data = { pais: '', id: '' }
		$('.formContainer').slideUp()
	}
	$scope.handleSave = function (e) {
		if ($scope.data.etnia == "") {
			Materialize.toast("Ingresa el etnia", 4000)
			return false
		}
		$http.post("src/datos/etnias/service/save.php", { 'etnia': $scope.data.etnia, 'id': $scope.data.id })
      .then(response => {
      	console.log(response)
					$scope.etnias = []
      	if (response.data == 201) {
      		Materialize.toast("Se ha guardado con exito", 4000)
      		$scope.data = { etnia: '', id: '' }
					$('.formContainer').slideUp()
					$http.get('src/datos/etnias/service/getAll.php')
						.then(response => $scope.etnias = response.data)
      	}
      })
	}

	$scope.get = function (id, etnia) {
		$scope.data = { etnia: etnia, id: id }
		$('.formContainer').slideDown()
	}

	$scope.delete = function (id) {
		$http.post("src/datos/etnias/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		Materialize.toast("Se ha eliminado con exito", 4000)
					$http.get('src/datos/etnias/service/getAll.php')
						.then(response => $scope.etnias = response.data)
      	}
      })
	}
})
