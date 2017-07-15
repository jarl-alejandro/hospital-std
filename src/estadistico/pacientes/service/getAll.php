<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM view_paciente");
$pacientes = array();

while ($row = $query->fetch()) {
  $pacientes[] = $row;
}

$json = json_encode($pacientes);
print $json;
