<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;

$delete = $pdo->query("DELETE FROM hgc_profesionales WHERE hgc_codi_profe='$id'");
$pdo->query("DELETE FROM hgc_usuario WHERE hgc_codi_usu='$cedula'");

if ($delete) {
  echo 201;
}