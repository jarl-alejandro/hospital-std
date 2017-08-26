'use strict'

const graphicForm28C = angular.module('Hospital')

graphicForm28C.controller('graphicForm28Ctrl', function ($scope, $http, $stateParams) {
  $scope.fechaFlag = false
  $scope.objectNacimiento = {}
  $(`#graphic-${$scope.sexo}`).fadeIn()
  const peso = Snap("#form28CPeso")
  const imc = Snap("#form28CIMC")
  const cefalico = Snap("#form28CCEFALICO")
  const longitud = Snap('#form28CLongitud')

  setTimeout(() => {
    $http.get(`src/doctor/form28C/service/grafica.php?id=${$stateParams.id}`)
    .then(response => {
      renderByDate($scope.fechaNacimiento)
      renderBySexo($scope.sexo)
      renderGraphic(response.data)
    })
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

  let datolongitudX = 0
  let datolongitudY = 0

  function renderPoint (data, index) {
    $scope.colorSexo = $scope.sexo === 'Hombre' ? '#0197d6' : '#e47db4'
    let edad = $scope.objectNacimiento.meses

    const duracion = duration(new Date($scope.fechaNacimiento), new Date(data.fecha))
    const ageMonth = (duracion.years * 12) + duracion.months

    let tallaData = data.talla - 44
    let decimalTalla = parseInt((data.talla - 44).toString().split(".")[1])
    let celdatalla = 34

    if (tallaData === 1) tallaData = tallaData
    if (tallaData < 16) tallaData = tallaData / 3
    if (tallaData >= 16) tallaData = tallaData / 4
    if ((data.talla - 44) >= 36) tallaData = (data.talla - 44) / 4.5
    if (tallaData === 18) tallaData -= 1

    tallaData = parseInt(tallaData)

    if (tallaData === 0) tallaData = 1
    if (tallaData >= 5) celdatalla = 33

    tallaData = parseFloat(tallaData + "." + decimalTalla)

    const imcData = data.imc - 9
    const celdaIMC = imcData === 1 ? 32 : 37

    const cefalicoData = data.pencefalico - 31
    const celdaCefalico = cefalicoData === 1 ? 23 : 24

    if (index !== 0) {
      peso.line((ageMonth/2)*28, 18*(data.peso-1), datoPesoX, datPesoY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)

      longitud.line((ageMonth/2)*28, celdatalla * tallaData, datolongitudX, datolongitudY).attr({
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
    longitud.circle((ageMonth/2)*28, celdatalla * tallaData, 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster-longitud')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 80) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 46) + 'px'
      toaster.innerText = `Talla: ${data.talla} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster-longitud').slideDown()
    })
    .mouseout(function () {
      $('.toaster-longitud').slideUp()
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

    datolongitudX = (ageMonth/2)*28
    datolongitudY = celdatalla * tallaData

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
        $('.GraficaLongitud img').attr('src', 'assets/img/graficas/ninos-2meses_5anos/talla.png')
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
        $('.GraficaLongitud img').attr('src', 'assets/img/graficas/ninas-2mese_5anos/talla.png')
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

        const tallaSvg =  document.querySelector('.Talla28CMayor')
        const pesoSvg = document.querySelector('.Peso28CMayor')
        const imcSVG = document.querySelector('.IMC28CMayor')
        tallaSvg.style.left = '9%'
        tallaSvg.style.width = '85.1%'
        tallaSvg.style.height = '77.9%'

        pesoSvg.style.top = '17.2%'
        pesoSvg.style.left = '7.5%'
        pesoSvg.style.width = '83.1%'
        pesoSvg.style.height = '74.3%'

        imcSVG.style.top = '13.8%'
        imcSVG.style.left = '7.3%'
        imcSVG.style.width = '87.5%'
        imcSVG.style.height = '74.9%'

        $('.footer-msp').html('MSP HCU - Form 028 A4/09')
        $('.footer-graphic').html('CURVA DE CRECIMIENTO DEL NIÑA DE 5 A 9 AÑOS')
      }
    }
  }

})
