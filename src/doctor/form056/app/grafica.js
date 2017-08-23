'use strict'

angular.module('Hospital')
.controller('formGraphic056ABCtrl', function ($scope, $http, $stateParams) {

  $scope.paciente = {}
  $scope.graficaFlag = false
  $scope.graficaFlag2 = false
  $scope.colorSexo = '#0197d6'

  const imc = Snap('#graficaPaper-imc__svg')
  const peso = Snap('#pesoEdad056')
  const talla = Snap('#tallaEdad056')
  const speed = Snap('#Speed')

  let datoIMCX = 0
  let datIMCY = 0

  let datoPesoX = 0
  let datPesoY = 0

  let datoTallaX = 0
  let datTallaY = 0

  let datoSpeedX = 0
  let dataSpeedY = 0

  $http.get(`src/doctor/form056/service/paciente.php?id=${$stateParams.id}`)
  .then(response => {
    $scope.paciente = response.data.paciente
    $scope.fechaNacimiento = $scope.paciente.hgc_fecn_pacie
    $scope.sexo = response.data.sexo.hgc_desc_genero
    $scope.colorSexo = $scope.sexo === 'Hombre' ? '#0197d6' : '#e47db4'
    $scope.title = $scope.sexo === 'Mujer' ? 'FORM. 056 A' : 'FORM. 056 B'

    if ($scope.sexo === 'Mujer') {
      $('.imc__img').attr('src', 'assets/img/graficas/mujeres/indice-masa-corporal.jpg')
      $('.evolucionMaduracion__img').attr('src', 'assets/img/graficas/mujeres/tanner.jpg')
      $('.velocidadCrecimiento__img').attr('src', 'assets/img/graficas/mujeres/velocidad-de-crecimiento.jpg')
      $('.percentiles-img').attr('src', 'assets/img/graficas/mujeres/peso-edad.jpg')
      $('.talla-img').attr('src', 'assets/img/graficas/mujeres/talla-edad.jpg')
    }
    else {
      $('.imc__img').attr('src', 'assets/img/graficas/hombres/indice-de-masa-corporal.jpg')
      $('.evolucionMaduracion__img').attr('src', 'assets/img/graficas/hombres/tanner-hombres.jpg')
      $('.velocidadCrecimiento__img').attr('src', 'assets/img/graficas/hombres/velocidad-de-crecimiento.jpg')
      $('.percentiles-img').attr('src', 'assets/img/graficas/hombres/peso-edad.jpg')
      $('.talla-img').attr('src', 'assets/img/graficas/hombres/talla-edad.jpg')
    }

  })

  setTimeout(()=> {
    $http.get(`src/doctor/form056/service/grafica.php?id=${$stateParams.id}`)
    .then(response => {
      response.data.map((data, index) => graphicIMC(data.hgc_imc_sigvit, data.hgc_fecha_sigvit, index))
      response.data.map((data, index) => graphicPeso(data.hgc_peso_sigvit, data.hgc_fecha_sigvit, index))
      response.data.map((data, index) => graphicTalla(data.hgc_talla_sigvit, data.hgc_fecha_sigvit, index))
      response.data.map((data, index) => graphicSpeed(data.hgc_talla_sigvit, data.hgc_fecha_sigvit, index))
    })
  }, 500)

  $scope.handleToggleOne = () => $scope.graficaFlag = !$scope.graficaFlag
  $scope.handleToggleTwo = () => $scope.graficaFlag2 = !$scope.graficaFlag2

  function graphicSpeed (tallaData, fecha, index) {
    const atencion = fecha.split("-")
    const nacimiento = $scope.fechaNacimiento.split("-")

    const duracion = duration(
      new Date(atencion[0]+"/"+atencion[1]+"/"+atencion[2]),
      new Date(nacimiento[0]+"/"+nacimiento[1]+"/"+nacimiento[2])
    )

    let celdaYear = duracion.years - 10
    let celda = (9/2) * duracion.months
    const cx = (celdaYear * 162) + celda

    let celdaTalla = 1

    if (index > 0) {
      speed.line(cx, celdaTalla * tallaData, datoSpeedX, dataSpeedY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)
    }

    // talla graphic
    speed.circle(cx, celdaTalla * tallaData, 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster-cefalico')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 110) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 60) + 'px'
      toaster.innerText = `Talla: ${tallaData} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster-cefalico').slideDown()
    })
    .mouseout(function () {
      $('.toaster-cefalico').slideUp()
    })
    // talla graphic

    datoSpeedX = cx
    dataSpeedY = celdaTalla * tallaData
  }

  function graphicIMC (imcData, fecha, index) {
    const atencion = fecha.split("-")
    const nacimiento = $scope.fechaNacimiento.split("-")

    const duracion = duration(
      new Date(atencion[0]+"/"+atencion[1]+"/"+atencion[2]),
      new Date(nacimiento[0]+"/"+nacimiento[1]+"/"+nacimiento[2])
    )

    let imcY = imcData - 11
    imcY = imcY / 2
    imcY += 0.4

    let celdaYear = duracion.years - 10
    let celda = (28/3) * duracion.months
    const cx = (celdaYear * 105) + celda

    let celdaIMC = 24

    if (parseFloat(imcData) >= 16) celdaIMC = 28
    if (parseFloat(imcData) >= 24) celdaIMC = 30
    if (parseFloat(imcData) >= 30) celdaIMC = 30.4

    if (index > 0) {
      imc.line(cx, celdaIMC * imcY, datoIMCX, datIMCY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)
    }

    // IMC graphic
    imc.circle(cx, celdaIMC * imcY, 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster-imc-mayor')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 110) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 150) + 'px'
      toaster.innerText = `IMC: ${imcData} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster-imc-mayor').slideDown()
    })
    .mouseout(function () {
      $('.toaster-imc-mayor').slideUp()
    })
    // IMC graphic

    datoIMCX = cx
    datIMCY = celdaIMC * imcY

  }

  function graphicPeso (pesoData, fecha, index) {
    const atencion = fecha.split("-")
    const nacimiento = $scope.fechaNacimiento.split("-")

    const duracion = duration(
      new Date(atencion[0]+"/"+atencion[1]+"/"+atencion[2]),
      new Date(nacimiento[0]+"/"+nacimiento[1]+"/"+nacimiento[2])
    )
    let pesoY = pesoData.toString().split('')[0] - 1

    let celdaYear = duracion.years - 10
    let celda = 6 * duracion.months
    const cx = (celdaYear * 83) + celda

    let celdaData = 0.7

    if (pesoData >= 30) celdaData = 1.8
    if (pesoData >= 35) celdaData = 2.5
    if (pesoData >= 40) celdaData = 3.3
    if (pesoData >= 45) celdaData = 3.8
    if (pesoData >= 50) celdaData = 4.2
    if (pesoData >= 55) celdaData = 4.5
    if (pesoData >= 60) celdaData = 4.8
    if (pesoData >= 65) celdaData = 5
    if (pesoData >= 70) celdaData = 5.2
    if (pesoData >= 75) celdaData = 5.4
    if (pesoData >= 80) celdaData = 5.5
    if (pesoData >= 85) celdaData = 5.6
    if (pesoData >= 90) celdaData = 5.8
    if (pesoData >= 95) celdaData = 5.9
    if (pesoData >= 105) celdaData = 6

    if (index > 0) {
      peso.line(cx, celdaData * pesoData, datoPesoX, datPesoY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)
    }

    peso.circle(cx, celdaData * pesoData, 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 215) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 30) + 'px'
      toaster.innerText = `Peso: ${pesoData} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster').slideDown()
    })
    .mouseout(function () {
      $('.toaster').slideUp()
    })

    datoPesoX = cx
    datPesoY = celdaData * pesoData
  }

  function graphicTalla (tallaData, fecha, index) {
    const atencion = fecha.split("-")
    const nacimiento = $scope.fechaNacimiento.split("-")

    const duracion = duration(
      new Date(atencion[0]+"/"+atencion[1]+"/"+atencion[2]),
      new Date(nacimiento[0]+"/"+nacimiento[1]+"/"+nacimiento[2])
    )

    let celdaYear = duracion.years - 10
    let celda = (20/3) * duracion.months
    const cx = (celdaYear * 88) + celda

    let celdaTalla = 0

    if (tallaData === 110) celdaTalla = 0
    if (tallaData > 110) celdaTalla = 0.6
    if (tallaData >= 130) celdaTalla = 1
    if (tallaData >= 140) celdaTalla = 1.4
    if (tallaData >= 150) celdaTalla = 1.8

    if (tallaData >= 160) celdaTalla = 2.1
    if (tallaData >= 170) celdaTalla = 2.3
    if (tallaData >= 180) celdaTalla = 2.6
    if (tallaData >= 190) celdaTalla = 2.8
    if (tallaData >= 200) celdaTalla = 2.9

    if (index > 0) {
      talla.line(cx, celdaTalla * tallaData, datoTallaX, datTallaY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)
    }

    // talla graphic
    talla.circle(cx, celdaTalla * tallaData, 50).attr({
      fill: `${$scope.colorSexo}`,
      stroke: `${$scope.colorSexo}`,
      strokeWidth: 7
    }).animate({r: 5}, 1000)
    .mouseover(function () {
      let toaster = document.querySelector('.toaster-longitud')
      toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 195) + 'px'
      toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 100) + 'px'
      toaster.innerText = `Talla: ${tallaData} - Edad: ${duracion.years} años, ${duracion.months} mes`
      $('.toaster-longitud').slideDown()
    })
    .mouseout(function () {
      $('.toaster-longitud').slideUp()
    })
    // talla graphic

    datoTallaX = cx
    datTallaY = celdaTalla * tallaData
  }
})
