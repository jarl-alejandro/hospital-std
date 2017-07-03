<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$tipo = $obj->tipo;
$detalle = $obj->detalle;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_sisfis (hgc_tipo_sisfi, hgc_desc_sisfi) VALUES (?, ?)");
  $new->bindParam(1, $tipo);
  $new->bindParam(2, $detalle);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_sisfis SET hgc_tipo_sisfi='$tipo', hgc_desc_sisfi='$detalle' WHERE hgc_id_sisfi='$id'");
}

if ($new) {
  echo 201;
}
