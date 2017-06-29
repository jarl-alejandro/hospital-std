<?php
function setCode($pdo, $letra=NULL, $digitos=NULL, $tabla=NULL, $fila){
  $query = $pdo->query("SELECT * FROM hgc_params");
  $row = $query->fetch();
  $cant = $row[$fila];
  $str_ceros = "";
  $nletra = strlen($letra);
  $ncant = strlen($cant);
  $ceros = $digitos - ($nletra + $ncant);
  $i = 1;
  while($i <= $ceros){
    $str_ceros .= "0";
    $i += 1;
  }
  $cant++;
  $codigo = $letra.$str_ceros.$cant;
  return $codigo;
}

function updateCode($pdo, $campo) {
  $query1 = $pdo->query("SELECT * FROM hgc_params");
  $row1 = $query1->fetch();
  $canta = $row1[$campo];
  $canta = $canta + 1;
  $pdo->query("UPDATE hgc_params SET $campo='$canta'");
}
