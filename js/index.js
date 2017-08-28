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
    .state('empresa', {
      url: '/empresa',
      controller: 'empresaController',
      templateUrl: 'src/config/empresa/empresa.html',
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
    .state('doctores', {
      url: '/doctores',
      controller: 'doctoresController',
      templateUrl: 'src/archivos/doctores/doctores.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('enfermeras', {
      url: '/enfermeras',
      controller: 'enfermerasController',
      templateUrl: 'src/archivos/enfermeras/enfermeras.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('pasantes', {
      url: '/pasantes',
      controller: 'pasantesController',
      templateUrl: 'src/archivos/pasantes/pasantes.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('pacientes', {
      url: '/pacientes',
      controller: 'pacientesController',
      templateUrl: 'src/estadistico/pacientes/pacientes.html',
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
    .state('institucion', {
      url: '/institucion',
      controller: 'institucionController',
      templateUrl: 'src/archivos/institucion/institucion.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('nivelInstitucion', {
      url: '/nivel-institucion',
      controller: 'nivelInstitucionController',
      templateUrl: 'src/archivos/nivel-institucion/nivel_institucion.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('tipologia', {
      url: '/tipologia',
      controller: 'tipologiaController',
      templateUrl: 'src/archivos/tipologia/tipologia.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('establecimiento', {
      url: '/establecimiento',
      controller: 'establecimientoController',
      templateUrl: 'src/archivos/establecimiento/establecimiento.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('servicios', {
      url: '/servicios',
      controller: 'serviciosController',
      templateUrl: 'src/archivos/servicios/servicios.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('especialidades', {
      url: '/especialidades',
      controller: 'especialidadController',
      templateUrl: 'src/archivos/especialidades/especialidad.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('actividad', {
      url: '/actividad',
      controller: 'actividadController',
      templateUrl: 'src/archivos/actividad/actividad.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('horarios', {
      url: '/horarios',
      controller: 'horariosController',
      templateUrl: 'src/archivos/horarios/horarios.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('consultorios', {
      url: '/consultorios',
      controller: 'consultorioController',
      templateUrl: 'src/archivos/consultorios/consultorio.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('cargos', {
      url: '/cargos',
      controller: 'cargosController',
      templateUrl: 'src/archivos/cargos-enfermeras/cargos.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('perfilesEnfermeras', {
      url: '/perfiles-enfermeras',
      controller: 'perfilEnfermerasController',
      templateUrl: 'src/archivos/perfiles-enfermeras/perfiles-enfermeras.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('circuito', {
      url: '/circuito',
      controller: 'circuitoController',
      templateUrl: 'src/archivos/circuito/circuito.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('distrito', {
      url: '/distrito',
      controller: 'distritoController',
      templateUrl: 'src/archivos/distrito/distrito.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('zonas', {
      url: '/zonas',
      controller: 'zonasController',
      templateUrl: 'src/archivos/zonas/zonas.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('horariosDoctores', {
      url: '/horarios-doctores',
      controller: 'horariosDocController',
      templateUrl: 'src/horarios-doctores/horarios.html',
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
    .state('agenda', {
      url: '/agenda',
      controller: 'agendaController',
      templateUrl: 'src/estadistico/agenda/agenda.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('signosVitales', {
      url: '/signos-vitales',
      controller: 'singosVitalesController',
      templateUrl: 'src/enfermera/signos-vitales/signos-vitales.html',
      resolve: { authenticated: auth_roles }
    })
    .state('pacAnteEnfermeria', {
      url: '/pacientes-antendidos-enfermeria',
      controller: 'pacAtenController',
      templateUrl: 'src/enfermera/pacientes-atendidos/pacientes.html',
      resolve: { authenticated: auth_roles }
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
    .state('pacientesAtendidos', {
      url: '/pacientes-atendidos',
      controller: 'atendidosController',
      templateUrl: 'src/doctor/atendidos/atendidos.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('reporetsDoctor', {
      url: '/reportes-pacientes',
      controller: 'reportesController',
      templateUrl: 'src/doctor/reportes/atendidos.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('reporetAdmision', {
      url: '/reportes-admision',
      controller: 'reportesAdminCtrl',
      templateUrl: 'src/estadistico/reportes/atendidos.html',
      resolve: {
        authenticated: auth_roles
      }
    })
    .state('form28C', {
      url: '/form28C/:id/:turno/:action',
      controller: 'form28CController',
      templateUrl: 'src/doctor/form28C/form28C.html',
      resolve: { authenticated: auth_roles }
    })
    .state('form28A', {
      url: '/form28A/:id/:turno/:action',
      controller: 'form28AController',
      templateUrl: 'src/doctor/form28A/form28A.html',
      resolve: { authenticated: auth_roles }
    })
    .state('form056', {
      url: '/form056/:id/:turno/:action',
      controller: 'formCtrl056',
      templateUrl: 'src/doctor/form056/index.html',
      resolve: { authenticated: auth_roles }
    })
    .state('formGraphic056AB', {
      url: '/grafica-form056/:id/:turno',
      controller: 'formGraphic056ABCtrl',
      templateUrl: 'src/doctor/form056/grafica.html',
      resolve: { authenticated: auth_roles }
    })
    .state('hojasDevolucion', {
      url: '/hoja-devolucion/:id/:turno/:action',
      controller: 'HojaDevolucionCtrl',
      templateUrl: 'src/doctor/hoja-devolucion/index.html',
      resolve: { authenticated: auth_roles }
    })
    .state('form28AReporte', {
      url: '/reporte/form28A/:id/:turno',
      controller: 'reportform28ACtrl',
      templateUrl: 'src/doctor/reportes/forms/form28A/form28A.html',
      resolve: { authenticated: auth_roles }
    })
    .state('form28CReporte', {
      url: '/reporte/form28C/:id/:turno',
      controller: 'form28CReporteController',
      templateUrl: 'src/doctor/reportes/forms/form28C/form28C.html',
      resolve: { authenticated: auth_roles }
    })
    .state('form056Reporte', {
      url: '/reporte/form056/:id/:turno',
      controller: 'reportform056Ctrl',
      templateUrl: 'src/doctor/reportes/forms/form056/form28A.html',
      resolve: { authenticated: auth_roles }
    })
    .state('hojasDevolucionReporte', {
      url: '/reporte/hojadev/:id/:turno',
      controller: 'hojadevReporteController',
      templateUrl: 'src/doctor/reportes/forms/hojadev/form28C.html',
      resolve: { authenticated: auth_roles }
    })
})
