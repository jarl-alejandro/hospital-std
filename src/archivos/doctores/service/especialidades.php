<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;
$especialidades = array();

$detalle = $pdo->query("SELECT * FROM hgc_det_doc WHERE hgc_doc_det='$id'");

while ($row = $detalle->fetch()) {
  $especialidades[] = $row;
}

$json = json_encode($especialidades);
print $json;
