<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;

$delete = $pdo->query("DELETE FROM hgc_profesionales WHERE hgc_codi_profe='$id'");
$pdo->query("DELETE FROM hgc_usuario WHERE hgc_codi_usu='$id'");

$pdo->query("DELETE FROM hgc_pasantes WHERE hgc_ced_pasa='$id'");

if ($delete) {
  echo 201;
}
