<?php
include './helpers/conexion.php';
session_start();
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

$cedula = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

$Name = 'redaca.csv';
$FileName = "./$Name";
$fecha = date('Y/m/d');

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


$datos = utf8_decode('Fecha de consulta/Atencion;'.$fecha.';Lugar de Atenciòn:;'.$direccion.';Nombres y Apellidos;');
$datos .= utf8_decode($doctor_nombre.';Sexo;'.$sexo.';Fecha de Nacimiento;'.$fecha.';Formaciòn Profesional;Medico;');
$datos .= utf8_decode('Especialidad /Subespecialidad;'.$especialidad['hgc_desc_espe']);
$datos .= "\r\n";

$datos .= utf8_decode('Nombre Unidad Operativa;'.$empresa.'Tipo:;HG;Instituciòn del Sistema;MSP;');
$datos .= 'Nacionalidad;'.$doctor['hgc_nac_profe'].';Autoidentificacion;'.$doctor['hgc_auto_profe'].';';
$datos .= 'Pasaporte;'.$cedula.';Codigo MSP;'.$doctor['hgc_msp_profe'].';Firma;______________________';

$datos .= "\r\n";
$datos .= "\r\n";
$datos .= "\r\n";

$datos .= utf8_decode('Nº;Apellidos y Nombres;Nº. de Cèdula de Ciudadania ò Nº de Pasaporte ò Nº de Historia Clinica;1. Hombre 2. Mujer; Fecha de Nacimiento (dd/mm/aaaa); Nº. de Cedula de ciudadania del representante* (aplica a niños menores de 5 años);Nacionalidad;  Auto Identificacion ètnica;Nacionalidad o Pueblos; Aporta ò es Afiliado al:; Grupos Prioritarios de Atenciòn (Personas)**/Otros; Semanas de Gestaciòn; Provincia; Canton; Parroquia;Barrio - Sector - Recinto - Comunidad; Descripciòn;Còdigo C.I.E. 10;1. Primera 2. Subsecuente;1. Primera 2. Subsecuente;Condiciòn del Diagnostico (Codigo al reverso);1;2;3;1;2;3;1. Referencia 2. Contrareferencia; 1. Interconsulta Solicitada 2.Interconsulta Recibida');

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
$qs = $pdo->query('SELECT * FROM view_form28');

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

      $datos .= $index.";".$row['hgc_ape_pacie'].' '.$row['hgc_nom_pacie'].';'.$row['hgc_cedu_pacie'].';'.$row['hgc_desc_genero'].';'.$row['hgc_fecn_pacie'].';'.$cedulaPadres.";".$row['hgc_desc_pais'].";".$row['hgc_desc_etnia']
      .";".$row['hgc_desc_pais'].";".$row['hgc_afil_pacie'].";No definido;No definido;".$row['hgc_desc_provi'].";".$row['hgc_desc_canton'].";".$row['hgc_desc_parro'].";".$row['hgc_direc_pacie'];

      if ($cie_row['hgc_val_fci'] == 'def') {
        $datos .= ";".$nombre_cie.";".$cie_row['hgc_cie_fci'].";;Subsecuente";
      }
      else {
        $datos .= ";".$nombre_cie.";".$cie_row['hgc_cie_fci'].";Primera;";
      }
      $datos .= utf8_decode(";;".$turno_fetch['hgc_desc_proce'].";No definido;No definido;No definido;No definido;No definido;".$row['hgc_esta_hcli'].";No definido");
      $datos .= "\r\n";
    }
  }
  else {
    $datos .= utf8_decode($index.";".$row['hgc_ape_pacie'].' '.$row['hgc_nom_pacie'].';'.$row['hgc_cedu_pacie'].
    ';'.$row['hgc_desc_genero'].';'.$row['hgc_fecn_pacie'].';'.$cedulaPadres.";".$row['hgc_desc_pais'].
    ";".$row['hgc_desc_etnia'].";".$row['hgc_desc_pais'].";".$row['hgc_afil_pacie'].";No definido;No definido;".
    $row['hgc_desc_provi'].";".$row['hgc_desc_canton'].";".$row['hgc_desc_parro'].";".$row['hgc_direc_pacie'].
    ";;;;;;".$turno_fetch['hgc_desc_proce'].";No definido;No definido;No definido;No definido;No definido;".$row['hgc_esta_hcli'].";No definido");
    $datos .= "\r\n";
  }
}

$qs_056 = $pdo->query('SELECT * FROM view_form056');

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
      $datos .= $index.";".$row['hgc_ape_pacie'].' '.$row['hgc_nom_pacie'].';'.$row['hgc_cedu_pacie'].';'.$row['hgc_desc_genero'].';'.$row['hgc_fecn_pacie'].';'.$cedulaPadres.";".$row['hgc_desc_pais'].";".$row['hgc_desc_etnia']
      .";".$row['hgc_desc_pais'].";".$row['hgc_afil_pacie'].";No definido;No definido;".$row['hgc_desc_provi'].";".$row['hgc_desc_canton'].";".$row['hgc_desc_parro'].";".$row['hgc_direc_pacie'];

      if (true) {
        $datos .= ";".$nombre_cie.";".$cie_row['hgc_cie_f056'].";;Subsecuente";
      }
      else {
        $datos .= ";".$nombre_cie.";".$cie_row['hgc_cie_f056'].";Primera;;";
      }
      $datos .= utf8_decode(";;".$turno_fetch['hgc_desc_proce'].";No definido;No definido;No definido;No definido;No definido;".$row['hgc_esta_hcli'].";No definido;");
      $datos .= "\r\n";
    }
  } else {
    $datos .= utf8_decode($index.";".$row['hgc_ape_pacie'].' '.$row['hgc_nom_pacie'].';'.$row['hgc_cedu_pacie'].
    ';'.$row['hgc_desc_genero'].';'.$row['hgc_fecn_pacie'].';'.$cedulaPadres.";".$row['hgc_desc_pais'].";".
    $row['hgc_desc_etnia'].";".$row['hgc_desc_pais'].";".$row['hgc_afil_pacie'].";No definido;No definido;".
    $row['hgc_desc_provi'].";".$row['hgc_desc_canton'].";".$row['hgc_desc_parro'].";".$row['hgc_direc_pacie'].
    ";;;;;;".$turno_fetch['hgc_desc_proce']."o;No definido;No definido;No definido;No definido;No definido;".$row['hgc_esta_hcli'].";No definido;");

    $datos .= "\r\n";
  }
}
echo $datos;
