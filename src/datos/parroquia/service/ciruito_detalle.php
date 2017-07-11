<?php
include '../../../../helpers/conexion.php';

$id = $_GET['id'];

$servicios = array();

$qs = $pdo->query("SELECT * FROM hgc_det_parroquia WHERE hgc_parr_parr='$id'");

while ($row = $qs->fetch()) {
  $servicios[] = $row;
}

$json = json_encode($servicios);
print $json;
