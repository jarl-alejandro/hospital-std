<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = $obj->codigo;
$detalle = $obj->detalle;
$cie10 = $obj->cie10;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_cie102 (hgc_codi_c10, hgc_desc_c10, hgc_cie_c10)
                        VALUES (?, ?, ?)");
  $new->bindParam(1, $codigo);
  $new->bindParam(2, $detalle);
  $new->bindParam(3, $cie10);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_cie102 SET hgc_codi_c10='$codigo', hgc_desc_c10='$detalle',
    hgc_cie_c10='$cie10' WHERE hgc_id_c10='$id'");
}
if ($new) {
  echo 201;
}
