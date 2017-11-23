<?php session_start();
date_default_timezone_set('America/Guayaquil');

include '../../../../helpers/conexion.php';

$hoy = date("Y-m-d");
$stamp = date('Y-m-d H:i:s');
$dateNew = strtotime( '-24 hour' , strtotime($stamp) );
$dateNew = date( 'Y-m-d H:i:s' , $dateNew );
$userId = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

$query = $pdo->query("SELECT * FROM view_turnos_sigvit 
  WHERE (hgc_esta_turno='form' OR hgc_esta_turno='signosVitales')
  AND hgc_enfer_sigvit='$userId' ORDER BY hgc_fecha_sigvit DESC
");

$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
