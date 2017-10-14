<?php
include '../../../../helpers/conexion.php';

$qs = $pdo->query("SELECT * FROM hgc_empresa");
$row = $qs->fetch();

echo json_encode($row);
