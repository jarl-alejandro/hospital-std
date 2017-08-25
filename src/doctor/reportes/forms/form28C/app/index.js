'use strict'

angular.module('Hospital')
.controller('form28CReporteController',  function ($scope, $http, $stateParams, $location, $rootScope, form028CieService) {
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

    $scope.edad = duration(now, fecha)
  })


  $http.get('src/doctor/form28C/service/sistemas.php')
    .then(response => $scope.sistemas = response.data)

  $http.get('src/doctor/form28C/service/fisico.php')
    .then(response => $scope.fisicos = response.data)


    // Editar
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
                </p>
              </td>
              <td id="cie-def${form028CieService.data.index}">
                <p>
                  <input name="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}" type="radio"
                    id="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}def" class="cie--input"
                    data-codigo='${cieResponse.hgc_codi_c10}' data-value='def' checked
                  />
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
                </p>
              </td>
              <td id="cie-def${form028CieService.data.index}">
                <p>
                  <input name="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}" type="radio"
                    id="${cieResponse.hgc_codi_c10}_${form028CieService.data.index}def" class="cie--input"
                    data-codigo='${cieResponse.hgc_codi_c10}' data-value='def'
                  />
                </p>
              </td>
            </tr>
          `
          }
          $('#cie-table').append(template)
          form028CieService.data.index++
        })
      })

    })

  $scope.export = () => {
    html2canvas(document.getElementById('hoja1'), {
      onrendered: function (canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
            content: [{
                image: data,
                width: 500,
            }]
        };
        pdfMake.createPdf(docDefinition).download("formhoja1.pdf");
        // pdfMake.createPdf(docDefinition).open();
      }
    })

    html2canvas(document.getElementById('hoja2'), {
      onrendered: function (canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
            content: [{
              image: data,
              width: 500,
            }]
        };
        pdfMake.createPdf(docDefinition).download("formhoja2.pdf");
        // pdfMake.createPdf(docDefinition).open();
      }
    })

    html2canvas(document.getElementById('menorGraphic'), {
      onrendered: function (canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
          content: [{
            image: data,
            width: 500,
          }]
        };
        pdfMake.createPdf(docDefinition).download("menorGraphic.pdf");
      }
    })

    html2canvas(document.getElementById('menorGraphic1'), {
        onrendered: function (canvas) {
          var data = canvas.toDataURL();
          var docDefinition = {
              content: [{
                image: data,
                width: 500,
              }]
          };
          pdfMake.createPdf(docDefinition).download("menorGraphic1.pdf");
        }
      })

  }

})
/*
a = document.querySelector('#exportthis')
html2canvas(a, {
  onrendered: function (canvas) {
    console.log(canvas)
 var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'somefilename.jpg';
        a.click();
  }
})
*/
a = $('#exportthis')

html2canvas([a[0]], {
  useCORS: true
}).then(function (canvas){
  if (navigator.msSaveBlob) {
    var URL=window.URL;
    var BlobBuilder = window.MSBlobBuilder;
    navigator.saveBlob=navigator.msSaveBlob;
    var imgBlob = canvas.msToBlob();

    var showSave =  function (data, name, mimetype) {
      var builder = new BlobBuilder();
      builder.append(data);
      var blob = builder.getBlob(mimetype||"application/octet-stream");
      if (!name) name = "Download.bin";
        navigator.saveBlob(blob, name);
    };
    showSave(imgBlob, 'barchart.png',"image/png");
  }
})
