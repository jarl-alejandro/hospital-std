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

    let pointTalla = item.talla - 90
    if (pointTalla   !== 0) pointTalla = parseInt(pointTalla.toString().split("")[0])

    let imcData = (item.imc - 10)
    let celdaIMC = 14
    let base = 28

    if (imcData === 2) imcData = 1
    if (imcData > 2) celdaIMC = 16

    let celdaYear = duracion.years - 5
    const cx = (155 * celdaYear) + (duracion.months/3) * 37

    if (index !== 0) {

      peso.line(cx, 18*(item.peso-1), datoPesoX, datPesoY).attr({
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

    peso.circle(cx, 18*(item.peso-1), 50).attr({
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
      console.log(duracion)
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
    imc.circle(cx, (celdaIMC * imcData), 50).attr({
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
    datPesoY = 18*(item.peso-1)

    datoIMCX = cx
    datIMCY = (celdaIMC * imcData)

    datoTallaX = cx
    datoTallaY = 52 * pointTalla
  }

})
