<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;
$state = true;

$qs = $pdo->query("UPDATE hgc_solicitud SET hgc_est_soli='$state' WHERE hgc_cod_soli='$id'");

if ($qs) {
  echo 201;
}
