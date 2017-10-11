<?php
include './helpers/conexion.php';
session_start();
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

$cedula = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

$Name = 'redaca-month.csv';
$FileName = "./$Name";
$fecha = date('Y/m/d');

$month =  $_GET['month'];

$qs = $pdo->query("SELECT * FROM hgc_empresa");
$row = $qs->fetch();
$empresa = $row['hgc_nom_empr'];
$direccion = $row['hgc_dir_empr'];

$qs_doctor = $pdo->query("SELECT * FROM hgc_profesionales WHERE hgc_cedu_profe='$cedula'");
$doctor = $qs_doctor->fetch();
$sexo_id = $doctor['hgc_sexo_profe'];

$doctor_nombre = $doctor['hgc_nom_profe'].' '.$doctor['hgc_ape_profe'];
$fecha = date("d-m-Y", strtotime($doctor['hgc_fecn_profe']));

// Sexo
$sexo_qs = $pdo->query("SELECT * FROM hgc_genero WHERE hgc_codi_genero='$sexo_id'");
$sexo_row = $sexo_qs->fetch();
$sexo = $sexo_row['hgc_desc_genero'];

// End Sexo
$espe_qs = $pdo->query("SELECT * FROM view_detalle_doc WHERE hgc_doc_det='$cedula'");
$especialidad = $espe_qs->fetch();

$datos = utf8_decode('Fecha de consulta/Atencion;Lugar de Atenciòn;Nombre Unidad Operativa;Tipo;');
$datos .= utf8_decode('Instituciòn del Sistema;Nombre y Apellido;Sexo;Fecha de Nacimiento;');
$datos .= utf8_decode('Formaciòn Profesional;Especialidad y Subespecialidad;Nacionalidad;');
$datos .= utf8_decode('Autoidentificacion;Pasaporte;Codigo MSP;Firma y Sello;');
$datos .= "\r\n";

$datos .= utf8_decode($fecha.';'.$direccion.';'.$empresa.';HG;MSP;'.$doctor_nombre.';');
$datos .= utf8_decode($sexo.';'.$fecha.';Medico;'.$especialidad['hgc_desc_espe'].';');
$datos .= utf8_decode($doctor['hgc_nac_profe'].';'.$doctor['hgc_auto_profe'].';'.$cedula.';');
$datos .= utf8_decode($doctor['hgc_msp_profe'].';__________;');

$datos .= utf8_decode('Apellidos y Nombres;Nº. de Cèdula de Ciudadania ò Nº de Pasaporte ò Nº de');
$datos .= utf8_decode('Historia Clinica;1. Hombre 2. Mujer; Fecha de Nacimiento (dd/mm/aaaa);');
$datos .= utf8_decode('Nº. de Cedula de ciudadania del representante* (aplica a niños menores de 5');
$datos .= utf8_decode('años);Nacionalidad;  Auto Identificacion ètnica;Nacionalidad o Pueblos; ');
$datos .= utf8_decode('Aporta ò es Afiliado al:; Grupos Prioritarios de Atenciòn (Personas)**/Otros;');
$datos .= utf8_decode('Semanas de Gestaciòn; Provincia; Canton; Parroquia;Barrio - Sector - Recinto -');
$datos .= utf8_decode('Comunidad; Descripciòn;Còdigo C.I.E. 10;1. Primera 2. Subsecuente;1. Primera 2.'); $datos .= utf8_decode('Subsecuente;Condiciòn del Diagnostico (Codigo al reverso);Procedimiento;');
$datos .= utf8_decode('Nùmero de Actividades;');
$datos .= utf8_decode('1. Referencia 2. Contrareferencia; 1. Interconsulta Solicitada');
$datos .= utf8_decode('2.Interconsulta Recibida');

$datos .= "\r\n";

header('Expires: 0');
header('Cache-control: private');
header('Content-Type: application/x-octet-stream'); // Archivo de Excel
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
header('Content-Description: File Transfer');
header('Last-Modified: '.date('D, d M Y H:i:s'));
header('Content-Disposition: attachment; filename="'.$Name.'"');
header("Content-Transfer-Encoding: binary");

$index = 0;
$year = date('Y');

$desde = $year.'-'.$month.'-01';
$hasta = $year.'-'.$month.'-31';

$qs = $pdo->query("SELECT * FROM view_form28 WHERE hgc_fech_form28 BETWEEN '$desde' AND '$hasta'");

foreach ($qs as $row) {
  $index++;
  $fecha = $row['hgc_fecn_pacie'];
  $turno_id = $row['hgc_turno_form28'];
  $hoy = date("Y-m-d");
  $year = $hoy - $fecha;
  $cedulaPadres = '';

  $turno_qs = $pdo->query("SELECT * FROM view_signosvital_proce WHERE hgc_turno_sigvit='$turno_id'");
  $turno_fetch = $turno_qs->fetch();

  if ($year <= 5) {
    $cedulaPadres = $row['hgc_cedu_pacie'];
  }

  $codigo = $row['hgc_codi_form28'];

  $cie = $pdo->query("SELECT * FROM hgc_focie WHERE hgc_form_fci='$codigo'");

  if ($cie->rowCount() !== 0) {
    while ($cie_row = $cie->fetch()) {
      $datos .= utf8_decode($fecha.';'.$direccion.';'.$empresa.';HG;MSP;'.$doctor_nombre.';');
      $datos .= utf8_decode($sexo.';'.$fecha.';Medico;'.$especialidad['hgc_desc_espe'].';');
      $datos .= utf8_decode($doctor['hgc_nac_profe'].';'.$doctor['hgc_auto_profe'].';'.$cedula.';');
      $datos .= utf8_decode($doctor['hgc_msp_profe'].';__________;');

      // $datos .= ";;;;;;;;;;;;;;;";

      $nombre_cie = '';
      $code_cie = $cie_row['hgc_cie_fci'];

      $cie_raiz = $pdo->query("SELECT * FROM hgc_cie10 WHERE hgc_codi_c10='$code_cie'");

      if ($cie_raiz->rowCount() === 0) {
        $cie_sec = $pdo->query("SELECT * FROM hgc_cie101 WHERE hgc_codi_c10='$code_cie'");
        $fetch = $cie_sec->fetch();
        $nombre_cie = utf8_decode($fetch['hgc_desc_c10']);
      }
      else {
        $fetch = $cie_raiz->fetch();
        $nombre_cie = utf8_decode($fetch['hgc_desc_c10']);
      }

      $datos .= utf8_decode($row['hgc_ape_pacie'].' '.$row['hgc_nom_pacie'].';');
      $datos .= utf8_decode($row['hgc_cedu_pacie'].';'.$row['hgc_desc_genero'].';');
      $datos .= utf8_decode($row['hgc_fecn_pacie'].';'.$cedulaPadres.";".$row['hgc_desc_pais'].";");
      $datos .= utf8_decode($row['hgc_desc_etnia'].";".$row['hgc_desc_pais'].";");
      $datos .= utf8_decode($row['hgc_afil_pacie'].";No definido;No definido;");
      $datos .= utf8_decode($row['hgc_desc_provi'].";".$row['hgc_desc_canton'].";");
      $datos .= utf8_decode($row['hgc_desc_parro'].";".$row['hgc_direc_pacie']);

      if ($cie_row['hgc_val_fci'] == 'def') {
        $datos .= ";".$nombre_cie.";".$cie_row['hgc_cie_fci'].";;Subsecuente";
      }
      else {
        $datos .= ";".$nombre_cie.";".$cie_row['hgc_cie_fci'].";Primera;";
      }
      $datos .= utf8_decode(";;".$turno_fetch['hgc_desc_proce']);
      $datos .= utf8_decode(";No definido;".$row['hgc_esta_hcli'].";No definido");
      $datos .= "\r\n";
    }
  }
  else {
    $datos .= utf8_decode($fecha.';'.$direccion.';'.$empresa.';HG;MSP;'.$doctor_nombre.';');
    $datos .= utf8_decode($sexo.';'.$fecha.';Medico;'.$especialidad['hgc_desc_espe'].';');
    $datos .= utf8_decode($doctor['hgc_nac_profe'].';'.$doctor['hgc_auto_profe'].';'.$cedula.';');
    $datos .= utf8_decode($doctor['hgc_msp_profe'].';__________;');

    // $datos .= ";;;;;;;;;;;;;;;";

    $datos .= utf8_decode($row['hgc_ape_pacie'].' '.$row['hgc_nom_pacie'].';');
    $datos .= utf8_decode($row['hgc_cedu_pacie'].';'.$row['hgc_desc_genero'].';');
    $datos .= utf8_decode($row['hgc_fecn_pacie'].';'.$cedulaPadres.";");
    $datos .= utf8_decode($row['hgc_desc_pais'].";".$row['hgc_desc_etnia'].";");
    $datos .= utf8_decode($row['hgc_desc_pais'].";".$row['hgc_afil_pacie']);
    $datos .= utf8_decode(";No definido;No definido;".$row['hgc_desc_provi'].";");
    $datos .= utf8_decode($row['hgc_desc_canton'].";".$row['hgc_desc_parro'].";");
    $datos .= utf8_decode($row['hgc_direc_pacie'].";;;;;;".$turno_fetch['hgc_desc_proce']);
    $datos .= utf8_decode(";No definido;");
    $datos .= utf8_decode($row['hgc_esta_hcli'].";No definido");
    $datos .= "\r\n";
  }
}

$qs_056 = $pdo->query("SELECT * FROM view_form056 WHERE hgc_fech_f056 BETWEEN '$desde' AND '$hasta'");

foreach ($qs_056 as $row) {

  $index++;
  $fecha = $row['hgc_fecn_pacie'];
  $hoy = date("Y-m-d");
  $year = $hoy - $fecha;
  $cedulaPadres = '';

  $turno_id = $row['hgc_turno_f056'];
  $turno_qs = $pdo->query("SELECT * FROM view_signosvital_proce WHERE hgc_turno_sigvit='$turno_id'");
  $turno_fetch = $turno_qs->fetch();

  if ($year <= 5) {
    $cedulaPadres = $row['hgc_cedu_pacie'];
  }

  $codigo = $row['hgc_codi_f056'];

  $cie = $pdo->query("SELECT * FROM hgc_motivocie10_f056 WHERE hgc_form_f056='$codigo'");

  if ($cie->rowCount() !== 0) {
    while ($cie_row = $cie->fetch()) {
      // $datos .= ";;;;;;;;;;;;;;;";
      $datos .= utf8_decode($fecha.';'.$direccion.';'.$empresa.';HG;MSP;'.$doctor_nombre.';');
      $datos .= utf8_decode($sexo.';'.$fecha.';Medico;'.$especialidad['hgc_desc_espe'].';');
      $datos .= utf8_decode($doctor['hgc_nac_profe'].';'.$doctor['hgc_auto_profe'].';'.$cedula.';');
      $datos .= utf8_decode($doctor['hgc_msp_profe'].';__________;');

      $nombre_cie = '';
      $code_cie = $cie_row['hgc_cie_f056'];

      $cie_raiz = $pdo->query("SELECT * FROM hgc_cie10 WHERE hgc_codi_c10='$code_cie'");

      if ($cie_raiz->rowCount() === 0) {
        $cie_sec = $pdo->query("SELECT * FROM hgc_cie101 WHERE hgc_codi_c10='$code_cie'");
        $fetch = $cie_sec->fetch();
        $nombre_cie = utf8_decode($fetch['hgc_desc_c10']);
      }
      else {
        $fetch = $cie_raiz->fetch();
        $nombre_cie = utf8_decode($fetch['hgc_desc_c10']);
      }
      $datos .= utf8_decode($row['hgc_ape_pacie'].' '.$row['hgc_nom_pacie'].';');
      $datos .= utf8_decode($row['hgc_cedu_pacie'].';'.$row['hgc_desc_genero'].';');
      $datos .= utf8_decode($row['hgc_fecn_pacie'].';'.$cedulaPadres.";".$row['hgc_desc_pais'].";");
      $datos .= utf8_decode($row['hgc_desc_etnia'].";".$row['hgc_desc_pais'].";");
      $datos .= utf8_decode($row['hgc_afil_pacie'].";No definido;No definido;");
      $datos .= utf8_decode($row['hgc_desc_provi'].";".$row['hgc_desc_canton'].";");
      $datos .= utf8_decode($row['hgc_desc_parro'].";".$row['hgc_direc_pacie']);

      if (true) {
        $datos .= ";".$nombre_cie.";".$cie_row['hgc_cie_f056'].";;Subsecuente";
      }
      else {
        $datos .= ";".$nombre_cie.";".$cie_row['hgc_cie_f056'].";Primera;;";
      }
      $datos .= utf8_decode(";;".$turno_fetch['hgc_desc_proce'].";No definido;");
      $datos .= utf8_decode($row['hgc_esta_hcli'].";No definido;");
      $datos .= "\r\n";
    }
  }
  else {
    $datos .= utf8_decode($fecha.';'.$direccion.';'.$empresa.';HG;MSP;'.$doctor_nombre.';');
    $datos .= utf8_decode($sexo.';'.$fecha.';Medico;'.$especialidad['hgc_desc_espe'].';');
    $datos .= utf8_decode($doctor['hgc_nac_profe'].';'.$doctor['hgc_auto_profe'].';'.$cedula.';');
    $datos .= utf8_decode($doctor['hgc_msp_profe'].';__________;');

    // $datos .= ";;;;;;;;;;;;;;;";

    $datos .= utf8_decode($row['hgc_ape_pacie'].' '.$row['hgc_nom_pacie'].';');
    $datos .= utf8_decode($row['hgc_cedu_pacie'].';'.$row['hgc_desc_genero'].';');
    $datos .= utf8_decode($row['hgc_fecn_pacie'].';'.$cedulaPadres.";");
    $datos .= utf8_decode($row['hgc_desc_pais'].";".$row['hgc_desc_etnia'].";");
    $datos .= utf8_decode($row['hgc_desc_pais'].";".$row['hgc_afil_pacie']);
    $datos .= utf8_decode(";No definido;No definido;".$row['hgc_desc_provi'].";");
    $datos .= utf8_decode($row['hgc_desc_canton'].";".$row['hgc_desc_parro'].";");
    $datos .= utf8_decode($row['hgc_direc_pacie'].";;;;;;".$turno_fetch['hgc_desc_proce']);
    $datos .= utf8_decode(";No definido;");
    $datos .= utf8_decode($row['hgc_esta_hcli'].";No definido;");

    $datos .= "\r\n";
  }
}

echo $datos;
