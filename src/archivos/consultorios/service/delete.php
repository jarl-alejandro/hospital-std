<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;
$qs = $pdo->query("DELETE FROM hgc_consultorio WHERE hgc_codi_cons='$id'");

if ($qs) {
  echo 201;
}
