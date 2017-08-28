'use strict'

angular.module('Hospital')
.controller('graphicform28CCtrl', function ($scope, $http, $stateParams) {
  $scope.fechaFlag = false
  $scope.objectNacimiento = {}

  const peso = Snap('.Peso28CMayor')
  const talla = Snap('.Talla28CMayor')
  const imc = Snap('.IMC28CMayor')

  let datoPesoX = 0
  let datPesoY = 0

  let datoIMCX = 0
  let datIMCY = 0

  let datoTallaX = 0
  let datoTallaY = 0

  $http.get(`src/doctor/form28C/service/grafica.php?id=${$stateParams.id}`)
  .then(response => {
    $scope.sexo = response.data.paciente.hgc_desc_genero
    $scope.fechaNacimiento = response.data.paciente.hgc_fecn_pacie
    response.data.signos.map((item, index) => renderPoint(item, index))
  })

  function renderPoint (item, index) {
    $scope.colorSexo = $scope.sexo === 'Hombre' ? '#0197d6' : '#e47db4'
    const duracion = duration(new Date($scope.fechaNacimiento), new Date(item.fecha))
    const ageMonth = (duracion.years * 12) + duracion.months

    let celdaYear = duracion.years - 5
    const cx = (155 * celdaYear) + (duracion.months/3) * 37

    let pesoAltura = 50
    let pesoCelda = (item.peso - 14) / 3
    let decimalPeso = item.peso.toString().split(".")[1]
    pesoCelda = parseInt(pesoCelda)

    if (pesoCelda >= 5) pesoCelda = (item.peso - 14) / 4
    if (item.peso >= 50) pesoCelda = pesoCelda -= 1
    if (pesoCelda === 0) pesoCelda = 1
    if (pesoCelda >= 2) pesoAltura = 55
    if (pesoCelda >= 5) pesoAltura = 57
    if (pesoCelda >= 8) pesoAltura = 58

    if($scope.sexo === 'Mujer') {
      pesoAltura = 52
      if (pesoCelda >= 2) pesoAltura = 55
      if (pesoCelda >= 5) pesoAltura = 52.5
      if (pesoCelda >= 8) pesoAltura = 53.5
    }

    pesoCelda = parseInt(pesoCelda)
    pesoCelda = parseFloat(pesoCelda + "." + parseInt(decimalPeso/2))

    let pointTalla = parseFloat(item.talla) - 90
    if (pointTalla > 0) pointTalla = parseInt(pointTalla.toString().split("")[0])

    let imcData = item.imc - 10
    let celdaIMC = 14

    imcData = imcData / 2
    if (imcData >= 2) celdaIMC = 34
    if (imcData >= 3) celdaIMC = 37
    if (imcData >= 4) celdaIMC = 42
    if (imcData >= 6) celdaIMC = 44.5
    if (imcData >= 7) celdaIMC = 45
    if (imcData >= 8) celdaIMC = 46
    if (imcData >= 10) celdaIMC = 47

    if (index !== 0) {

      peso.line(cx, pesoAltura * pesoCelda, datoPesoX, datPesoY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)

      imc.line(cx, (celdaIMC * imcData), datoIMCX, datIMCY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)

      talla.line(cx, 52 * pointTalla, datoTallaX, datoTallaY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)
    }

    peso.circle(cx, pesoAltura * pesoCelda, 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster-peso-mayor')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 80) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 46) + 'px'
      toaster.innerText = `Peso: ${item.peso} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster-peso-mayor').slideDown()
    })
    .mouseout(function () {
      $('.toaster-peso-mayor').slideUp()
    })

    talla.circle(cx, 52 * pointTalla, 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster-talla-mayor')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 85) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 55) + 'px'
      toaster.innerText = `Talla: ${item.talla} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster-talla-mayor').slideDown()
    })
    .mouseout(function () {
      $('.toaster-talla-mayor').slideUp()
    })

    // IMC graphic
    imc.circle(cx, celdaIMC * imcData, 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster-imc-mayor')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 93) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 60) + 'px'
      toaster.innerText = `IMC: ${item.imc} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster-imc-mayor').slideDown()
    })
    .mouseout(function () {
      $('.toaster-imc-mayor').slideUp()
    })
    // IMC graphic

    datoPesoX = cx
    datPesoY = pesoAltura * pesoCelda

    datoIMCX = cx
    datIMCY = celdaIMC * imcData

    datoTallaX = cx
    datoTallaY = 52 * pointTalla
  }

})
