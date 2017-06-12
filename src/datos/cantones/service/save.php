<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$canton = $obj->canton;
$provincia = $obj->provincia;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_contanes (hgc_desc_canton, hgc_provi_canton) VALUES (?, ?)");
  $new->bindParam(1, $canton);
  $new->bindParam(2, $provincia);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_contanes SET hgc_desc_canton='$canton', hgc_provi_canton='$provincia' WHERE hgc_codi_canton='$id'");
}

if ($new) {
  echo 201;
}
