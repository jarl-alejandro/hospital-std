<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_distrito (hgc_desc_dist, hgc_est_dist)
      VALUES (?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_distrito SET hgc_desc_dist='$descripcion',
    hgc_est_dist='$visible' WHERE hgc_codi_dist='$id'");
}

if ($new) {
  echo 201;
}
