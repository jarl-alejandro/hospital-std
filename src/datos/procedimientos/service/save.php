<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$desc = $obj->desc;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_proce (hgc_desc_proce) VALUES (?)");
  $new->bindParam(1, $desc);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_proce SET hgc_desc_proce='$desc' WHERE hgc_id_proce='$id'");
}

if ($new) {
  echo 201;
}
