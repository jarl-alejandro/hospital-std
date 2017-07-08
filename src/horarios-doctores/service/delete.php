<?php
include '../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;

$delete = $pdo->query("DELETE FROM hgc_horar_doc WHERE hgc_codi_hora='$id'");
$pdo->query("DELETE FROM hgc_dhor_asig WHERE hgc_codi_det='$id'");

if ($delete) {
  echo 201;
}
