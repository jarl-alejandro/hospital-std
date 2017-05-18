<?php
include '../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$pais = $obj->pais;
$provincia = $obj->provincia;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_provincia (hgc_desc_provi, hgc_pais_provi) VALUES (?, ?)");
  $new->bindParam(1, $provincia);
  $new->bindParam(2, $pais);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_provincia SET hgc_desc_provi='$provincia', hgc_pais_provi='$pais' WHERE hgc_codi_provi='$id'");
}

if ($new) {
  echo 201;
}
