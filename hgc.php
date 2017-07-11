<!DOCTYPE html>
<html ng-app="Hospital">
  <head>
    <meta charset="utf-8">
    <title>Consultorio</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/materialize.css">

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body>
    <section ui-view></section>
  <!-- Librerias -->
    <script type="text/javascript" src='lib/jquery.js'></script>
    <script type="text/javascript" src='lib/materialize.js'></script>
    <script src='lib/angular.min.js'></script>
    <script src='lib/ui-router.js'></script>
    <script src='lib/angular-animate.min.js'></script>
    <script src='lib/ngPagination.js'></script>
  <!-- Para validar que si el usuario esta o no logueado y que rol es -->
    <script src='js/authenticated.js'></script>
  <!-- Inicio de la aplicacion -->
  <script src='js/index.js'></script>
  <!-- functiones que valida los inputs -->
  <script src='js/valid.js'></script>
  <!-- Direcitva  para el menu y que menu presenta-->
    <script src='src/menu/app/index.js'></script>

    <script src='src/perfil/app/index.js'></script>

    <script src='src/datos/paises/app/index.js'></script>
    <script src='src/datos/provincias/app/index.js'></script>
    <script src='src/datos/cantones/app/index.js'></script>
    <script src='src/datos/parroquia/app/index.js'></script>
    <script src='src/datos/barrios/app/index.js'></script>
    <script src='src/datos/etnias/app/index.js'></script>
    <script src='src/datos/generos/app/index.js'></script>

    <script src='src/archivos/profesiones/app/index.js'></script>

    <script src='src/archivos/usuarios/app/index.js'></script>
    <script src='src/archivos/doctores/app/index.js'></script>
    <script src='src/archivos/enfermeras/app/index.js'></script>
    <script src='src/archivos/pasantes/app/index.js'></script>

    <script src='src/archivos/pacientes/app/index.js'></script>
    <script src='src/archivos/cie10/app/index.js'></script>
    <script src='src/archivos/cie10-1/app/index.js'></script>
    <script src='src/archivos/cie10-2/app/index.js'></script>
    <script src='src/archivos/sistemas-fisicos/app/index.js'></script>
    <script src='src/archivos/nivel-institucion/app/index.js'></script>
    <script src='src/archivos/institucion/app/index.js'></script>
    <script src='src/archivos/tipologia/app/index.js'></script>
    <script src='src/archivos/establecimiento/app/index.js'></script>
    <script src='src/archivos/servicios/app/index.js'></script>
    <script src='src/archivos/especialidades/app/index.js'></script>
    <script src='src/archivos/actividad/app/index.js'></script>
    <script src='src/archivos/horarios/app/index.js'></script>
    <script src='src/archivos/consultorios/app/index.js'></script>
    <script src='src/archivos/cargos-enfermeras/app/index.js'></script>
    <script src='src/archivos/perfiles-enfermeras/app/index.js'></script>
    <script src='src/archivos/distrito/app/index.js'></script>
    <script src='src/archivos/circuito/app/index.js'></script>
    <script src='src/archivos/zonas/app/index.js'></script>

    <script src='src/estadistico/turnos/app/index.js'></script>
    <script src='src/estadistico/activar-turnos/app/index.js'></script>
    <script src='src/estadistico/agenda/app/index.js'></script>

    <script src='src/enfermera/signos-vitales/app/index.js'></script>

    <script src='src/doctor/pacientes/app/index.js'></script>
    <script src='src/doctor/form28C/app/index.js'></script>
    <script src='src/doctor/form28A/app/index.js'></script>

    <script src="src/horarios-doctores/app/index.js"></script>

    <script src='src/home/app/index.js'></script>
    <script src='src/login/app/index.js'></script>
    <script type="text/javascript">
      $('ul.tabs').tabs()
    </script>
  </body>
</html>
