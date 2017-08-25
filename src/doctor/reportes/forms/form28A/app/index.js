'use strict'

angular.module('Hospital')
.controller('reportform28ACtrl', function ($scope, $http, $stateParams, $location) {

  const paciente = $stateParams.id
  const turno = $stateParams.turno
  const hoy = new Date()

  const dia = hoy.getDate() < 10 ? '0' + hoy.getDate() : hoy.getDate()
  const mes = hoy.getMonth() < 10 ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)

  $scope.activoForm28 = false
  $scope.fecha = `${dia}/${mes}/${hoy.getFullYear()}`
  $scope.sistemas = []
  $scope.fisicos = []
  $scope.pacient = {}
  $scope.empresa = {}
  $scope.year = hoy.getFullYear()
  $scope.data = {
    motivo: '',
    enfermedad: '',
    paciente,
    turno,
    gestasPrevias: '',
    abortos: '',
    partos: '',
    partosVaginales: '',
    cesarias: '',
    nacidosVivos: '',
    hijosVivos: '',
    muertosMenor7: '',
    muertosMayor7: '',
    nacidosMuertos: '',
    fechaEmbarazo: '',
    tamizaje: '',
    condicionEgreso: '',
    referido: '',
    edadGestion: '',
    relacionPeso: '',
    tipoficacionSanguinea: '',
    tipoficacionSanguineaCheck: 'no',
    examenesEspeciales: '',
    examenesEspecialesCheck: 'no',
    apagar1Min: '',
    apagar5Min: '',
    longitud: '',
    pCefalico: '',
    pesoNacer: '',
    reanimacion: '',
    reanimacionCheck: 'no'
  }

	let array_sistemas = []
  let array_fisicos = []
  let array_form = []
  let array_atendido = []

  $http.get(`src/doctor/form28C/service/consultas.php?id=${paciente}`)
  .then(response => {
    console.log(response);
    // $scope.consulta = response.data.count + 1
    // const parametros = response.data.paciente.hgc_fecn_pacie.toString().split('-')
    // const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
    // const now = new Date()
    //
    // $scope.edad = duration(now, fecha)
  })

  $http.get('src/doctor/form28A/service/sistemas.php')
  .then(response => $scope.sistemas = response.data)

  $http.get('src/doctor/form28A/service/fisico.php')
  .then(response => $scope.fisicos = response.data)

  $http.get(`src/doctor/form28A/service/paciente.php?id=${paciente}`)
  .then(response => $scope.pacient = response.data)

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) {
      $scope.empresa = response.data.empresa
    }
  })

  $scope.handleBack = () => {
    $('#hoja__1').slideDown()
    $('#hoja__2').slideUp()
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  setTimeout(
    () => {
      [...document.querySelectorAll('.input-field label')].map(item => {
        item.classList.add('active')
      })
    },
    500
  )

  $scope.data = {
    motivo: '',
    enfermedad: '',
    paciente,
    turno,
    gestasPrevias: '',
    abortos: '',
    partos: '',
    partosVaginales: '',
    cesarias: '',
    nacidosVivos: '',
    hijosVivos: '',
    muertosMenor7: '',
    muertosMayor7: '',
    nacidosMuertos: '',
    fechaEmbarazo: '',
    tamizaje: '',
    condicionEgreso: '',
    referido: '',
    edadGestion: '',
    relacionPeso: '',
    tipoficacionSanguinea: '',
    tipoficacionSanguineaCheck: 'no',
    examenesEspeciales: '',
    examenesEspecialesCheck: 'no',
    apagar1Min: '',
    apagar5Min: '',
    longitud: '',
    pCefalico: '',
    pesoNacer: '',
    reanimacion: '',
    reanimacionCheck: 'no'
  }

  $http.get(`src/doctor/form28A/service/get.php?id=${paciente}&turno=${turno}`)
  .then(response => {
    const form = response.data
    $scope.data = {
      motivo: form.form.hgc_moti_form28,
      enfermedad: form.form.hgc_enfer_form28,
      id: form.form.hgc_codi_form28,
      paciente,
      turno,
      gestasPrevias: form.observacion.hgc_gpre_obst,
      abortos: form.observacion.hgc_abor_obst,
      partos: form.observacion.hgc_part_obst,
      partosVaginales: form.observacion.hgc_pvag_obst,
      cesarias: form.observacion.hgc_cesa_obst,
      nacidosVivos: form.observacion.hgc_nviv_obst,
      hijosVivos: form.observacion.hgc_nmue_obst,
      muertosMenor7: form.observacion.hgc_hviv_obst,
      muertosMayor7: form.observacion.hgc_mne7_obst,
      nacidosMuertos: form.observacion.hgc_mma7_obst,
      fechaEmbarazo: form.observacion.hgc_gpre_obst,
      tamizaje: form.nacido.hgc_tami_nac,
      condicionEgreso: form.nacido.hgc_coeg_nac,
      referido: form.nacido.hgc_refe_nac,
      edadGestion: form.nacido.hgc_edge_nac,
      relacionPeso: form.nacido.hgc_repe_nac,
      tipoficacionSanguinea: form.nacido.hgc_tipob_nac,
      tipoficacionSanguineaCheck: form.nacido.hgc_tisa_nac,
      examenesEspeciales: form.nacido.hgc_exob_nac,
      examenesEspecialesCheck: form.nacido.hgc_exes_nac,
      apagar1Min: form.nacido.hgc_ap1m_nac,
      apagar5Min: form.nacido.hgc_ap5m_nac,
      longitud: form.nacido.hgc_lon_nac,
      pCefalico: form.nacido.hgc_pcef_nac,
      pesoNacer: form.nacido.hgc_pena_nac,
      reanimacion: form.nacido.hgc_reob_nac,
      reanimacionCheck: form.nacido.hgc_rean_nac
    }

    form.atendido.map(item => {
      setTimeout(() => {
        document.querySelector(`#${item.hgc_tipo_aten}_${item.hgc_desc_aten}`).checked = true
      }, 100)
    })

    // let tipo = item.value.split('_')[0]
    // let id = item.value.split('_')[1]
    // let seccion = item.value.split('_')[2]
    // let observacion = document.getElementById(`input__form-${id}`).value

    form.detalle.map(item => {
      setTimeout(() => {
        let code = `${item.hgc_tipo_dform28}_${item.hgc_codi_dform28}_${item.hgc_secc_dform28}`
        let input = document.querySelector(`input[value="${code}"]`)
        let obs = document.querySelector(`#input__form-${item.hgc_codi_dform28}`)
        let system = document.querySelector(`#input-system-${item.hgc_codi_dform28}`)
        let fisico = document.querySelector(`#input-fisico-${item.hgc_codi_dform28}`)

        if (obs !== null) {
          obs.value = item.hgc_obser_dform28
        } else if (system !== null) {
          system.value = item.hgc_obser_dform28
        } else if (fisico !== null) {
          fisico.value = item.hgc_obser_dform28
        }

        if (input !== null) {
          input.checked = true
        }
        else {
          code = `${item.hgc_tipo_dform28}_${item.hgc_codi_dform28}`
          input = document.querySelector(`input[value="${code}"]`)
          input.checked = true
        }
      }, 100)

    })
  })

  $scope.ant_maternos = []
  $scope.ant_familiares = []
  $scope.ant_prenatales = []
  $scope.nacimientos = []
  $scope.recien_nacidos = []
  $scope.abstre = {
    embarazo: false,
    gemelar: false
  }

  $http.get('src/doctor/form28A/service/items.php?tipo=3')
  .then(response => $scope.ant_maternos = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=4')
  .then(response => $scope.ant_familiares = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=5')
  .then(response => $scope.ant_prenatales = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=6')
  .then(response => $scope.nacimientos = response.data)

  $http.get('src/doctor/form28A/service/items.php?tipo=7')
  .then(response => $scope.recien_nacidos = response.data)

  $scope.handleNext = () => {
    if (validar()) {
      $('#hoja__1').slideUp()
      $('#hoja__2').slideDown()
      setTimeout(() => window.scrollTo(0, 0), 100)
    }
  }
  const s = Snap("#grafica_curva_crecimiento")
  const longitud = Snap('#grafica_curva_crecimientoLongitud')
  const perimetro = Snap('#grafica_curva_crecimientoPerimetro')

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

  $scope.signos = {}

  $http.get(`src/doctor/form28A/service/signosVitales.php?turno=${turno}`)
  .then(response => $scope.signos = response.data)

  $scope.export = () => {
    alert('Ok')
    html2canvas(document.getElementById('exportthis'), {
      onrendered: function (canvas) {
        var data = canvas.toDataURL();
        console.log(data);
        var docDefinition = {
            content: [{
                image: data,
                width: 500,
            }]
        };
        pdfMake.createPdf(docDefinition).download("form.pdf");
      }
    });
  }

})
