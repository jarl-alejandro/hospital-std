'use strict'

const barrios = angular.module('Hospital')

barrios.controller('barriosController', function ($scope, toaster, $http) {
	$('.formContainer').slideUp()
	$scope.data = { barrio: '', id: '', parroquia: '' }
  $scope.barrios = []
	$scope.parroquias = []

	$http.get('src/datos/barrios/service/getAll.php')
		.then(response => $scope.barrios = response.data )

  $http.get('src/datos/parroquia/service/getAll.php')
    .then(response => $scope.parroquias = response.data )

	$scope.handleShowForm = function (e) {
		$('.formContainer').slideDown()
	}
	$scope.handleCancel = function (e) {
		$scope.data = { barrio: '', id: '', parroquia: '' }
		$('.formContainer').slideUp()
	}
	$scope.handleSave = function (e) {
		if ($scope.data.barrio == "") {
			Materialize.toast("Ingresa el barrio", 4000)
			return false
		}
    if ($scope.data.parroquia == "") {
      Materialize.toast("Ingresa la parroquia", 4000)
      return false
    }
		$http.post("src/datos/barrios/service/save.php",
      { 'barrio': $scope.data.barrio, 'id': $scope.data.id, 'parroquia': $scope.data.parroquia })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		Materialize.toast("Se ha guardado con exito", 4000)
      		$scope.data = { barrio: '', id: '', parroquia: '' }
					$('.formContainer').slideUp()
					$http.get('src/datos/barrios/service/getAll.php')
						.then(response =>$scope.barrios = response.data)
      	}
      })
	}

	$scope.get = function (id, barrio, parroquia) {
		$scope.data = { barrio, id, parroquia }
		$('.formContainer').slideDown()
	}

	$scope.delete = function (id) {
		$http.post("src/datos/barrios/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		Materialize.toast("Se ha eliminado con exito", 4000)
					$http.get('src/datos/barrios/service/getAll.php')
						.then(response => $scope.barrios = response.data)
      	}
      })
	}
})
