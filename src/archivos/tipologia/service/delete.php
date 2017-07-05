<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;
$qs = $pdo->query("DELETE FROM hgc_tipologia WHERE hgc_codi_tipo='$id'");

if ($qs) {
  echo 201;
}
