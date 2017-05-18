<?php
include '../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$canton = $obj->canton;
$parroquia = $obj->parroquia;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_parroquia (hgc_desc_parro, hgc_cant_parro) VALUES (?, ?)");
  $new->bindParam(1, $parroquia);
  $new->bindParam(2, $canton);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_parroquia SET hgc_desc_parro='$parroquia', hgc_cant_parro='$canton' WHERE hgc_codi_parro='$id'");
}

if ($new) {
  echo 201;
}
