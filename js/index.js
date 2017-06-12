'use strict'

const hospital = angular.module('Hospital', ['ui.router', 'toaster', 'ngAnimate'])

hospital.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('index', {
      url: '/',
      controller: 'homeController',
      templateUrl: 'src/home/home.html',
    })
    .state('login', {
      url: '/login',
      controller: 'loginController',
      templateUrl: 'src/login/login.html',
      resolve: {
        authenticated: ($q, $location, $http) => {
          let deferred = $q.defer()
          $http.get('src/perfil/service/me.php')
          .then(response => {
            if (response.data.status === 404) deferred.resolve()
            else {
              $location.path("/admin")
            }
          })
          return deferred.promise
        }
      }
    })
    .state('logout', {
      url: '/logout',
      controller: 'logoutController'
    })
    .state('admin', {
      url: '/admin',
      controller: 'adminController',
      templateUrl: 'src/home/admin.html',
      resolve: {
        authenticated: ($q, $location, $http) => {
          let deferred = $q.defer()
          $http.get('src/perfil/service/me.php')
          .then(response => {
            console.log(response)
            if (response.data.status === 404) $location.path("/login")
            else {
              deferred.resolve()
            }
          })
          return deferred.promise
        }
      }
    })
    .state('paises', {
      url: '/paises',
      controller: 'paisController',
      templateUrl: 'src/datos/paises/paises.html',
    })
    .state('provincias', {
      url: '/provincias',
      controller: 'provinciasController',
      templateUrl: 'src/datos/provincias/provincias.html',
    })
    .state('cantones', {
      url: '/cantones',
      controller: 'cantonesController',
      templateUrl: 'src/datos/cantones/cantones.html',
    })
    .state('parroquia', {
      url: '/parroquia',
      controller: 'parroquiaController',
      templateUrl: 'src/datos/parroquia/parroquia.html',
    })
    .state('barrios', {
      url: '/barrios',
      controller: 'barriosController',
      templateUrl: 'src/datos/barrios/barrio.html',
    })
    .state('etnias', {
      url: '/etnias',
      controller: 'etniasController',
      templateUrl: 'src/datos/etnias/etnias.html',
    })
    .state('generos', {
      url: '/generos',
      controller: 'generosController',
      templateUrl: 'src/datos/generos/generos.html',
    })
    .state('profesiones', {
      url: '/profesiones',
      controller: 'profesionesController',
      templateUrl: 'src/archivos/profesiones/profesion.html',
    })
    .state('usuarios', {
      url: '/usuarios',
      controller: 'usuariosController',
      templateUrl: 'src/archivos/usuarios/usuarios.html',
    })
    .state('pacientes', {
      url: '/pacientes',
      controller: 'pacientesController',
      templateUrl: 'src/archivos/pacientes/pacientes.html',
    })
    .state('cie10', {
      url: '/cie10',
      controller: 'cie10Controller',
      templateUrl: 'src/archivos/cie10/cie10.html',
    })
    .state('cie10-1', {
      url: '/cie10-1',
      controller: 'cie10OneController',
      templateUrl: 'src/archivos/cie10-1/cie10.html',
    })
    .state('cie10-2', {
      url: '/cie10-2',
      controller: 'cie10TwoController',
      templateUrl: 'src/archivos/cie10-2/cie10.html',
    })
    .state('sitemasFiscos', {
      url: '/sistemas-fisicos',
      controller: 'sitemasFiscosController',
      templateUrl: 'src/archivos/sistemas-fisicos/sitemasFiscos.html',
    })
})
