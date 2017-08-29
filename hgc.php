<!DOCTYPE html>
<html ng-app="Hospital">
  <head>
    <meta charset="utf-8">
    <title>Consultorio</title>
    <link rel="stylesheet" href="assets/css/materialize.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/select2.css">

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body>
    <section ui-view></section>
    <!-- Librerias -->
    <script type="text/javascript" src="lib/rgbcolor.js"></script>
    <script type="text/javascript" src="lib/StackBlur.js"></script>
    <script type="text/javascript" src="lib/canvg.js"></script>

    <script src="lib/moment.min.js"></script>
    <script src="js/FileSaver.min.js"></script>
    <script src="js/html2canvas.js"></script>
    <script src="js/html2canvas.svg.js"></script>

    <script type="text/javascript" src='lib/jquery.js'></script>
    <script type="text/javascript" src='lib/materialize.js'></script>

    <script src='lib/angular.min.js'></script>
    <script src='lib/ui-router.js'></script>
    <script src='lib/angular-animate.min.js'></script>
    <script src='lib/ngPagination.js'></script>
    <script src='lib/select2.min.js'></script>
    <script src='lib/snap.svg-min.js'></script>

    <!-- <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular.min.js"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.10.0/d3.min.js"></script> -->
    <script src="lib/pdfmake.min.js"></script>

    <script src='js/a-say.js'></script>

  <!-- Para validar que si el usuario esta o no logueado y que rol es -->
    <script src='js/authenticated.js'></script>
  <!-- Inicio de la aplicacion -->
    <script src='js/index.js'></script>
    <script type="text/javascript" src="src/init.js"></script>
  <!-- functiones que valida los inputs -->
    <script src='js/valid.js'></script>

    <script src='js/libs/sprintf.js'></script>
    <script src='js/libs/base64.js'></script>
    <script src='js/jspdf.js'></script>
  <!-- Direcitva  para el menu y que menu presenta-->
    <script src='src/menu/app/index.js'></script>

    <!-- Calcular la edad -->
    <script src='js/calcularEdad.js'></script>

    <!-- PDF -->
    <!-- <script src="http://localhost:8080/ng-html-to-pdf-save/bower_components/jquery/dist/jquery.min.js"></script> -->
    <!-- <script src="https://cdn.rawgit.com/niklasvh/html2canvas/0.5.0-alpha2/dist/html2canvas.min.js"></script>
    <script src="http://localhost:8080/ng-html-to-pdf-save/bower_components/jsPDF/dist/jspdf.debug.js"></script>
    <script src="http://localhost:8080/ng-html-to-pdf-save/dist/saveHtmlToPdf.js"></script> -->

    <script src='src/perfil/app/index.js'></script>
    <script src='src/config/empresa/app/index.js'></script>

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
    <script src='src/estadistico/turnos/app/agenda.js'></script>

    <script src='src/estadistico/activar-turnos/app/index.js'></script>
    <script src='src/estadistico/agenda/app/index.js'></script>
    <script src='src/estadistico/pacientes/app/index.js'></script>
    <script src='src/estadistico/reportes/app/index.js'></script>

    <script src='src/enfermera/signos-vitales/app/index.js'></script>
    <script src='src/enfermera/pacientes-atendidos/app/index.js'></script>

    <script src='src/doctor/pacientes/app/index.js'></script>
    <script src='src/doctor/atendidos/app/index.js'></script>
    <script src='src/doctor/reportes/app/index.js'></script>

    <script src='src/doctor/form28C/app/serviceCie.js'></script>
    <script src='src/doctor/form28C/app/index.js'></script>
    <script src='src/doctor/form28C/app/cie10.js'></script>
    <script src='src/doctor/form28C/app/grafica.js'></script>
    <script src='src/doctor/form28C/app/grafica-mayor.js'></script>

    <script src='src/doctor/form28A/app/index.js'></script>
    <script src='src/doctor/form28A/app/hoja1.js'></script>
    <script src='src/doctor/form28A/app/grafica.js'></script>

    <script src='src/doctor/form056/app/index.js'></script>
    <script src='src/doctor/form056/app/motivoConsulta.js'></script>
    <script src='src/doctor/form056/app/canvas.js'></script>
    <script src='src/doctor/form056/app/save.js'></script>
    <script src='src/doctor/form056/app/calendar.js'></script>
    <script src='src/doctor/form056/app/service.js'></script>
    <script src='src/doctor/form056/app/grafica.js'></script>

    <script src='src/doctor/hoja-devolucion/app/index.js'></script>
    <script src='src/doctor/hoja-devolucion/app/calendar.js'></script>
    <script src='src/doctor/hoja-devolucion/app/cie.js'></script>

    <!-- Repotes -->
    <script src='src/doctor/reportes/forms/form28A/app/index.js'></script>
    <script src='src/doctor/reportes/forms/form28C/app/index.js'></script>
    <script src='src/doctor/reportes/forms/form056/app/index.js'></script>
    <script src='src/doctor/reportes/forms/form056/app/save.js'></script>
    <script src='src/doctor/reportes/forms/hoja-devolucion/app/index.js'></script>

    <script src="src/horarios-doctores/app/index.js"></script>
    <script src='src/home/app/index.js'></script>
    <script src='src/login/app/index.js'></script>

    <script type="text/javascript">
      $('ul.tabs').tabs()
    </script>
  </body>
</html>
