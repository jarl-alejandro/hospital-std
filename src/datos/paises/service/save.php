<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$pais = $obj->pais;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_pais (hgc_desc_pais) VALUES (?)");
  $new->bindParam(1, $pais);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_pais SET hgc_desc_pais='$pais' WHERE hgc_codi_pais='$id'");
}

if ($new) {
  echo 201;
}
