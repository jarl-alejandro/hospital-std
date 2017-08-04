<?php
include '../../../../helpers/conexion.php';

$id = $_GET['id'];
$array = array();

$qs = $pdo->query("SELECT * FROM view_prescripciones WHERE hgc_paci_form28='$id'");

while($row = $qs->fetch()) {
  $array[] = $row;
}

echo json_encode($array);
