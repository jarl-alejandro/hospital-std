<?php
include '../../../../helpers/conexion.php';

$codigo = strtoupper($_GET['codigo']);
$len = $_GET['len'];

$qs = $pdo->query("SELECT * FROM hgc_cie10 WHERE hgc_codi_c10='$codigo'");

if ($qs->rowCount() == 0) {
  $qs = $pdo->query("SELECT * FROM hgc_cie101 WHERE hgc_codi_c10='$codigo'");
  $cie10 = $qs->fetch();
  echo json_encode($cie10);
}
else {
  $cie10 = $qs->fetch();
  echo json_encode($cie10);
}
