<?php
include '../../../../helpers/conexion.php';

$institucion = array();

$qs = $pdo->query("SELECT * FROM hgc_nivel_institucion WHERE hgc_est_inst='true'");

while ($row = $qs->fetch()) {
  $institucion[] = $row;
}

$json = json_encode($institucion);
print $json;
