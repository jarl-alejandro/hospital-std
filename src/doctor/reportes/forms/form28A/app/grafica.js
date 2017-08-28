'use struct'

angular.module('Hospital')
.controller('graficas028AController', function ($scope, $http, $stateParams) {
  const s = Snap("#grafica_curva_crecimiento")
  const longitud = Snap('#grafica_curva_crecimientoLongitud')
  const perimetro = Snap('#grafica_curva_crecimientoPerimetro')

  const paciente = $stateParams.id
  const now = new Date()

  $scope.sexo = 'Hombre'

  $http.get(`src/doctor/form28A/service/curva_crecimiento.php?id=${paciente}`)
  .then(response => {
    paintBorderBySex(response.data.paciente.hgc_desc_genero)
    graficPoint(response.data.signos, response.data.paciente.hgc_fecn_pacie)
  })

  function graficPoint (data, fechaNacimiento) {
    let datoX = 0
    let datoY = 0
    let datoXPerimetro = 0
    let datoYPerimetro = 0
    let datoXLongitud = 0
    let datoYLongitud = 0

    $scope.colorSexo = $scope.sexo === 'Hombre' ? '#0197d6' : '#e47db4'

    data.map((item, index) => {
      const duracion = duration(new Date(fechaNacimiento), new Date(item.fecha))
      const age = getAgeByMonth(item.fecha, fechaNacimiento)
      const yPeso = coordinateYPeso(parseFloat(item.peso))
      const yPerimetro = coordinateYPerimetro(parseFloat(item.pencefalico))
      const yLongitud = coordinateYLongitud(parseFloat(item.longitud))

      if (index !== 0) {
        s.line(age*28.5, yPeso, datoX, datoY).attr({
          strokeWidth: 3,
          stroke: `${$scope.colorSexo}`,
        }).animate({ strokeDasharray: '21px' }, 4000)

        perimetro.line(age*65, yPerimetro, datoXPerimetro, datoYPerimetro).attr({
          strokeWidth: 3,
          stroke: `${$scope.colorSexo}`
        }).animate({ strokeDasharray: '21px' }, 4000)

        longitud.line(age*35.5, yLongitud, datoXLongitud, datoYLongitud).attr({
          strokeWidth: 3,
          stroke: `${$scope.colorSexo}`
        }).animate({ strokeDasharray: '21px' }, 4000)
      }

      s.circle(age*28.5, yPeso, 50).attr({
        fill: `${$scope.colorSexo}`,
        stroke: `${$scope.colorSexo}`,
        strokeWidth: 7
      }).animate({r: 5}, 1000).mouseover(function () {
        let toaster = document.querySelector('.toaster')
        toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 80) + 'px'
        toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 46) + 'px'
        toaster.innerText = `Peso: ${item.peso} - Edad: ${duracion.years} años, ${duracion.months} mes`
        $('.toaster').slideDown()
      })
      .mouseout(function () {
        $('.toaster').slideUp()
      })

      longitud.circle(age*35.5, yLongitud, 50).attr({
        fill: `none`,
        stroke: `${$scope.colorSexo}`,
        strokeWidth: 7
      }).animate({r: 5}, 1000).mouseover(function () {
        let toaster = document.querySelector('.toaster-longitud')
        toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 80) + 'px'
        toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 46) + 'px'
        toaster.innerText = `Longitud: ${item.longitud} - Edad: ${duracion.years} años, ${duracion.months} mes`
        $('.toaster-longitud').slideDown()
      }).mouseout(function () {
        $('.toaster-longitud').slideUp()
      })

      perimetro.circle(age*65, yPerimetro, 50).attr({
        fill: `${$scope.colorSexo}`,
        stroke: `${$scope.colorSexo}`,
        strokeWidth: 7
      }).animate({r: 5}, 1000)
      .mouseover(function () {
        let toaster = document.querySelector('.toaster-cefalico')
        toaster.style.left = (parseFloat(this.node.getAttribute("cx")) + 89) + 'px'
        toaster.style.bottom = (parseFloat(this.node.getAttribute("cy")) + 46) + 'px'
        toaster.innerText = `P. Cefalico: ${item.pencefalico} - Edad: ${duracion.years} años, ${duracion.months} mes`
        $('.toaster-cefalico').slideDown()
      }).mouseout(function () {
        $('.toaster-cefalico').slideUp()
      })

      datoX = age*28.5
      datoY = yPeso

      datoXPerimetro = age*65
      datoYPerimetro = yPerimetro

      datoXLongitud = age*35.5
      datoYLongitud = yLongitud
    })
  }

  function coordinateYPeso (peso) {
    let y = 0

    if (peso === 1) y = 7
    else if (peso === 2) y = 14
    else if (peso > 2) {
      let celda = 46
      let base = 14

      for (let i=0; i<peso; i++) {
        if (peso % 1 === 0) {
          y = celda * i - 20 - base
        } else {
          let a = i - 1
          let decimal = peso % 1
          decimal = parseFloat(decimal.toFixed(2))
          let fraccion = 1 / decimal
          fraccion = parseInt(fraccion)
          y = (celda * a - 20 - base) + (celda / fraccion)
        }
      }
    }
    return y
  }

  function coordinateYPerimetro (perimetro) {
    let y = 0
    let celda = 33.5
    let array = perimetro.toString().split("")
    perimetro = perimetro - 30

    for (let i=0; i<perimetro; i++) {
      if (perimetro % 1 === 0) {
        y = celda * i
      } else {

        let a = i - 1
        let decimal = perimetro % 1
        decimal = parseFloat(decimal.toFixed(2))
        let fraccion = 1 / decimal
        fraccion = parseInt(fraccion)
        y = (celda * a) + (celda / fraccion)
      }
    }
    return y
  }

  function coordinateYLongitud (longitudParam) {
    let celda = 70
    let y = 0
    let decimal = 0
    let longitud = parseInt(longitudParam.toString().split(".")[0])
    y = longitud % 2 === 0 ? longitud - 49  : longitud - 45

    if (y >= 10) {
      y = y.toString().split("")
      y = parseInt(y[0]) + parseInt(y[1]) + 1
    }

    y = y > 3 ? y + 1: y
    longitud === 65 && y++

    if (longitudParam.toString().split(".")[1] !== undefined) {
      decimal = parseInt(longitudParam.toString().split(".")[1])
      decimal = decimal * 7
      console.log(decimal)
    }
    return y * celda + decimal
  }

  function getAgeByMonth (dateAttended, fechaNacimiento) {
    let aFecha1 = fechaNacimiento.split('-')
    let aFecha2 = dateAttended.split('-')
    let fFecha1 = Date.UTC(aFecha1[0],aFecha1[1]-1,aFecha1[2])
    let fFecha2 = Date.UTC(aFecha2[0],aFecha2[1]-1,aFecha2[2])
    let dif = fFecha2 - fFecha1
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24))
    semanas = dias / 7
    semanas = semanas.toFixed(1)
    semanas = Math.round(semanas)

    return parseFloat(semanas)
  }

  function paintBorderBySex (sexo) {
    $scope.sexo = sexo
    if (sexo === 'Hombre') {
      $('.grafica028A').css({ 'background-image': `url(assets/img/graficas/peso_hombre.png)` })
      $('.grafica028ALongitud').css({'background-image': `url(assets/img/graficas/longitud_hombre.png)`})
      $('.grafica028APerimetro').css({'background-image': `url(assets/img/graficas/perimetro_hombre.png)`})

      $('.GraficaHeaderPeso-title').html(`Peso para la edad Niños`)
      $('.GraficaHeaderPerimetro-title').html(`P. cefálico para la edad Niños`)
      $('.GraficaHeaderLongitud-title').html(`Longitud para la edad Niños`)

      $('.GraficaHeader-nina').removeClass('GraficaHeader-nina')
      $('.GraficaHeader-title').addClass('GraficaHeader-nino')
    } else {
      $('.grafica028A').css({'background-image': `url(assets/img/graficas/peso_mujer.png)`})
      $('.grafica028ALongitud').css({'background-image': `url(assets/img/graficas/longitud_mujer.png)`})
      $('.grafica028APerimetro').css({'background-image': `url(assets/img/graficas/perimetro_mujer.png)`})

      $('.GraficaHeaderPeso-title').html(`Peso para la edad Niñas`)
      $('.GraficaHeaderPerimetro-title').html(`P. cefálico para la edad Niñas`)
      $('.GraficaHeaderLongitud-title').html(`Longitud para la edad Niñas`)

      $('.GraficaHeader-nino').removeClass('GraficaHeader-nino')
      $('.GraficaHeader-title').addClass('GraficaHeader-nina')
    }
  }

})
