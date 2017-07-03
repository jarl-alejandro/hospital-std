'use strict'

const parroquia = angular.module('Hospital')

parroquia.controller('parroquiaController', function ($scope, $http) {
	$('.formContainer').slideUp()
	$scope.data = { parroquia: '', id: '', canton: '' }
  $scope.parroquias = []
	$scope.cantones = []

	$http.get('src/datos/parroquia/service/getAll.php')
		.then(response => $scope.parroquias = response.data )

  $http.get('src/datos/cantones/service/getAll.php')
    .then(response => $scope.cantones = response.data )

	$scope.handleShowForm = function (e) {
		$('.formContainer').slideDown()
	}
	$scope.handleCancel = function (e) {
		$scope.data = { parroquia: '', id: '', canton: '' }
		$('.formContainer').slideUp()
	}
	$scope.handleSave = function (e) {
		if ($scope.data.parroquia == "") {
			Materialize.toast("Ingresa la parroquia", 4000)
			return false
		}
    if ($scope.data.canton == "") {
      Materialize.toast("Ingresa el canton", 4000)
      return false
    }
		$http.post("src/datos/parroquia/service/save.php",
      { 'canton': $scope.data.canton, 'id': $scope.data.id, 'parroquia': $scope.data.parroquia })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		Materialize.toast("Se ha guardado con exito", 4000)
      		$scope.data = { canton: '', id: '', parroquia: '' }
					$('.formContainer').slideUp()
					$http.get('src/datos/parroquia/service/getAll.php')
						.then(response =>$scope.parroquias = response.data)
      	}
      })
	}

	$scope.get = function (id, parroquia, canton) {
		$scope.data = { parroquia, id, canton }
		$('.formContainer').slideDown()
	}

	$scope.delete = function (id) {
		$http.post("src/datos/parroquia/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		Materialize.toast("Se ha eliminado con exito", 4000)
					$http.get('src/datos/parroquia/service/getAll.php')
						.then(response => $scope.parroquias = response.data)
      	}
      })
	}
})
