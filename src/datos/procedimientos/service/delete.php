<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;

$delete = $pdo->query("DELETE FROM hgc_proce WHERE hgc_id_proce='$id'");

if ($delete) {
  echo 201;
}
