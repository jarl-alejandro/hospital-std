<?php
include '../../../../helpers/conexion.php';

$id = $_GET['id'];
$signos = array();

$qs_pac = $pdo->query("SELECT * FROM view_pacientesexo WHERE hgc_cedu_pacie='$id'");
$row_paciente = $qs_pac->fetch();

$qs = $pdo->query("SELECT * FROM view_signosvitales WHERE hgc_hcli_sigvit='$id' AND hgc_frcar_sigvit=''
  ORDER BY hgc_fecha_sigvit");

while ($row = $qs->fetch()) {
  $paciente = array(
    'fecha'       => $row['hgc_fecha_sigvit'],
    'peso'        => $row['hgc_peso_sigvit'],
    'longitud'    => $row['hgc_longi_sigvit'],
    'pencefalico' => $row['hgc_prence_sigvit'],
    'sexo'        => $row['hgc_desc_genero'],
  );
  $signos[] = $paciente;
}

$response = array('paciente'=>$row_paciente, 'signos'=>$signos);

echo json_encode($response);
