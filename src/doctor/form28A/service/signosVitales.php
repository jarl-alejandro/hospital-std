<?php
include '../../../../helpers/conexion.php';

$turno = $_GET['turno'];


$qs = $pdo->query("SELECT * FROM hgc_sigvit WHERE hgc_turno_sigvit='$turno'");
$row = $qs->fetch();

echo json_encode($row);
