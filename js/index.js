'use strict'

const hospital = angular.module('Hospital', ['ui.router', 'ngAnimate', 'ngPagination'])

hospital.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('index', {
      url: '/',
      controller: 'loginController',
      templateUrl: 'src/login/login.html',
      resolve: {
        authenticated: authenticated
      }
    })
    .state('login', {
      url: '/login',
      controller: 'loginController',
      templateUrl: 'src/login/login.html',
      resolve: {
        authenticated: authenticated
      }
    })
    .state('perfil', {
      url: '/perfil',
      controller: 'perfilController',
      templateUrl: 'src/perfil/perfil.html',
      resolve: {
        authenticated: profile_me
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
        authenticated: auth_roles
      }
    })
    .state('paises', {
      url: '/paises',
      controller: 'paisController',
      templateUrl: 'src/datos/paises/paises.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('provincias', {
      url: '/provincias',
      controller: 'provinciasController',
      templateUrl: 'src/datos/provincias/provincias.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('cantones', {
      url: '/cantones',
      controller: 'cantonesController',
      templateUrl: 'src/datos/cantones/cantones.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('parroquia', {
      url: '/parroquia',
      controller: 'parroquiaController',
      templateUrl: 'src/datos/parroquia/parroquia.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('barrios', {
      url: '/barrios',
      controller: 'barriosController',
      templateUrl: 'src/datos/barrios/barrio.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('etnias', {
      url: '/etnias',
      controller: 'etniasController',
      templateUrl: 'src/datos/etnias/etnias.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('generos', {
      url: '/generos',
      controller: 'generosController',
      templateUrl: 'src/datos/generos/generos.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('profesiones', {
      url: '/profesiones',
      controller: 'profesionesController',
      templateUrl: 'src/archivos/profesiones/profesion.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('usuarios', {
      url: '/usuarios',
      controller: 'usuariosController',
      templateUrl: 'src/archivos/usuarios/usuarios.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('pacientes', {
      url: '/pacientes',
      controller: 'pacientesController',
      templateUrl: 'src/archivos/pacientes/pacientes.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('cie10', {
      url: '/cie10',
      controller: 'cie10Controller',
      templateUrl: 'src/archivos/cie10/cie10.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('cie10-1', {
      url: '/cie10-1',
      controller: 'cie10OneController',
      templateUrl: 'src/archivos/cie10-1/cie10.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('cie10-2', {
      url: '/cie10-2',
      controller: 'cie10TwoController',
      templateUrl: 'src/archivos/cie10-2/cie10.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('sitemasFiscos', {
      url: '/sistemas-fisicos',
      controller: 'sitemasFiscosController',
      templateUrl: 'src/archivos/sistemas-fisicos/sitemasFiscos.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('turnos', {
      url: '/turnos',
      controller: 'turnosController',
      templateUrl: 'src/estadistico/turnos/turno.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('activarTurnos', {
      url: '/activar-turnos',
      controller: 'turnosActiveController',
      templateUrl: 'src/estadistico/activar-turnos/turno.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('signosVitales', {
      url: '/signos-vitales',
      controller: 'singosVitalesController',
      templateUrl: 'src/enfermera/signos-vitales/signos-vitales.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('paciente-signos', {
      url: '/paciente-signos/:id/:turno',
      controller: 'pacienteSignoController',
      templateUrl: 'src/enfermera/signos-vitales/paciente.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('doctor', {
      url: '/doctor',
      controller: 'pacientesDoctorController',
      templateUrl: 'src/doctor/pacientes/pacientes.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('form28C', {
      url: '/form28C/:id/:turno',
      controller: 'form28CController',
      templateUrl: 'src/doctor/form28C/form28C.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('form28A', {
      url: '/form28A/:id/:turno',
      controller: 'form28AController',
      templateUrl: 'src/doctor/form28A/form28A.html',
      resolve: {
        authenticated: auth_roles
      }
    })
})
