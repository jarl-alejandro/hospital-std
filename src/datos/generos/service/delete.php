<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;

$delete = $pdo->query("DELETE FROM hgc_genero WHERE hgc_codi_genero='$id'");

if ($delete) {
  echo 201;
}
