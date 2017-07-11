<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$visible = $obj->visible;
$id = $obj->id;

$new = $pdo->query("UPDATE hgc_circuito SET hgc_est_circ='$visible'
    WHERE hgc_codi_circ='$id'");

if ($new) {
  echo 201;
}
