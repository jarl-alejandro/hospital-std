<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$visible = $obj->visible;
$id = $obj->id;

$new = $pdo->query("UPDATE hgc_servicio SET hgc_est_serv='$visible'
    WHERE hgc_codi_serv='$id'");

if ($new) {
  echo 201;
}
