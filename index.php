<!DOCTYPE html>
<html ng-app="Hospital">
  <head>
    <meta charset="utf-8">
    <title>Consultorio</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/toaster.min.css">
    <link rel="stylesheet" href="assets/css/materialize.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body>
    <section ui-view></section>
    <script type="text/javascript" src='lib/jquery.js'></script>
    <script type="text/javascript" src='lib/materialize.min.js'></script>
    <script src='lib/angular.min.js'></script>
    <script src='lib/ui-router.js'></script>
    <script src='lib/angular-animate.min.js'></script>
    <script src='lib/toaster.min.js'></script>
    <script src='js/index.js'></script>
    <script src='src/menu/app/index.js'></script>

    <script src='src/datos/paises/app/index.js'></script>
    <script src='src/datos/provincias/app/index.js'></script>
    <script src='src/datos/cantones/app/index.js'></script>
    <script src='src/datos/parroquia/app/index.js'></script>
    <script src='src/datos/barrios/app/index.js'></script>
    <script src='src/datos/etnias/app/index.js'></script>
    <script src='src/datos/generos/app/index.js'></script>
    <script src='src/archivos/profesiones/app/index.js'></script>
    <script src='src/archivos/usuarios/app/index.js'></script>
    <script src='src/archivos/pacientes/app/index.js'></script>
    <script src='src/home/app/index.js'></script>
  </body>
</html>
