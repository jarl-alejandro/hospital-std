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

  let datolongitudX = 0
  let datolongitudY = 0

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
    console.log(item)

    let imcData = (item.imc - 10) / 2
    let celdaIMC = 14

    if (imcData === 1) imcData = 1
    if (imcData >= 2) celdaIMC = 32
    if (imcData >= 3) celdaIMC = 38
    if (imcData >= 4) celdaIMC = 41

    if (index !== 0) {
      imc.line((ageMonth/2), (celdaIMC * imcData), datoIMCX, datIMCY).attr({
        strokeWidth: 3,
        stroke: `${$scope.colorSexo}`,
      }).animate({ strokeDasharray: '21px' }, 4000)
    }

    peso.circle((ageMonth/2), 18*(item.peso-1), 50).attr({
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

    console.group("----------imc------------")
    console.log(imcData)
    console.log(item.imc)
    console.groupEnd()
    // IMC graphic
    imc.circle((ageMonth/2), (celdaIMC * imcData), 50).attr({
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

    datoIMCX = (ageMonth/2)
    datIMCY = (celdaIMC * imcData)
  }

})
