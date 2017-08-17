<?php
include '../../../../helpers/conexion.php';

$cedula = $_GET['cedula'];

$qs = $pdo->query("SELECT hgc_cedu_profe, hgc_codi_profe FROM hgc_profesionales WHERE hgc_cedu_profe='$cedula'");

$row = $qs->fetch();
echo json_encode($row);
