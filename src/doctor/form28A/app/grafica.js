'use struct'

const grafica028A = angular.module('Hospital')

grafica028A.controller('graficas028AController', function ($scope, $http, $stateParams) {
  const s = Snap("#grafica_curva_crecimiento")
  const paciente = $stateParams.id
  const now = new Date()

  $http.get(`src/doctor/form28A/service/curva_crecimiento.php?id=${paciente}`)
  .then(response => {
    paintBorderBySex(response.data.paciente.hgc_desc_genero)
    graficPoint(response.data.signos, response.data.paciente.hgc_fecn_pacie)

    // s.path('M 88 28 C 719 156 199 1  100 100 M 190 100 z').attr({
    //   stroke: `${dame_color_aleatorio()}`,
    //   strokeWidth: 50,
    //   fill: 'none'
    // }).animate({ strokeWidth: 2 }, 1000)
    // s.line(88, 27, 396.15000000000003, 81).attr({strokeWidth: 3, stroke: `${dame_color_aleatorio()}`})

  })

  function graficPoint (data, fechaNacimiento) {
    let datoX = 0
    let datoY = 0
    data.map((item, index) => {
      const age = getAgeByMonth(item.fecha, fechaNacimiento)
      const peso = parseFloat(item.peso)
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

      s.circle(age*28.5, y, 50).attr({
        fill: `${dame_color_aleatorio()}`,
        stroke: `${dame_color_aleatorio()}`,
        strokeWidth: 2
      }).animate({r: 4}, 1000)

      if (index !== 0) {
        s.line(age*28.5, y, datoX, datoY).attr({
          strokeWidth: 3, stroke: `${dame_color_aleatorio()}`
        })
      }


      datoX = age*28.5
      datoY = y

    })
  }

  function getAgeByMonth (dateAttended, fechaNacimiento) {
    let aFecha1 = dateAttended.split('-')
    let aFecha2 = fechaNacimiento.split('-')
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
      $('.grafica028A').css({
        'background-image': `url(assets/img/graficas/peso_hombre.png)`
      })
    } else {
      $('.grafica028A').css({
        'background-image': `url(assets/img/graficas/peso_mujer.png)`
      })
    }
  }

})
