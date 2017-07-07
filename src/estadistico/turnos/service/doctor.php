<?php
include '../../../../helpers/conexion.php';

$especialidad = $_GET['especialidad'];

$query = $pdo->query("SELECT * FROM view_doctor_especialidad
  WHERE hgc_codi_espe='$especialidad'");

$doctor = array();

while ($row = $query->fetch()) {
  $doctor[] = $row;
}

$json = json_encode($doctor);
print $json;
