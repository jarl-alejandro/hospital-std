<?php
include '../../../../helpers/conexion.php';

$turno = $_GET['turno'];
$array = array();

$qs = $pdo->query("SELECT * FROM hgc_form_ma65 WHERE hgc_turno_ma65='$turno'");
$row = $qs->fetch();
$id = $row['hgc_codi_ma65'];

$detail = $pdo->query("SELECT * FROM hgc_detail_ma65 WHERE hgc_form_ma65='$id'");

while ($item = $detail->fetch()) {
  $array[] = $item;
}

$json = array('main' => $row, 'detail' => $array);

echo json_encode($json);
