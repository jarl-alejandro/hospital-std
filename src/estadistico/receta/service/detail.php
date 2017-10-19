<?php
include '../../../../helpers/conexion.php';

$id = $_GET['id'];

$query = $pdo->query("SELECT * FROM v_receta_detail WHERE hgc_rec_rec='$id'");
$recetas = array();

while ($row = $query->fetch()) {
  $recetas[] = $row;
}

$json = json_encode($recetas);
print $json;
