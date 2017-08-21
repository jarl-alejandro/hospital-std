'use strict'

angular.module('Hospital')
.controller('formGraphic056ABCtrl', function ($scope, $http, $stateParams) {

  $scope.paciente = {}
  $scope.graficaFlag = false
  $scope.graficaFlag2 = false
  $scope.colorSexo = '#0197d6'

  const imc = Snap('#graficaPaper-imc__svg')

  let datoIMCX = 0
  let datIMCY = 0

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
      console.log(response)
      response.data.map((data, index) => graphicIMC(data.hgc_imc_sigvit, data.hgc_fecha_sigvit, index))
    })
  }, 500)

  $scope.handleToggleOne = () => $scope.graficaFlag = !$scope.graficaFlag
  $scope.handleToggleTwo = () => $scope.graficaFlag2 = !$scope.graficaFlag2

  function graphicIMC (imcData, fecha, index) {
    const atencion = fecha.split("-")
    const nacimiento = $scope.fechaNacimiento.split("-")

    const duracion = duration(
      new Date(nacimiento[0]+"/"+nacimiento[1]+"/"+nacimiento[2]),
      new Date(atencion[0]+"/"+atencion[1]+"/"+atencion[2])
    )

    console.log(atencion[0]+"/"+atencion[1]+"/"+atencion[2]);
    console.log(nacimiento[0]+"/"+nacimiento[1]+"/"+nacimiento[2]);

    console.group("---------------------")
    console.log(duracion);
    console.log($scope.fechaNacimiento);
    console.log(fecha);
    console.groupEnd()

    let imcY = imcData - 11
    imcY = imcY / 2
    imcY += 0.4

    console.log(  )

    let celdaYear = duracion.years - 10
    const cx = (celdaYear * 105)

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
})
