'use struct'

const grafica028A = angular.module('Hospital')

grafica028A.controller('graficas028AController', function ($scope, $http, $stateParams) {
  const s = Snap("#grafica_curva_crecimiento")
  const longitud = Snap('#grafica_curva_crecimientoLongitud')
  const perimetro = Snap('#grafica_curva_crecimientoPerimetro')

  const paciente = $stateParams.id
  const now = new Date()

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

    data.map((item, index) => {
      const age = getAgeByMonth(item.fecha, fechaNacimiento)
      const yPeso = coordinateYPeso(parseFloat(item.peso))
      const yPerimetro = coordinateYPerimetro(parseFloat(item.pencefalico))
      const yLongitud = coordinateYLongitud(parseFloat(item.longitud))

      s.circle(age*28.5, yPeso, 50).attr({
        fill: `${dame_color_aleatorio()}`,
        stroke: `${dame_color_aleatorio()}`,
        strokeWidth: 2
      }).animate({r: 5}, 1000).mouseover(
        function () {
          let div = document.createElement('div')
          div.classList.add('tooltip-svg')
          div.innerText = `edad: ${age}, peso: ${yPeso}`

          div.style.top = `-${yPeso}%`
          div.style.left = `20%`
          document.querySelector('.grafica028A').appendChild(div)

          console.log(this)
        }
      ).mouseout(function () {
          setTimeout(() => {
            document.querySelector('.tooltip-svg').remove()
          }, 600)
      })

      longitud.circle(age*28.5, yLongitud, 50).attr({
        fill: `${dame_color_aleatorio()}`,
        stroke: `${dame_color_aleatorio()}`,
        strokeWidth: 2
      }).animate({r: 4}, 1000)

      perimetro.circle(age*65, yPerimetro, 50).attr({
        fill: `${dame_color_aleatorio()}`,
        stroke: `${dame_color_aleatorio()}`,
        strokeWidth: 2
      }).animate({r: 4}, 1000)

      if (index !== 0) {
        s.line(age*28.5, yPeso, datoX, datoY).attr({
          strokeWidth: 3,
          stroke: `${dame_color_aleatorio()}`,
          strokeDasharray: '9px',
          strokeDashoffset: '7px'
        }).animate({ strokeDasharray: '21px' }, 4000)

        perimetro.line(age*65, yPerimetro, datoXPerimetro, datoYPerimetro).attr({
          strokeWidth: 3,
          stroke: `${dame_color_aleatorio()}`,
          strokeDasharray: '9px',
          strokeDashoffset: '7px'
        }).animate({ strokeDasharray: '21px' }, 4000)
      }

      datoX = age*28.5
      datoY = yPeso

      datoXPerimetro = age*65
      datoYPerimetro = yPerimetro
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

  function coordinateYLongitud (longitud) {
    let y = 0
    let celda = 70
    longitud = longitud - 45
    let a = -3

    for (let i=0; i<longitud; i++) a++

    for (let i=0; i<a; i++) {
      if (a % 1 === 0) {
        y = celda * i
      } else {
        let u = i - 1
        let decimal = longitud % 1
        decimal = parseFloat(decimal.toFixed(2))
        let fraccion = 1 / decimal
        fraccion = parseInt(fraccion)
        y = (celda * u) + (celda / fraccion)
      }
    }
    return y
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
    return parseFloat(semanas)
  }

  function paintBorderBySex (sexo) {
    if (sexo === 'Hombre') {
      $('.grafica028A').css({ 'background-image': `url(assets/img/graficas/peso_hombre.png)` })
      $('.grafica028ALongitud').css({'background-image': `url(assets/img/graficas/longitud_hombre.png)`})
      $('.grafica028APerimetro').css({'background-image': `url(assets/img/graficas/perimetro_hombre.png)`})

      $('.GraficaHeaderPeso-title').html(`Peso para la edad Niños`)
      $('.GraficaHeaderPerimetro-title').html(`Perímetro cefálico para la edad Niñas`)
      $('.GraficaHeaderLongitud-title').html(`Longitud para la edad Niñas`)

      $('.GraficaHeader-nina').removeClass('GraficaHeader-nina')
      $('.GraficaHeader-title').addClass('GraficaHeader-nino')
    } else {
      $('.grafica028A').css({'background-image': `url(assets/img/graficas/peso_mujer.png)`})
      $('.grafica028ALongitud').css({'background-image': `url(assets/img/graficas/longitud_mujer.png)`})
      $('.grafica028APerimetro').css({'background-image': `url(assets/img/graficas/perimetro_mujer.png)`})

      $('.GraficaHeaderPeso-title').html(`Peso para la edad Niñas`)
      $('.GraficaHeaderPerimetro-title').html(`Perímetro cefálico para la edad Niñas`)
      $('.GraficaHeaderLongitud-title').html(`Longitud para la edad Niñas`)

      $('.GraficaHeader-nino').removeClass('GraficaHeader-nino')
      $('.GraficaHeader-title').addClass('GraficaHeader-nina')
    }
  }

})
