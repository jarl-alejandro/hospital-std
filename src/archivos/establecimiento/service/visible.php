<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;
$visible = $obj->visible;

$new = $pdo->query("UPDATE hgc_establecimiento SET hgc_esta_esta='$visible'
    WHERE hgc_codi_esta='$id'");

if ($new) {
  echo 201;
}
