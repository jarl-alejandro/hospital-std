<?php
include '../../../../helpers/conexion.php';

$id = $_GET['id'];

$qs = $pdo->query("SELECT * FROM view_paciente WHERE hgc_cedu_pacie='$id'");
$row = $qs->fetch();

$sexo = $row['hgc_sexo_pacie'];

$qs_sex = $pdo->query("SELECT * FROM hgc_genero WHERE hgc_codi_genero='$sexo'");
$row_sex = $qs_sex->fetch();

$array = array('paciente'=>$row, 'sexo'=>$row_sex);

$json = json_encode($array);
echo $json;
