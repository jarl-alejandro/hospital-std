'use strict'

const graphicForm28C = angular.module('Hospital')

graphicForm28C.controller('graphicForm28Ctrl', function ($scope, $http) {
  let sexo = $scope.sexo
  console.log(`#graphic-${sexo}`)
  $(`#graphic-${sexo}`).fadeIn()
  setTimeout(() => renderGraphic(sexo), 500)


  function renderGraphic (sexo) {

    if (sexo === 'Hombre') {
      $('.GraficaPeso img').attr('src', 'assets/img/graficas/ninos-2meses_5anos/peso.png')
      $('.GraficaLongitud img').attr('src', 'assets/img/graficas/ninos-2meses_5anos/peso.png')
      $('.GraficaCefalico img').attr('src', 'assets/img/graficas/ninos-2meses_5anos/peso.png')
      $('.GraficaIMC img').attr('src', 'assets/img/graficas/ninos-2meses_5anos/peso.png')

      $('.GraficaPeso h4').html('PESO/EDAD - NIÑO MENOR DE 5 AÑOS (kg)')
      $('.GraficaLongitud h4').html('TALLA/EDAD - NIÑO MENOR DE 5 AÑOS (cm)')
      $('.GraficaCefalico h4').html('PERIMETRO CEFÀLICO - NIÑO MENOR DE 5 AÑOS (cm)')
      $('.GraficaIMC h4').html('INDICE DE MASA CORPORAL - NIÑO MENOR DE 5 AÑOS (kg/m2)')

      $('.footer-graphic').html('CURVA DE CRECIMIENTO DEL NIÑO MENOR DE 5 AÑOS')
      $('.footer-msp').html('MPS HCU - Form 028 A2/09')
    } else {
      $('.GraficaPeso img').attr('src', 'assets/img/graficas/ninas-2mese_5anos/peso.png')
      $('.GraficaLongitud img').attr('src', 'assets/img/graficas/ninas-2mese_5anos/peso.png')
      $('.GraficaCefalico img').attr('src', 'assets/img/graficas/ninas-2mese_5anos/peso.png')
      $('.GraficaIMC img').attr('src', 'assets/img/graficas/ninas-2mese_5anos/peso.png')

      $('.GraficaPeso h4').html('PESO/EDAD - NIÑA MENOR DE 5 AÑOS (kg)')
      $('.GraficaLongitud h4').html('TALLA/EDAD - NIÑA MENOR DE 5 AÑOS (cm)')
      $('.GraficaCefalico h4').html('PERIMETRO CEFÀLICO - NIÑA MENOR DE 5 AÑOS (cm)')
      $('.GraficaIMC h4').html('INDICE DE MASA CORPORAL - NIÑA MENOR DE 5 AÑOS (kg/m2)')

      $('.footer-graphic').html('CURVA DE CRECIMIENTO DE LA NIÑA MENOR DE 5 AÑOS')
      $('.footer-msp').html('MPS HCU - Form 028 A1/09')
    }
  }

})
