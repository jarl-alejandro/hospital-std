<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$entrada = $obj->entrada;
$salida = $obj->salida;
$visible = $obj->visible;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_horarios (hgc_ent_hora, hgc_sal_hora,
     hgc_est_hora) VALUES (?, ?, ?)");

  $new->bindParam(1, $entrada);
  $new->bindParam(2, $salida);
  $new->bindParam(3, $visible);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_horarios SET hgc_ent_hora='$entrada',
    hgc_est_hora='$visible', hgc_sal_hora='$salida' WHERE hgc_codi_hora='$id'");
}
if ($new) {
  echo 201;
}
