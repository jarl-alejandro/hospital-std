<?php
include '../../../../helpers/conexion.php';

$especialidad = $_GET['especialidad'];

$qs = $pdo->query("SELECT * FROM view_doctor_especialidad WHERE hgc_codi_espe='$especialidad'");

$array = array();

while ($row = $qs->fetch()) {
  $array[] = $row;
}

echo json_encode($array);
