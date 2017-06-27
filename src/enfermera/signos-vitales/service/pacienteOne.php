<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$hoy = date("Y/m/d");
$id = $_GET["id"];

$query = $pdo->query("SELECT * FROM view_paciente WHERE hgc_cedu_pacie='$id'");
$paciente = $query->fetch();

$json = json_encode($paciente);
print $json;
