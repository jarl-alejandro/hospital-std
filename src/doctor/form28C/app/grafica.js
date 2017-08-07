'use strict'

const graphicForm28C = angular.module('Hospital')

graphicForm28C.controller('graphicForm28Ctrl', function ($scope, $http) {
  let sexo = $scope.sexo
  $scope.fechaFlag = false
  $(`#graphic-${sexo}`).fadeIn()

  setTimeout(() => renderByDate($scope.fechaNacimiento), 500)
  setTimeout(() => renderGraphic($scope.sexo), 500)

  function renderByDate (fechaNacimiento) {
    let nacimiento = calcularEdad(fechaNacimiento, true)
    if (nacimiento.meses >= 2 &&  nacimiento.edad <= 5) $scope.fechaFlag = false
    else $scope.fechaFlag = true

    if ($scope.fechaFlag === true) {
      $(".menor").fadeOut()
      $(".mayor").fadeIn()
    } else {
      $(".menor").fadeIn()
      $(".mayor").fadeOut()
    }

  }

  function renderGraphic (sexo) {
    if ($scope.fechaFlag === false){
      if (sexo === 'Hombre') {
        $('.GraficaPeso img').attr('src', 'assets/img/graficas/ninos-2meses_5anos/peso.png')
        $('.GraficaLongitud img').attr('src', 'assets/img/graficas/ninos-2meses_5anos/longitud.png')
        $('.GraficaCefalico img').attr('src', 'assets/img/graficas/ninos-2meses_5anos/cefalico.png')
        $('.GraficaIMC img').attr('src', 'assets/img/graficas/ninos-2meses_5anos/imc.png')

        $('.GraficaPeso h4').html('PESO/EDAD - NIÑO MENOR DE 5 AÑOS (kg)')
        $('.GraficaLongitud h4').html('TALLA/EDAD - NIÑO MENOR DE 5 AÑOS (cm)')
        $('.GraficaCefalico h4').html('PERIMETRO CEFÀLICO - NIÑO MENOR DE 5 AÑOS (cm)')
        $('.GraficaIMC h4').html('INDICE DE MASA CORPORAL - NIÑO MENOR DE 5 AÑOS (kg/m2)')

        $('.footer-graphic').html('CURVA DE CRECIMIENTO DEL NIÑO MENOR DE 5 AÑOS')
        $('.footer-msp').html('MSP HCU - Form 028 A2/09')
      }
      else {
        $('.GraficaPeso img').attr('src', 'assets/img/graficas/ninas-2mese_5anos/peso.png')
        $('.GraficaLongitud img').attr('src', 'assets/img/graficas/ninas-2mese_5anos/longitud.png')
        $('.GraficaCefalico img').attr('src', 'assets/img/graficas/ninas-2mese_5anos/cefalico.png')
        $('.GraficaIMC img').attr('src', 'assets/img/graficas/ninas-2mese_5anos/imc.png')

        $('.GraficaPeso h4').html('PESO/EDAD - NIÑA MENOR DE 5 AÑOS (kg)')
        $('.GraficaLongitud h4').html('TALLA/EDAD - NIÑA MENOR DE 5 AÑOS (cm)')
        $('.GraficaCefalico h4').html('PERIMETRO CEFÀLICO - NIÑA MENOR DE 5 AÑOS (cm)')
        $('.GraficaIMC h4').html('INDICE DE MASA CORPORAL - NIÑA MENOR DE 5 AÑOS (kg/m2)')

        $('.footer-msp').html('MSP HCU - Form 028 A1/09')
        $('.footer-graphic').html('CURVA DE CRECIMIENTO DE LA NIÑA MENOR DE 5 AÑOS')
      }
    }
    if ($scope.fechaFlag === true) {
      if (sexo === 'Hombre') {
        $('.mayor .GraficaPeso img').attr('src','assets/img/graficas/nino/peso.png')
        $('.mayor .GraficaLongitud img').attr('src','assets/img/graficas/nino/talla.png')
        $('.mayor .GraficaIMC img').attr('src','assets/img/graficas/nino/imc.png')

        $('.mayor .GraficaPeso h4').html('PESO/EDAD - NIÑO de 5 A 9 AÑOS (kg)')
        $('.mayor .GraficaLongitud h4').html('TALLA/EDAD - NIÑO DE 5 A 9 AÑOS (cm)')
        $('.mayor .GraficaIMC h4').html('INDICE DE MASA CORPORAL - NIÑO DE 5 A 9 AÑOS (kg/m2)')

        $('.footer-msp').html('MSP HCU-Form 028 A4/09')
        $('.footer-graphic').html('CURVA DE CRECIMIENTO DEL NIÑA DE 5 A 9 AÑOS')
      }
      else {
        $('.mayor .GraficaPeso img').attr('src','assets/img/graficas/nina/peso.png')
        $('.mayor .GraficaLongitud img').attr('src','assets/img/graficas/nina/talla.png')
        $('.mayor .GraficaIMC img').attr('src','assets/img/graficas/nina/imc.png')

        $('.mayor .GraficaPeso h4').html('PESO/EDAD - NIÑA de 5 A 9 AÑOS (kg)')
        $('.mayor .GraficaLongitud h4').html('TALLA/EDAD - NIÑA DE 5 A 9 AÑOS (cm)')
        $('.mayor .GraficaIMC h4').html('INDICE DE MASA CORPORAL - NIÑA DE 5 A 9 AÑOS (kg/m2)')

        $('.footer-msp').html('MSP HCU - Form 028 A4/09')
        $('.footer-graphic').html('CURVA DE CRECIMIENTO DEL NIÑA DE 5 A 9 AÑOS')
      }
    }
  }

})
