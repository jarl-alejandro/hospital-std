<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

// $codigo = setCode($pdo, 'RC-', 9, 'hgc_receta', 'hgc_cont_receta');
// updateCode($pdo, 'hgc_cont_receta');

$paciente = $obj->paciente;
$especialidad = $obj->especialidad;
$medico = $obj->medico;
$receta = $obj->receta;

print_r($obj);
print_r($obj);
print_r($medico);
print_r($receta);
