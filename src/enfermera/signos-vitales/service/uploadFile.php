<?php
session_start();

include '../../../../helpers/conexion.php';
include '../../../../helpers/upload_file.php';
include '../../../../helpers/generar_codigo.php';

$turno = $_POST['turno'];

$codigo = setCode($pdo, 'SV-', 9, 'hgc_sigvit', 'hgc_cont_imagen');
updateCode($pdo, 'hgc_cont_imagen');

$file = upload_pdf($codigo, 'filePDF', '../../../../media/signosVitales');

$new = $pdo->query("INSERT INTO hgc_sigvit (hgc_turno_sigvit, hgc_pdf_sigvit) VALUES ('$turno', '$file')");

$pdo->query("UPDATE hgc_turno SET hgc_esta_turno='pdf' WHERE hgc_id_turno='$turno'");

if ($new) {
  echo 201;
}
