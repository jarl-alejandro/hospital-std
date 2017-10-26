<?php
include '../../../../helpers/conexion.php';

$turno = $_GET['turno'];
$array = array();
$array_params = array();

$qs = $pdo->query("SELECT * FROM hgc_form_ma65 WHERE hgc_turno_ma65='$turno'");
$row = $qs->fetch();
$id = $row['hgc_codi_ma65'];

$detail = $pdo->query("SELECT * FROM hgc_detail_ma65 WHERE hgc_form_ma65='$id'");
$params = $pdo->query("SELECT * FROM hgc_params_ma65 WHERE hgc_form_ma65='$id'");

while ($item = $detail->fetch()) {
  $array[] = $item;
}

while ($item = $params->fetch()) {
  $array_params[] = $item;
}

$json = array('main' => $row, 'detail' => $array, 'params' => $array_params);

echo json_encode($json);
