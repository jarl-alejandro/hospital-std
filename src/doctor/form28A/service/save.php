<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = setCode($pdo, 'F28A-', 9, 'hgc_form28', 'hgc_cont_form28');
updateCode($pdo, 'hgc_cont_form28');

$motivo = $obj->motivo;
$enfermedad = $obj->enfermedad;
$paciente = $obj->paciente;
$turno = $obj->turno;

// OBSTRETICOS
$fechaEmbarazo = $obj->fechaEmbarazo;

$gestasPrevias = $obj->gestasPrevias;
$abortos = $obj->abortos;
$partos = $obj->partos;
$partosVaginales = $obj->partosVaginales;
$cesarias = $obj->cesarias;
$nacidosVivos = $obj->nacidosVivos;
$nacidosMuertos = $obj->nacidosMuertos;

$hijosVivos = $obj->hijosVivos;
$muertosMenor7 = $obj->muertosMenor7;
$muertosMayor7 = $obj->muertosMayor7;

// END OBSTRETICOS

// REANIMACION
$reanimacionCheck = $obj->reanimacionCheck;
$reanimacion = $obj->reanimacion;

$apagar1Min = $obj->apagar1Min;
$apagar5Min = $obj->apagar5Min;
$pesoNacer = $obj->pesoNacer;
$longitud = $obj->longitud;
$pCefalico = $obj->pCefalico;

$edadGestion = $obj->edadGestion;
$relacionPeso = $obj->relacionPeso;

$tipoficacionSanguineaCheck = $obj->tipoficacionSanguineaCheck;
$tipoficacionSanguinea = $obj->tipoficacionSanguinea;

$examenesEspecialesCheck = $obj->examenesEspecialesCheck;
$examenesEspeciales = $obj->examenesEspeciales;

$tamizaje = $obj->tamizaje;
$condicionEgreso = $obj->condicionEgreso;
$referido = $obj->referido;
// END REANIMACION

$sistemas = $obj->sistemas;
$fisicos = $obj->fisicos;
$atendido = $obj->atendido;
$form = $obj->form;

$hoy = date("Y/m/d");
$hora = date("h:i");


// Formulario 028A
$new = $pdo->prepare("INSERT INTO hgc_form28 (hgc_codi_form28, hgc_moti_form28,
  hgc_enfer_form28, hgc_paci_form28, hgc_turno_form28, hgc_fech_form28, hgc_hora_form28)
  VALUES (?, ?, ?, ?, ?, ?, ?)");

$new->bindParam(1, $codigo);
$new->bindParam(2, $motivo);
$new->bindParam(3, $enfermedad);
$new->bindParam(4, $paciente);
$new->bindParam(5, $turno);
$new->bindParam(6, $hoy);
$new->bindParam(7, $hora);

$new->execute();

// OBSTRETICOS
$new_obst = $pdo->prepare('INSERT INTO hgc_obst (hgc_form_obst, hgc_femb_obst,
  hgc_gpre_obst, hgc_abor_obst, hgc_part_obst, hgc_pvag_obst, hgc_cesa_obst,
  hgc_nviv_obst, hgc_nmue_obst, hgc_hviv_obst, hgc_mne7_obst, hgc_mma7_obst)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

$new_obst->bindParam(1, $codigo);
$new_obst->bindParam(2, $fechaEmbarazo);
$new_obst->bindParam(3, $gestasPrevias);
$new_obst->bindParam(4, $abortos);
$new_obst->bindParam(5, $partos);
$new_obst->bindParam(6, $partosVaginales);
$new_obst->bindParam(7, $cesarias);
$new_obst->bindParam(8, $nacidosVivos);
$new_obst->bindParam(9, $nacidosMuertos);
$new_obst->bindParam(10, $hijosVivos);
$new_obst->bindParam(11, $muertosMenor7);
$new_obst->bindParam(12, $muertosMayor7);

$new_obst->execute();
// END OBSTRETICOS

// RECIEN NACIDOS
$new_recien = $pdo->prepare('INSERT INTO hgc_recien_nacido (hgc_form_nac,
  hgc_rean_nac, hgc_reob_nac, hgc_ap1m_nac, hgc_ap5m_nac, hgc_pena_nac,
  hgc_lon_nac, hgc_pcef_nac, hgc_edge_nac, hgc_repe_nac, hgc_tisa_nac,
  hgc_tipob_nac, hgc_exes_nac, hgc_exob_nac, hgc_tami_nac, hgc_coeg_nac,
  hgc_refe_nac)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

$new_recien->bindParam(1, $codigo);
$new_recien->bindParam(2, $reanimacionCheck);
$new_recien->bindParam(3, $reanimacion);
$new_recien->bindParam(4, $apagar1Min);
$new_recien->bindParam(5, $apagar5Min);
$new_recien->bindParam(6, $pesoNacer);
$new_recien->bindParam(7, $longitud);
$new_recien->bindParam(8, $pCefalico);
$new_recien->bindParam(9, $edadGestion);
$new_recien->bindParam(10, $relacionPeso);
$new_recien->bindParam(11, $tipoficacionSanguineaCheck);
$new_recien->bindParam(12, $tipoficacionSanguinea);
$new_recien->bindParam(13, $examenesEspecialesCheck);
$new_recien->bindParam(14, $examenesEspeciales);
$new_recien->bindParam(15, $tamizaje);
$new_recien->bindParam(16, $condicionEgreso);
$new_recien->bindParam(17, $referido);

$new_recien->execute();

// END RECIEN NACIDOS

// Update turno
$stamp = date('Y-m-d H:i:s');

$pdo->query("UPDATE hgc_turno SET hgc_esta_turno='form', hgc_tipo_form='form28A', hgc_fecha_consulta='$stamp' WHERE hgc_id_turno='$turno'");

// DETALLE
$detail = $pdo->prepare("INSERT INTO hgc_dform28 (hgc_form_dform28, hgc_codi_dform28,
  hgc_tipo_dform28, hgc_obser_dform28, hgc_secc_dform28) VALUES (?, ?, ?, ?, ?)");

foreach ($sistemas as $row) {
  $id = $row->id;
  $tipo = $row->tipo;
  $observacion = $row->observacion;
  $seccion = '10';

  $detail->bindParam(1, $codigo);
  $detail->bindParam(2, $id);
  $detail->bindParam(3, $tipo);
  $detail->bindParam(4, $observacion);
  $detail->bindParam(5, $seccion);

  $detail->execute();
}

foreach ($fisicos as $row) {
  $id = $row->id;
  $tipo = $row->tipo;
  $observacion = $row->observacion;
  $seccion = '11';

  $detail->bindParam(1, $codigo);
  $detail->bindParam(2, $id);
  $detail->bindParam(3, $tipo);
  $detail->bindParam(4, $observacion);
  $detail->bindParam(5, $seccion);

  $detail->execute();
}

foreach ($form as $row) {
  $id = $row->id;
  $tipo = $row->tipo;
  $observacion = $row->observacion;
  $seccion = $row->seccion;

  $detail->bindParam(1, $codigo);
  $detail->bindParam(2, $id);
  $detail->bindParam(3, $tipo);
  $detail->bindParam(4, $observacion);
  $detail->bindParam(5, $seccion);

  $detail->execute();
}
// END DETALLE

// ATENDIDO
$new_atendio =  $pdo->prepare("INSERT INTO hgc_atendido (hgc_form_aten, hgc_tipo_aten,
    hgc_desc_aten) VALUES (?, ?, ?)");

foreach ($atendido as $row) {
  $tipo = $row->tipo;
  $atendido = $row->atendido;

  $new_atendio->bindParam(1, $codigo);
  $new_atendio->bindParam(2, $tipo);
  $new_atendio->bindParam(3, $atendido);

  $new_atendio->execute();
}
// END ATENDIDO
if ($new) {
  echo 201;
}
