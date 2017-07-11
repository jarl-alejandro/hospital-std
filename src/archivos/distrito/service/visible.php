<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$visible = $obj->visible;
$id = $obj->id;

$new = $pdo->query("UPDATE hgc_distrito SET hgc_est_dist='$visible'
    WHERE hgc_codi_dist='$id'");

if ($new) {
  echo 201;
}
