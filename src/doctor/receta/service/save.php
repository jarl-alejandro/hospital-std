<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = setCode($pdo, 'RC-', 9, 'hgc_receta', 'hgc_cont_receta');
updateCode($pdo, 'hgc_cont_receta');

$paciente = $obj->paciente;
$especialidad = $obj->especialidad;
$medico = $obj->medico;
$receta = $obj->receta;
$estado = 'false';

$qs = $pdo->prepare("INSERT INTO hgc_receta (hgc_cod_rec, hgc_pac_rec, hgc_esp_rec, hgc_med_rec,
  hgc_est_rec) VALUES (?, ?, ?, ?, ?)");

$qs->bindParam(1, $codigo);
$qs->bindParam(2, $paciente);
$qs->bindParam(3, $especialidad);
$qs->bindParam(4, $medico);
$qs->bindParam(5, $estado);

$qs->execute();

$qs_details = $pdo->prepare("INSERT INTO hgc_receta_det (hgc_rec_rec, hgc_far_rec, hgc_pre_rec,
  hgc_can_rec) VALUES (?, ?, ?, ?)");

foreach ($receta as $row) {
  $id = $row->id;
  $prescripcion = $row->prescripcion;
  $cant = $row->cant;

  $qs_details->bindParam(1, $codigo);
  $qs_details->bindParam(2, $id);
  $qs_details->bindParam(3, $prescripcion);
  $qs_details->bindParam(4, $cant);

  $qs_details->execute();
}

if ($qs) {
  echo 201;
}
