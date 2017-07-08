<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_perfil (hgc_desc_perf, hgc_est_perf)
      VALUES (?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_perfil SET hgc_desc_perf='$descripcion',
    hgc_est_perf='$visible' WHERE hgc_codi_perf='$id'");
}

if ($new) {
  echo 201;
}
