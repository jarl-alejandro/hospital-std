<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_institucion (hgc_desc_inst, hgc_est_inst)
      VALUES (?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_institucion SET hgc_desc_inst='$descripcion',
    hgc_est_inst='$visible' WHERE hgc_codi_inst='$id'");
}

if ($new) {
  echo 201;
}
