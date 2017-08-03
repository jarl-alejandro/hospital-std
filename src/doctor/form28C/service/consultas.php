<?php
include '../../../../helpers/conexion.php';

$id = $_GET["id"];

$qs = $pdo->query("SELECT * FROM view_form WHERE hgc_paci_form28='$id' ORDER BY hgc_turno_form28 ASC");
$row = $qs->fetch();
$count = $qs->rowCount();

$array = array('count'=>$count, 'form'=>$row);
$json = json_encode($array);
print $json;
