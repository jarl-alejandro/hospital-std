<?php
include '../../../../helpers/conexion.php';

$paciente = $_GET['id'];

$qs = $pdo->query("SELECT * FROM hgc_form056 WHERE hgc_paci_f056='$paciente'");
$count = $qs->rowCount() + 1;
echo $count;
