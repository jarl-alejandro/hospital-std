<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;

$delete = $pdo->query("DELETE FROM hgc_parroquia WHERE hgc_codi_parro='$id'");

if ($delete) {
  echo 201;
}
