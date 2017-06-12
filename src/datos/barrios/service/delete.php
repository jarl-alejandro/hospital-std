<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;

$delete = $pdo->query("DELETE FROM hgc_barrios WHERE hgc_codi_barrio='$id'");

if ($delete) {
  echo 201;
}
