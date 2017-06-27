<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM view_user WHERE hgc_rol_usu='doctor'");
$doctor = array();

while ($row = $query->fetch()) {
  $doctor[] = $row;
}

$json = json_encode($doctor);
print $json;
