<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$canton = $obj->canton;
$parroquia = $obj->parroquia;
$id = $obj->id;
$circuitos = $obj->circuitos;

$detail = $pdo->prepare("INSERT INTO hgc_det_parroquia (hgc_circ_parr, hgc_parr_parr)
      VALUES (?, ?)");

if ($id == "") {
  $codigo = setCode($pdo, 'PA-', 9, 'hgc_parroquia', 'hgc_cont_parr');
  updateCode($pdo, 'hgc_cont_parr');

  $new = $pdo->prepare("INSERT INTO hgc_parroquia (hgc_desc_parro, hgc_cant_parro,
    hgc_codi_parro) VALUES (?, ?, ?)");

  $new->bindParam(1, $parroquia);
  $new->bindParam(2, $canton);
  $new->bindParam(3, $codigo);
  $new->execute();

  foreach ($circuitos as $row) {
    $circuito = $row->circuito;
    $detail->bindParam(1, $circuito);
    $detail->bindParam(2, $codigo);
    $detail->execute();
  }
}
else {
  $new = $pdo->query("UPDATE hgc_parroquia SET hgc_desc_parro='$parroquia',
    hgc_cant_parro='$canton' WHERE hgc_codi_parro='$id'");

  $pdo->query("DELETE FROM hgc_det_parroquia WHERE hgc_parr_parr='$id'");
  foreach ($circuitos as $row) {
    $circuito = $row->circuito;

    $detail->bindParam(1, $circuito);
    $detail->bindParam(2, $id);
    $detail->execute();
  }
}

if ($new) {
  echo 201;
}
