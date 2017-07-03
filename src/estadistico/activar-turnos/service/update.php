<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;

$new = $pdo->query("UPDATE hgc_turno SET hgc_esta_turno='turno'
											WHERE hgc_id_turno='$id'");
if ($new) {
  echo 201;
}
