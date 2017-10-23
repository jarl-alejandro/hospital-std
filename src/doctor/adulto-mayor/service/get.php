<?php
include '../../../../helpers/conexion.php';

$turno = $_GET['turno'];
$array = array();

$qs = $pdo->query("SELECT * FROM hgc_form_ma WHERE hgc_tur_ma='$turno'");
$row = $qs->fetch();
$id = $row['hgc_cod_ma'];

$detail = $pdo->query("SELECT * FROM hgc_detail_ma WHERE hgc_form_ma='$id'");

while ($item = $detail->fetch()) {
  $array[] = $item;
}

$json = array('main' => $row, 'detail' => $array);

echo json_encode($json);
