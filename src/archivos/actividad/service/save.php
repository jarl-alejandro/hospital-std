<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_actividad (hgc_desc_acti, hgc_est_acti)
      VALUES (?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_actividad SET hgc_desc_acti='$descripcion',
    hgc_est_acti='$visible' WHERE hgc_codi_acti='$id'");
}

if ($new) {
  echo 201;
}
