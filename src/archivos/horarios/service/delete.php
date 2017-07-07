<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;

$delete = $pdo->query("DELETE FROM hgc_horarios WHERE hgc_codi_hora='$id'");

if ($delete) {
  echo 201;
}
