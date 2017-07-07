<?php
include '../../../../helpers/conexion.php';

$service = $_GET['service'];

$especialidades = array();

$qs = $pdo->query("SELECT * FROM view_especialidad WHERE hgc_codi_serv='$service'");

while ($row = $qs->fetch()) {
  $especialidades[] = $row;
}

$json = json_encode($especialidades);
print $json;
