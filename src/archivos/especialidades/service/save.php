<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$servicio = $obj->servicio;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_especialidad (hgc_desc_espe, hgc_est_espe,
     hgc_serv_espe) VALUES (?, ?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->bindParam(3, $servicio);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_especialidad SET hgc_desc_espe='$descripcion',
    hgc_est_espe='$visible', hgc_est_espe='$servicio' WHERE hgc_codi_espe='$id'");
}

if ($new) {
  echo 201;
}
