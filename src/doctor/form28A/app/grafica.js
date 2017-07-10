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
  })

  function graficPoint (data, fechaNacimiento) {
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
          y = celda * i - 22 - base
        }
        console.log(y)
      }

      s.circle(age*28.5, y, 50).attr({
        fill: `${dame_color_aleatorio()}`,
        stroke: `${dame_color_aleatorio()}`,
        strokeWidth: 2
      }).animate({r: 4}, 1000)

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
