<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM view_user WHERE hgc_rol_usu='enfermera'");
$profesionales = array();

while ($row = $query->fetch()) {
  $profesionales[] = $row;
}

$json = json_encode($profesionales);
print $json;
