<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$etnia = $obj->etnia;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_etnia (hgc_desc_etnia) VALUES (?)");
  $new->bindParam(1, $etnia);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_etnia SET hgc_desc_etnia='$etnia' WHERE hgc_codi_etnia='$id'");
}

if ($new) {
  echo 201;
}
