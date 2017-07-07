<?php
include '../../../helpers/conexion.php';

$medicos = array();

$qs = $pdo->query("SELECT * FROM view_user WHERE hgc_rol_usu='doctor' OR
                    hgc_rol_usu='enfermera'");

while ($row = $qs->fetch()) {
  $medicos[] = $row;
}

$json = json_encode($medicos);
print $json;
