<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = setCode($pdo, 'F28A-', 9, 'hgc_form28', 'hgc_cont_form28');
updateCode($pdo, 'hgc_cont_form28');

$motivo = $obj->motivo;
$enfermedad = $obj->enfermedad;
$sistemas = $obj->sistemas;
$fisicos = $obj->fisicos;
$paciente = $obj->paciente;
$turno = $obj->turno;

$hoy = date("Y/m/d");
$hora = date("h:i");

$new = $pdo->prepare("INSERT INTO hgc_form28 (hgc_codi_form28, hgc_moti_form28,
  hgc_enfer_form28, hgc_paci_form28, hgc_turno_form28, hgc_fech_form28, hgc_hora_form28)
  VALUES (?, ?, ?, ?, ?, ?, ?)");

$new->bindParam(1, $codigo);
$new->bindParam(2, $motivo);
$new->bindParam(3, $enfermedad);
$new->bindParam(4, $paciente);
$new->bindParam(5, $turno);
$new->bindParam(6, $hoy);
$new->bindParam(7, $hora);

$new->execute();

$pdo->query("UPDATE hgc_turno SET hgc_esta_turno='form' WHERE hgc_id_turno='$turno'");

$detail = $pdo->prepare("INSERT INTO hgc_dform28 (hgc_form_dform28, hgc_codi_dform28,
  hgc_tipo_dform28, hgc_obser_dform28) VALUES (?, ?, ?, ?)");

foreach ($sistemas as $row) {
  $id = $row->id;
  $tipo = $row->tipo;
  $observacion = $row->observacion;

  $detail->bindParam(1, $codigo);
  $detail->bindParam(2, $id);
  $detail->bindParam(3, $tipo);
  $detail->bindParam(4, $observacion);

  $detail->execute();
}

foreach ($fisicos as $row) {
  $id = $row->id;
  $tipo = $row->tipo;
  $observacion = $row->observacion;

  $detail->bindParam(1, $codigo);
  $detail->bindParam(2, $id);
  $detail->bindParam(3, $tipo);
  $detail->bindParam(4, $observacion);

  $detail->execute();
}

if ($new) {
  echo 201;
}
