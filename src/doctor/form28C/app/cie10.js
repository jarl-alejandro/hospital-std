'use strict'

const cie10FilterForm = angular.module('Hospital')

cie10FilterForm.controller('cie10FilterFormController', function ($scope, $http) {
  const filterCI10 = [...document.querySelectorAll('.filter-cie10')]

  for (let i in filterCI10) {
    let item = filterCI10[i]
    item.addEventListener('keyup', handleFilter)
  }

  function handleFilter (e) {
    if (e.keyCode === 13) {
      let index = e.target.dataset.index
      let cie10 = $(`#column${index}`).val().trim()
      let len = cie10.length

      if (cie10 === '') {
        Materialize.toast('Ingrese el codigo CIE10', 4000)
      } else if (len < 3 || len > 4) {
        Materialize.toast('Ingrese el codigo CIE10 correcto', 4000)
      } else {

        $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${cie10}&len=${len}`)
        .then(response => {
          if (response.data === 'false') Materialize.toast('No hay registro de CIE10', 4000)
          else renderCIE10(response.data, index)
        })

      }
    }
  }

  function renderCIE10 (data, index) {
    console.log(data)
    let templatePRE = `<p>
      <input name="${data.hgc_codi_c10}_${index}" type="radio"
        id="${data.hgc_codi_c10}_${index}pre" />
      <label for="${data.hgc_codi_c10}_${index}pre"></label>
    </p>`

    let templateDEF = `<p>
      <input name="${data.hgc_codi_c10}_${index}" type="radio"
        id="${data.hgc_codi_c10}_${index}def" />
      <label for="${data.hgc_codi_c10}_${index}def"></label>
    </p>`
    $(`#cie-nombre${index}`).html(data.hgc_desc_c10)
    $(`#cie-pre${index}`).html(templatePRE)
    $(`#cie-def${index}`).html(templateDEF)
  }

})
