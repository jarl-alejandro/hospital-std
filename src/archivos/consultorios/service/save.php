<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_consultorio (hgc_desc_cons, hgc_est_cons)
      VALUES (?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_consultorio SET hgc_desc_cons='$descripcion',
    hgc_est_cons='$visible' WHERE hgc_codi_cons='$id'");
}

if ($new) {
  echo 201;
}
