<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$canton = $obj->canton;
$provincia = $obj->provincia;
$distrito = $obj->distrito;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_cantones (hgc_desc_canton, hgc_provi_canton,
    hgc_dist_canton) VALUES (?, ?, ?)");

  $new->bindParam(1, $canton);
  $new->bindParam(2, $provincia);
  $new->bindParam(3, $distrito);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_cantones SET hgc_desc_canton='$canton',
    hgc_provi_canton='$provincia', hgc_dist_canton='$distrito' WHERE hgc_codi_canton='$id'");
}

if ($new) {
  echo 201;
}
