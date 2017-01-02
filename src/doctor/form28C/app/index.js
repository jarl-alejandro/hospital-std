'use strict'

const form28C = angular.module('Hospital')

form28C.controller('form28CController',  function ($scope, $http, $stateParams, $location, $rootScope, form028CieService) {
  const paciente = $stateParams.id
  const turno = $stateParams.turno

  const hoy = new Date()
  const dia = hoy.getDate() < 10 ? '0' + hoy.getDate() : hoy.getDate()
  const mes = hoy.getMonth() < 10 ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)

  let array_sistemas = []
  let array_fisicos = []
  let cie10Data = []

  $scope.year = hoy.getFullYear()
  $scope.fecha = `${dia}/${mes}/${hoy.getFullYear()}`
  $scope.activoForm28 = false
  $scope.sistemas = []
  $scope.fisicos = []
  $scope.data = {
    motivo: '',
    enfermedad: '',
    metodo:'',
    clasificacion: '',
    antPersonales:'',
    antfamiliares: '',
    planTratamiento: '',
    paciente,
    turno
  }

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) {
      $scope.empresa = response.data.empresa
    }
  })

  $http.get(`src/doctor/form28A/service/paciente.php?id=${paciente}`)
  .then(response => {
    $scope.pacient = response.data
    $rootScope.sexo = $scope.pacient.sexo.hgc_desc_genero
    $rootScope.fechaNacimiento = response.data.paciente.hgc_fecn_pacie
  })

  $http.get(`src/doctor/form28C/service/consultas.php?id=${paciente}`)
  .then(response => {
    $scope.consulta = response.data.count + 1
    const parametros = response.data.paciente.hgc_fecn_pacie.toString().split('-')
    const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
    const now = new Date()
    // $scope.edad = calcularEdad(response.data.paciente.hgc_fecn_pacie, true)
    // $scope.edad = calcularEdad(new Date(response.data.paciente.hgc_fecn_pacie))
    $scope.edad = duration(fecha, now)
    // alert(JSON.stringify($scope.edad))
  })

  if ($stateParams.action !== 'edit') {
    $http.get(`src/doctor/form28C/service/paciente.php?id=${paciente}&turno=${turno}`)
    .then(response => {
      if (response.data.turno === 1) $scope.activoForm28 = turno
      $scope.data.antPersonales = response.data.paciente.hgc_antf_form28
      $scope.data.antfamiliares = response.data.paciente.hgc_antf_form28
    })
  }

  $scope.handleVacunas = () => Materialize.toast('Estamos en desarollo', 4000)

  $scope.handleCie10 = () => {
    $('#form28C-Workaspace').slideUp()
    $('#cie10-Workspace').slideDown()
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  $scope.handleGraphicBack = () => {

    $('#form28C-Workaspace').slideDown()
    $('#cie10-Workspace').slideDown()
    $('#grafico-Workspace').slideUp()
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  $scope.handleGraphic = () => {
    $('#form28C-Workaspace').slideUp()
    $('#cie10-Workspace').slideDown()
    $('#grafico-Workspace').slideDown()
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  $scope.handleSave = function () {
    const items_sistemas = Array.prototype.slice.call(document.querySelectorAll('.items_sistemas'))
    const items_fisicico = Array.prototype.slice.call(document.querySelectorAll('.items_fisicico'))
    let cieInputs = [...document.querySelectorAll('.cie--input')]

    cie10Data = []
    array_sistemas = []
    array_fisicos = []

    for (let i in cieInputs) {
      if (cieInputs[i].checked === true) {
        cie10Data.push({
          codigo: cieInputs[i].dataset.codigo,
          value: cieInputs[i].dataset.value
        })
      }
    }

    for(let i in items_sistemas) {
      let sistemas = items_sistemas[i]
      if(sistemas.checked === true) {
        let tipo = sistemas.value.split('_')[0]
        let id = sistemas.value.split('_')[1]
        let observacion = document.getElementById(`input-system-${id}`).value
        array_sistemas.push({ id, tipo, observacion })
      }
    }

    for(let i in items_fisicico) {
      let fisico = items_fisicico[i]
      if(fisico.checked === true) {
        let tipo = fisico.value.split('_')[0]
        let id = fisico.value.split('_')[1]
        let observacion = document.getElementById(`input-fisico-${id}`).value
        array_fisicos.push({ id, tipo, observacion })
      }
    }

    if (validarForm(cieInputs)) {
      $scope.activoForm28 = false
      $scope.data.sistemas = array_sistemas
      $scope.data.fisicos = array_fisicos
      $scope.data.ci10 = cie10Data

      $http.post(`src/doctor/form28C/service/${$stateParams.action}.php`, $scope.data)
        .then(response => {
          if (response.data === '201') {
            Materialize.toast('Se ha guardado con exito', 4000)
            $location.path('/doctor')
            $scope.activoForm28 = false
          } else {
            $scope.activoForm28 = false
            Materialize.toast('Intente nuevamente', 4000)
          }
        })
    }
  }

  $http.get('src/doctor/form28C/service/sistemas.php')
    .then(response => $scope.sistemas = response.data)

  $http.get('src/doctor/form28C/service/fisico.php')
    .then(response => $scope.fisicos = response.data)

  function validarForm (cieInputs) {
    const data = $scope.data

    if (data.motivo === '') {
      Materialize.toast('Ingrese el motivo de la consulta', 4000)
      return false
    }
    if (data.enfermedad === '') {
      Materialize.toast('Ingrese la enfermedad o problemas actual', 4000)
      return false
    }
    if (array_sistemas.length !== $scope.sistemas.length) {
      Materialize.toast('Debe selecionar la revision de organos y sistemas', 4000)
      return false
    }
    if (array_fisicos.length !== $scope.fisicos.length) {
      Materialize.toast('Debe selecionar los examenes fisicos', 4000)
      return false
    }
    if (data.metodo === '') {
      Materialize.toast('Ingrese el metodo del desarollo psicomotor', 4000)
      return false
    }
    if (data.clasificacion === '') {
      Materialize.toast('Ingrese la clasificacion del desarollo psicomotor', 4000)
      return false
    }
    if (cieInputs.length === 0) {
      Materialize.toast('Debe ingresar los cie10', 4000)
      return false
    }
    if (cie10Data.length !== document.getElementById('cie-table').children.length) {
      Materialize.toast('Debe selecionar los cie10', 4000)
      return false
    }
    else return true
  }

  $scope.isActionGet = false

  if ($stateParams.action === 'get') {
    $scope.isActionGet = true
  }

  // Editar
  if ($stateParams.action === 'edit' || $stateParams.action === 'get') {
    setTimeout(
      () => {
        [...document.querySelectorAll('.input-field label')].map(item => {
          item.classList.add('active')
        })
      },
      500
    )

    $http.get(`src/doctor/form28C/service/get.php?turno=${turno}`)
    .then(response => {
      const snap = response.data

      $scope.data = {
        id: snap.form.hgc_codi_form28,
        motivo: snap.form.hgc_moti_form28,
        enfermedad: snap.form.hgc_enfer_form28,
        metodo: snap.form.hgc_meto_form28,
        clasificacion: snap.form.hgc_clas_form28,
        antPersonales:snap.form.hgc_antp_form28,
        antfamiliares: snap.form.hgc_antf_form28,
        planTratamiento: snap.form.hgc_pltra_form28,
        prescripcion: {
          fecha: snap.medicas.hgc_fec_presc,
          tiempo: snap.medicas.hgc_hor_presc,
          nota: snap.medicas.hgc_nota_presc,
          prescipcion: snap.medicas.hgc_det_presc,
        },
        paciente,
        turno
      }

      snap.detalle.map(item => {
        setTimeout(() => {
          let system = document.querySelector(`#input-system-${item.hgc_codi_dform28}`)
          let fisico = document.querySelector(`#input-fisico-${item.hgc_codi_dform28}`)

          if (system !== null) {
            system.value = item.hgc_obser_dform28
          } else if (fisico !== null) {
            fisico.value = item.hgc_obser_dform28
          }

          const code = `${item.hgc_tipo_dform28}_${item.hgc_codi_dform28}`
          const input = document.querySelector(`input[value="${code}"]`)
          input.checked = true

        }, 100)

      })

      $('#cie-table').html('')
      $('#cie-table').html('')
      form028CieService.data.index = 1

      snap.cie.map((item, index) => {
        let len = item.hgc_cie_fci.length
        let cie10 = item.hgc_cie_fci

        $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${cie10}&len=${len}`)
        .then(response => {
          const cieResponse = response.data
          let template = `<tr>
              <td id="cie-nombre${form028CieService.data.index}" class="input-field">
                <input type="text" placeholder="Ingresa el nombre CIE 10" value="${cieResponse.hgc_desc_c10}"
                  class="u-noMargin filter-cie-nombre10" id="column-nombre-${form028CieService.data.index}"
                  data-index="${form028CieService.data.index}" />
              </td>
              <td class="input-field">
                <input type="text" maxlength="4" placeholder="Ingresa el codigo CIE 10" value="${cieResponse.hgc_codi_c10}"
                  class="u-noMargin filter-cie10" id="column${form028CieService.data.index}"
                  data-index="${form028CieService.data.index}"
                />
              </td>
          `
          if (item.hgc_val_fci === 'def') {
            template += `
              <td id="cie-pre${form028CieService.data.index}">
                <p>
                  <input name="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}" type="radio"
                    id="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}pre" class="cie--input"
                    data-codigo='${cieResponse.hgc_codi_c10}' data-value='pre'
                  />
                  <label for="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}pre"></label>
                </p>
              </td>
              <td id="cie-def${form028CieService.data.index}">
                <p>
                  <input name="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}" type="radio"
                    id="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}def" class="cie--input"
                    data-codigo='${cieResponse.hgc_codi_c10}' data-value='def' checked
                  />
                  <label for="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}def"></label>
                </p>
              </td>
            </tr>
          `
          } else if (item.hgc_val_fci === 'pre') {
            template += `
              <td id="cie-pre${form028CieService.data.index}">
                <p>
                  <input name="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}" type="radio"
                    id="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}pre" class="cie--input"
                    data-codigo='${cieResponse.hgc_codi_c10}' data-value='pre' checked
                  />
                  <label for="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}pre"></label>
                </p>
              </td>
              <td id="cie-def${form028CieService.data.index}">
                <p>
                  <input name="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}" type="radio"
                    id="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}def" class="cie--input"
                    data-codigo='${cieResponse.hgc_codi_c10}' data-value='def'
                  />
                  <label for="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}def"></label>
                </p>
              </td>
            </tr>
          `
          }
          $('#cie-table').append(template)
          let filterCI10 = [...document.querySelectorAll('.filter-cie10')]
          let nombreFilterCie10 = [...document.querySelectorAll('.filter-cie-nombre10')]
          for (let i in filterCI10) filterCI10[i].addEventListener('keyup', handleFilter)
          for (let i in nombreFilterCie10) nombreFilterCie10[i].addEventListener('keyup', handleFilterNombre)
          form028CieService.data.index++
        })
      })

      function handleFilter (e) {
        if (e.keyCode === 13) {
          let index = e.target.dataset.index
          let cie10 = $(`#column${index}`).val().trim()
          let len = cie10.length

          if (cie10 === '') {
            Materialize.toast('Ingrese el codigo CIE10', 4000)
          } else if (len < 3 || len > 4) {
            Materialize.toast('Ingrese el codigo CIE10 correcto', 4000)
          }
          else {
            $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${cie10}&len=${len}`)
            .then(response => {
              if (response.data === 'false') Materialize.toast('No hay registro de CIE10', 4000)
              else renderCIE10(response.data, index)
            })

          }
        }
      }

      function handleFilterNombre (e) {
        if (e.keyCode === 13) {
          let index = e.target.dataset.index
          let cie10 = $(`#column-nombre-${index}`).val().trim()

          if (cie10 === '')
            Materialize.toast('Ingrese el nombre de CIE10', 4000)
          else {
            $http.get(`src/doctor/form28C/service/filterNombreCI10.php?nombre=${cie10}`)
            .then(response => {
              if (response.data === 'false') Materialize.toast('No hay registro de CIE10', 4000)
              else renderCIE10 (response.data, index)
            })
          }
        }
      }

      function renderCIE10 (data, index) {
        let templatePRE = `<p>
          <input name="${data.hgc_codi_c10}_${index}" type="radio"
            id="${data.hgc_codi_c10}_${index}pre" class="cie--input"
            data-codigo='${data.hgc_codi_c10}' data-value='pre'
          />
          <label for="${data.hgc_codi_c10}_${index}pre"></label>
        </p>`

        let templateDEF = `<p>
          <input name="${data.hgc_codi_c10}_${index}" type="radio"
            id="${data.hgc_codi_c10}_${index}def" class="cie--input"
            data-codigo='${data.hgc_codi_c10}' data-value='def'
          />
          <label for="${data.hgc_codi_c10}_${index}def"></label>
        </p>`
        $(`#column-nombre-${index}`).val(data.hgc_desc_c10)
        $(`#column${index}`).val(data.hgc_codi_c10)
        $(`#cie-pre${index}`).html(templatePRE)
        $(`#cie-def${index}`).html(templateDEF)
      }

    })
  }

})
