'use strict'


const pacientes = angular.module('Hospital')

pacientes.controller('pacientesController', function ($scope, toaster, $http) {
	$scope.showForm = false
	$scope.data = { id: '', cedula: '', nombre: '', apellido: '', fechaNac: '', dni: '', telefono: '', ceulular: '', direccion: '', email: '', sexo: '', profesion: ''}
	$scope.pacientes = []
	$scope.generos = []

	$http.get('src/datos/generos/service/getAll.php')
		.then(response => $scope.generos = response.data )

	$http.get('src/archivos/pacientes/service/getAll.php')
		.then(response => $scope.pacientes = response.data )

	$scope.handleShowForm = function (e) {
		$scope.showForm = true
	}
	$scope.handleCancel = function (e) {
		$scope.data = { id: '', cedula: '', nombre: '', apellido: '', fechaNac: '', dni: '', telefono: '', ceulular: '', direccion: '', email: '', sexo: '', profesion: ''}
		$scope.showForm = false
	}
	$scope.handleSave = function (e) {
		if ($scope.data.cedula == "") {
			toaster.pop('error', "Error", "Ingresa la cedula")
			return false
		}
		if ($scope.data.nombre == "") {
			toaster.pop('error', "Error", "Ingresa el nombre")
			return false
		}
		if ($scope.data.apellido == "") {
			toaster.pop('error', "Error", "Ingresa el apellido")
			return false
		}
		if ($scope.data.fechaNac == "") {
			toaster.pop('error', "Error", "Ingresa la fecha de nacimiento")
			return false
		}
		if ($scope.data.dni == "") {
			toaster.pop('error', "Error", "Ingresa el dni")
			return false
		}
		if ($scope.data.telefono == "") {
			toaster.pop('error', "Error", "Ingresa el telefono")
			return false
		}
		if ($scope.data.ceulular == "") {
			toaster.pop('error', "Error", "Ingresa el ceulular")
			return false
		}
		if ($scope.data.direccion == "") {
			toaster.pop('error', "Error", "Ingresa la direccion")
			return false
		}
		if ($scope.data.email == "") {
			toaster.pop('error', "Error", "Ingresa el email")
			return false
		}
		if ($scope.data.sexo == "") {
			toaster.pop('error', "Error", "Ingresa el genero")
			return false
		}

		$http.post("src/archivos/pacientes/service/save.php", { 'pacientes': $scope.data })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha guardado con exito")
      		$scope.data = { profesion: '', id: '' }
					$scope.showForm = false
					$http.get('src/archivospacientes/service/getAll.php')
						.then(response =>$scope.pacientes = response.data)
      	}
      })
	}

	$scope.get = function (paciente) {
		$scope.data = {
			id: paciente.hgc_codi_pacie,
			cedula: paciente.hgc_cedu_pacie,
			nombre: paciente.hgc_nom_pacie,
			apellido: paciente.hgc_ape_pacie,
			fechaNac: new Date(paciente.hgc_fecn_pacie),
			dni: paciente.hgc_dni_pacie,
			telefono: paciente.hgc_tele_pacie,
			ceulular: paciente.hgc_celu_pacie,
			direccion: paciente.hgc_direc_pacie,
			email: paciente.hgc_emai_pacie,
			sexo: paciente.hgc_sexo_pacie
		}
		$scope.showForm = true
	}

	$scope.delete = function (id) {
		$http.post("src/archivos/pacientes/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha eliminado con exito")
					$http.get('src/archivos/pacientes/service/getAll.php')
						.then(response => $scope.pacientes = response.data)
      	}
      })
	}
})
