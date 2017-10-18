<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM view_receta");
$recetas = array();

while ($row = $query->fetch()) {
  $recetas[] = $row;
}

$json = json_encode($recetas);
print $json;
