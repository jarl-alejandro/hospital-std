'use strict'


const usuarios = angular.module('Hospital')

usuarios.controller('usuariosController', function ($scope, toaster, $http) {
	$scope.showForm = false
	$scope.data = { id: '', cedula: '', nombre: '', apellido: '', fechaNac: '', dni: '', telefono: '', ceulular: '', direccion: '', email: '', sexo: '', profesion: ''}
	$scope.usuarios = []
	$scope.profesiones = []
	$scope.generos = []

	$http.get('src/datos/generos/service/getAll.php')
		.then(response => $scope.generos = response.data )

		$http.get('src/archivos/profesiones/service/getAll.php')
		.then(response => $scope.profesiones = response.data )

	$http.get('src/archivos/usuarios/service/getAll.php')
		.then(response => $scope.usuarios = response.data )

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
		if ($scope.data.profesion == "") {
			toaster.pop('error', "Error", "Ingresa la profesion")
			return false
		}

		$http.post("src/archivos/pusuarios/service/save.php", { 'profesional': $scope.data })
      .then(response => {
      	console.log(response)
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha guardado con exito")
      		$scope.data = { profesion: '', id: '' }
					$scope.showForm = false
					$http.get('src/archivos/pusuarios/service/getAll.php')
						.then(response =>$scope.usuarios = response.data)
      	}
      })
	}

	$scope.get = function (usuario) {
		$scope.data = {
			id: usuario.hgc_codi_profe,
			cedula: usuario.hgc_cedu_profe,
			nombre: usuario.hgc_nom_profe,
			apellido: usuario.hgc_ape_profe,
			fechaNac: new Date(usuario.hgc_fecn_profe),
			dni: usuario.hgc_dni_profe,
			telefono: usuario.hgc_tele_profe,
			ceulular: usuario.hgc_celu_profe,
			direccion: usuario.hgc_direc_profe,
			email: usuario.hgc_emai_profe,
			sexo: usuario.hgc_sexo_profe,
			profesion: usuario.hgc_profe_profe
		}
		$scope.showForm = true
	}

	$scope.delete = function (id) {
		$http.post("src/archivos/pusuarios/service/delete.php", { id })
      .then(response => {
      	if (response.data == 201) {
      		toaster.pop('info', "Se ha eliminado con exito")
					$http.get('src/archivos/pusuarios/service/getAll.php')
						.then(response => $scope.usuarios = response.data)
      	}
      })
	}
})
