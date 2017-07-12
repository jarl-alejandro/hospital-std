<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$pais = $obj->pais;
$id = $obj->id;
$codigoPostal = $obj->codigoPostal;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_pais (hgc_desc_pais, hgc_codipost_pais) VALUES (?, ?)");
  $new->bindParam(1, $pais);
  $new->bindParam(2, $codigoPostal);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_pais SET hgc_desc_pais='$pais',
      hgc_codipost_pais='$codigoPostal' WHERE hgc_codi_pais='$id'");
}

if ($new) {
  echo 201;
}
