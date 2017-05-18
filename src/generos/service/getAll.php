<?php
include '../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_genero");
$generos = array();

while ($row = $query->fetch()) {
  $generos[] = $row;
}

$json = json_encode($generos);
print $json;