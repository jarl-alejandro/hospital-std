<?php
include '../../../../helpers/conexion.php';

$nombre = $_GET['nombre'];

$qs = $pdo->query("SELECT * FROM hgc_cie10 WHERE hgc_desc_c10 LIKE '%$nombre%'");

if ($qs->rowCount() == 0) {
  $qs = $pdo->query("SELECT * FROM hgc_cie101 WHERE hgc_desc_c10 LIKE '%$nombre%'");
  $cie10 = $qs->fetch();
  echo json_encode($cie10);
}
else {
  $cie10 = $qs->fetch();
  echo json_encode($cie10);
}
