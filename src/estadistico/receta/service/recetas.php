<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM view_receta WHERE hgc_est_rec='false'");
$recetas = array();

while ($row = $query->fetch()) {
  $recetas[] = $row;
}

$json = json_encode($recetas);
print $json;
