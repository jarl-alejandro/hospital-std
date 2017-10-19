<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;
$state = true;

$qs = $pdo->query("UPDATE hgc_receta SET hgc_est_rec='$state' WHERE hgc_cod_rec='$id'");

if ($qs) {
  echo 201;
}
