'use strict'

const hospital = angular.module('Hospital', ['ui.router', 'toaster', 'ngAnimate'])

hospital.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('index', {
      url: '/',
      controller: 'homeController',
      templateUrl: 'src/home/home.html'
    })
    .state('paises', {
      url: '/paises',
      controller: 'paisController',
      templateUrl: 'src/datos/paises/paises.html'
    })
    .state('provincias', {
      url: '/provincias',
      controller: 'provinciasController',
      templateUrl: 'src/datos/provincias/provincias.html'
    })
    .state('cantones', {
      url: '/cantones',
      controller: 'cantonesController',
      templateUrl: 'src/datos/cantones/cantones.html'
    })
    .state('parroquia', {
      url: '/parroquia',
      controller: 'parroquiaController',
      templateUrl: 'src/datos/parroquia/parroquia.html'
    })
    .state('barrios', {
      url: '/barrios',
      controller: 'barriosController',
      templateUrl: 'src/datos/barrios/barrio.html'
    })
    .state('etnias', {
      url: '/etnias',
      controller: 'etniasController',
      templateUrl: 'src/datos/etnias/etnias.html'
    })
    .state('generos', {
      url: '/generos',
      controller: 'generosController',
      templateUrl: 'src/datos/generos/generos.html'
    })
    .state('profesiones', {
      url: '/profesiones',
      controller: 'profesionesController',
      templateUrl: 'src/archivos/profesiones/profesion.html'
    })
    .state('usuarios', {
      url: '/usuarios',
      controller: 'usuariosController',
      templateUrl: 'src/archivos/usuarios/usuarios.html'
    })
    .state('pacientes', {
      url: '/pacientes',
      controller: 'pacientesController',
      templateUrl: 'src/archivos/pacientes/pacientes.html'
    })
})
