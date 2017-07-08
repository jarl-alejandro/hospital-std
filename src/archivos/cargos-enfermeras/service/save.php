<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_cargo (hgc_desc_carg, hgc_est_carg)
      VALUES (?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_cargo SET hgc_desc_carg='$descripcion',
    hgc_est_carg='$visible' WHERE hgc_codi_carg='$id'");
}

if ($new) {
  echo 201;
}
