<?php
include '../../../../helpers/conexion.php';

$id = $_GET['id'];

$qs = $pdo->query("SELECT * FROM hgc_sigvit WHERE hgc_turno_sigvit='$id'");
$row = $qs->fetch();

echo json_encode($row);
