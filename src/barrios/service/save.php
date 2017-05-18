<?php
include '../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$barrio = $obj->barrio;
$parroquia = $obj->parroquia;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_barrios (hgc_desc_barrio, hgc_parro_barrio) VALUES (?, ?)");
  $new->bindParam(1, $barrio);
  $new->bindParam(2, $parroquia);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_barrios SET hgc_desc_barrio='$barrio', hgc_parro_barrio='$parroquia' WHERE hgc_codi_barrio='$id'");
}

if ($new) {
  echo 201;
}
