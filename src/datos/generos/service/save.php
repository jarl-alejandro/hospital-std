<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$genero = $obj->genero;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_genero (hgc_desc_genero) VALUES (?)");
  $new->bindParam(1, $genero);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_genero SET hgc_desc_genero='$genero' WHERE hgc_codi_genero='$id'");
}

if ($new) {
  echo 201;
}
