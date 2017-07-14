<?php
include '../../../../helpers/conexion.php';

$qs = $pdo->query("SELECT * FROM hgc_empresa");

$row = $qs->fetch();
$count = $qs->rowCount();

$empresa = array('cont'=> $count, 'empresa'=>$row);
$json = json_encode($empresa);

echo $json;
