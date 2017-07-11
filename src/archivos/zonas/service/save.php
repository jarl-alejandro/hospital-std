<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_zonas (hgc_desc_zona, hgc_est_zona)
      VALUES (?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_zonas SET hgc_desc_zona='$descripcion',
    hgc_est_zona='$visible' WHERE hgc_codi_zona='$id'");
}

if ($new) {
  echo 201;
}
