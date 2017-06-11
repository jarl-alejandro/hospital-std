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
      templateUrl: 'src/paises/paises.html'
    })
    .state('provincias', {
      url: '/provincias',
      controller: 'provinciasController',
      templateUrl: 'src/provincias/provincias.html'
    })
    .state('cantones', {
      url: '/cantones',
      controller: 'cantonesController',
      templateUrl: 'src/cantones/cantones.html'
    })
    .state('parroquia', {
      url: '/parroquia',
      controller: 'parroquiaController',
      templateUrl: 'src/parroquia/parroquia.html'
    })
    .state('barrios', {
      url: '/barrios',
      controller: 'barriosController',
      templateUrl: 'src/barrios/barrio.html'
    })
    .state('etnias', {
      url: '/etnias',
      controller: 'etniasController',
      templateUrl: 'src/etnias/etnias.html'
    })
    .state('generos', {
      url: '/generos',
      controller: 'generosController',
      templateUrl: 'src/generos/generos.html'
    })
    .state('profesiones', {
      url: '/profesiones',
      controller: 'profesionesController',
      templateUrl: 'src/profesiones/profesion.html'
    })
    .state('usuarios', {
      url: '/usuarios',
      controller: 'usuariosController',
      templateUrl: 'src/usuarios/usuarios.html'
    })
    .state('pacientes', {
      url: '/pacientes',
      controller: 'pacientesController',
      templateUrl: 'src/pacientes/pacientes.html'
    })
})
