'use strict'

const horariosDoctores = angular.module('Hospital')

horariosDoctores.controller('horariosDocController', function ($scope, $http) {
   $('ul.tabs').tabs()
  $scope.medicos = []
  $scope.consultorios = []
  $scope.mes = [
    { id: 1, nombre: 'Enero' },
    { id: 2, nombre: 'Febrero' },
    { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' },
    { id: 5, nombre: 'Mayo' },
    { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' },
    { id: 8, nombre: 'Agosto' },
    { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' },
    { id: 11, nombre: 'Noviembre' },
    { id: 12, nombre: 'Diciembre' }
  ]

  $http.get('src/horarios-doctores/service/consultorios.php')
    .then(response => $scope.consultorios = response.data)

  $http.get('src/horarios-doctores/service/medicos.php')
    .then(response => $scope.medicos = response.data)

  $scope.handleShowForm = function () {
    $('#adignarFormHorario').modal('open')
  }

})
