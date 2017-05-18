<?php
include '../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$profesion = $obj->profesion;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_profesion (hgc_desc_profe) VALUES (?)");
  $new->bindParam(1, $profesion);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_profesion SET hgc_desc_profe='$profesion' WHERE hgc_codi_profe='$id'");
}

if ($new) {
  echo 201;
}
