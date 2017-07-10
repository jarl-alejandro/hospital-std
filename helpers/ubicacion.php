<?php

function ubicacion_fisica_historial ($apellido, $pdo) {
  $array = str_split($apellido);
  $letra = $array[0];

  $qs = $pdo->query("SELECT * FROM hgc_hclinica WHERE hgc_ubica_hcli LIKE '%$letra%'
      ORDER BY hgc_ubica_hcli DESC LIMIT 1");
  $row = $qs->fetch();

  $ubicacion_old = $row['hgc_ubica_hcli'];

  $array = explode("-", $ubicacion_old);
  $percha = str_split($array[0]);

  $nro_carpeta = $array[3];
  $seg_percha = $array[2];
  $nro_bandeja = $array[1];
  $nro_percha = $percha[2];

  if ($nro_carpeta > 19) {
    $nro_carpeta = 1;
    $seg_percha++;
  }
  else{
    $nro_carpeta++;
  }

  if ($seg_percha > 4){
    $seg_percha = 1;
    $nro_bandeja++;
  }

  if ($nro_bandeja > 5) {
    $nro_bandeja = 1;
    $nro_percha++;
  }

  $ubicacacion_new =
    $letra."0".$nro_percha."-".$nro_bandeja."-".$seg_percha."-".$nro_carpeta;

  return $ubicacacion_new;
}
