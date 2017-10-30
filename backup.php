<?php
include "./helpers/conexion.php";

$qs = "pg_dump -U postgres hospital -f hospital.sql";
$nombre = "Backup.sql";

$query = $pdo->query($qs);
header("Content-Disposition: attachment; filename=$nombre");
header("Content-type: application/force-download");

print_r($query);
