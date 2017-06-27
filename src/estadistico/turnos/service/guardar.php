<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$paciente = $obj->paciente;
$doctor = $obj->doctor;
$fecha = $obj->fecha;
$horaInicio = $obj->horaInicio;
$id = $obj->id;

if ($id == "") {
  /* $new = $pdo->prepare("INSERT INTO hgc_cie10 (hgc_codi_c10, hgc_desc_c10) VALUES (?, ?)");
  $new->bindParam(1, $codigo);
  $new->bindParam(2, $detalle);
  $new->execute(); */
}
else {
  $new = $pdo->query("UPDATE hgc_cie10 SET hgc_codi_c10='$codigo', hgc_desc_c10='$detalle' WHERE hgc_id_c10='$id'");
}

if ($new) {
  echo 201;
}
