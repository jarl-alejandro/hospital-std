<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;

$delete = $pdo->query("DELETE FROM hgc_establecimiento WHERE hgc_codi_esta='$id'");

if ($delete) {
  echo 201;
}
