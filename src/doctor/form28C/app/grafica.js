'use strict'

const graphicForm28C = angular.module('Hospital')

graphicForm28C.controller('graphicForm28Ctrl', function ($scope, $http, $stateParams) {
  $scope.fechaFlag = false
  $scope.objectNacimiento = {}
  $(`#graphic-${$scope.sexo}`).fadeIn()
  const peso = Snap("#form28CPeso")
  const imc = Snap("#form28CIMC")
  const cefalico = Snap("#form28CCEFALICO")

  setTimeout(() => {
    renderByDate($scope.fechaNacimiento)
    renderBySexo($scope.sexo)
    $http.get(`src/doctor/form28C/service/grafica.php?id=${$stateParams.id}`)
    .then(response => renderGraphic(response.data))
  }, 500)

  function renderGraphic (data) {
    data.signos.map((item, index) => renderPoint(item, index))
  }

  let datoPesoX = 0
  let datPesoY = 0
  let datoIMCX = 0
  let datIMCY = 0
  let datoCefalicoX = 0
  let datCefalicoY = 0

  function renderPoint (data, index) {
    $scope.colorSexo = $scope.sexo === 'Hombre' ? '#0197d6' : '#e47db4'
    let edad = $scope.objectNacimiento.meses

    const duracion = duration(new Date($scope.fechaNacimiento), new Date(data.fecha))
    const ageMonth = (duracion.years * 12) + duracion.months

    const imcData = data.imc - 9
    const celdaIMC = imcData === 1 ? 32 : 37

    const cefalicoData = data.pencefalico - 31
    const celdaCefalico = cefalicoData === 1 ? 23 : 24

    console.log(duracion)

    if (index !== 0) {
      peso.line((ageMonth/2)*28, 18*(data.peso-1), datoPesoX, datPesoY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)

      imc.line((ageMonth/2)*28, celdaIMC*(imcData), datoIMCX, datIMCY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)

      cefalico.line((ageMonth/2)*28, celdaCefalico * cefalicoData, datoCefalicoX, datCefalicoY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)
    }

    peso.circle((ageMonth/2)*28, 18*(data.peso-1), 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 80) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 46) + 'px'
      toaster.innerText = `Peso: ${data.peso} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster').slideDown()
    })
    .mouseout(function () {
      $('.toaster').slideUp()
    })

    imc.circle((ageMonth/2)*28, celdaIMC*(imcData), 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster-imc')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 80) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 46) + 'px'
      toaster.innerText = `IMC: ${data.imc} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster-imc').slideDown()
    })
    .mouseout(function () {
      $('.toaster-imc').slideUp()
    })

    cefalico.circle((ageMonth/2)*28, celdaCefalico * cefalicoData, 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster-cefalico')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 89) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 46) + 'px'
      toaster.innerText = `P. Cefalico: ${data.pencefalico} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster-cefalico').slideDown()
    })
    .mouseout(function () {
      $('.toaster-cefalico').slideUp()
    })

    datoPesoX = (ageMonth/2)*28
    datPesoY = 18*(data.peso-1)

    datoIMCX = (ageMonth/2)*28
    datIMCY = celdaIMC * imcData

    datoCefalicoX = (ageMonth/2)*28
    datCefalicoY = celdaCefalico * cefalicoData
  }

  function renderByDate (fechaNacimiento) {
    let nacimiento = calcularEdad(fechaNacimiento, true)
    $scope.objectNacimiento = nacimiento

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

  function renderBySexo (sexo) {
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
