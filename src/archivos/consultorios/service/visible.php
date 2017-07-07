<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$visible = $obj->visible;
$id = $obj->id;

$new = $pdo->query("UPDATE hgc_consultorio SET hgc_est_cons='$visible'
    WHERE hgc_codi_cons='$id'");

if ($new) {
  echo 201;
}
