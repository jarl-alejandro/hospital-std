<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$descripcion = $obj->descripcion;
$visible = $obj->visible;
$id = $obj->id;
$nivelInstitucion = $obj->nivelInstitucion;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_tipologia (hgc_desc_tipo, hgc_est_tipo, hgc_nivel_tipo)
      VALUES (?, ?, ?)");

  $new->bindParam(1, $descripcion);
  $new->bindParam(2, $visible);
  $new->bindParam(3, $nivelInstitucion);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_tipologia SET hgc_desc_tipo='$descripcion',
    hgc_est_tipo='$visible', hgc_nivel_tipo='$nivelInstitucion' WHERE hgc_codi_tipo='$id'");
}


if ($new) {
  echo 201;
}
