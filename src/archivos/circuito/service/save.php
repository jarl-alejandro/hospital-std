<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_circuito (hgc_desc_circ, hgc_est_circ)
      VALUES (?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_circuito SET hgc_desc_circ='$descripcion',
    hgc_est_circ='$visible' WHERE hgc_codi_circ='$id'");
}

if ($new) {
  echo 201;
}
