<?php
date_default_timezone_set('America/Guayaquil');

include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = setCode($pdo, 'F056-', 9, 'hgc_form056', 'hgc_cont_form056');
updateCode($pdo, 'hgc_cont_form056');

$paciente = $obj->paciente;
$ncon_qs = $pdo->query("SELECT hgc_ncon_f056 FROM hgc_form056 WHERE hgc_paci_f056='$paciente'");

$numeroConsulta = $ncon_qs->rowCount() + 1;
$hoy = date("Y-m-d");
$companion = $obj->companion;
$civilStatus = $obj->civilStatus;
$enfermedadActual = $obj->enfermedadActual;
$numerosCuartos = $obj->numerosCuartos;
$turno = $obj->turno;
$planTratamiento = $obj->planTratamiento;
$ocupacion = $obj->ocupacion;

$form = $pdo->prepare("INSERT INTO hgc_form056 (hgc_codi_f056, hgc_paci_f056,
  hgc_ncon_f056, hgc_fech_f056, hgc_acom_f056, hgc_civi_f056, hgc_enfe_f056,
  hgc_ncuar_f056, hgc_turno_f056, hgc_indic_f056, hgc_ocup_f056) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$form->bindParam(1, $codigo);
$form->bindParam(2, $paciente);
$form->bindParam(3, $numeroConsulta);
$form->bindParam(4, $hoy);
$form->bindParam(5, $companion);
$form->bindParam(6, $civilStatus);
$form->bindParam(7, $enfermedadActual);
$form->bindParam(8, $numerosCuartos);
$form->bindParam(9, $turno);
$form->bindParam(10, $planTratamiento);
$form->bindParam(11, $ocupacion);

$form->execute();

$motivo = $obj->motivo;

$motivo_qs = $pdo->prepare("INSERT INTO hgc_motivocie10_f056 (hgc_form_f056, hgc_cie_f056, hgc_tipo_f056) VALUES (?,?,?)");

foreach ($motivo as $row) {
  $valor = $row->valor;
  $tipo = $row->tipo;

  $motivo_qs->bindParam(1, $codigo);
  $motivo_qs->bindParam(2, $valor);
  $motivo_qs->bindParam(3, $tipo);

  $motivo_qs->execute();
}

$observaciones = $obj->observaciones;

$obser_qs = $pdo->prepare("INSERT INTO hgc_observ_f056 (hgc_form_df056, hgc_desc_df056, hgc_tipo_df056) VALUES (?, ?, ?)");

foreach ($observaciones as $row) {
  $desc = $row->desc;
  $tipo = $row->tipo;

  $obser_qs->bindParam(1, $codigo);
  $obser_qs->bindParam(2, $desc);
  $obser_qs->bindParam(3, $tipo);

  $obser_qs->execute();
}

$anexos = $obj->anexos;

$anexo_qs = $pdo->prepare("INSERT INTO hgc_anexo_f056 (hgc_form_df056, hgc_valo_df056, hgc_tipo_df056) VALUES (?, ?, ?)");

foreach ($anexos as $row) {
  $valor = $row->valor;
  $tipo = $row->tipo;

  $anexo_qs->bindParam(1, $codigo);
  $anexo_qs->bindParam(2, $valor);
  $anexo_qs->bindParam(3, $tipo);

  $anexo_qs->execute();
}

if ($form) {
  echo "201";
}
