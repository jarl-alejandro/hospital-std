<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_servicio (hgc_desc_serv, hgc_est_serv)
      VALUES (?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_servicio SET hgc_desc_serv='$descripcion',
    hgc_est_serv='$visible' WHERE hgc_codi_serv='$id'");
}

if ($new) {
  echo 201;
}
