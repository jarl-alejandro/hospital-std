<?php
include '../../../helpers/conexion.php';

$id = $_GET['id'];

$horarios = array();

$qs = $pdo->query("SELECT * FROM hgc_dhor_asig WHERE hgc_codi_det='$id'");

while ($row = $qs->fetch()) {
  $horarios[] = $row;
}

$json = json_encode($horarios);
print $json;
