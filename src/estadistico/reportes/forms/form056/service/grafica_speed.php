<?php
include '../../../../helpers/conexion.php';

$id = $_GET['id'];
$signos = array();

$qs = $pdo->query("SELECT
    DISTINCT on (hgc_yea_sigvit) hgc_yea_sigvit,
    hgc_turno_sigvit,
    hgc_talla_sigvit,
    hgc_imc_sigvit,
    hgc_fecha_sigvit
  FROM
    hgc_sigvit
  WHERE
    hgc_imc_sigvit IS NOT NULL
");

while ($row = $qs->fetch()) {
  $signos[] = $row;
}

echo json_encode($signos);
