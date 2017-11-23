<?php
session_start();

date_default_timezone_set('America/Guayaquil');
require_once('../../../../helpers/conexion.php');
require_once('../../../../mpd/mpdf.php');

$id = $_GET['id'];
$index = 0;

function _data_last_month_day($month) { 
  // $month = date('m');
  $year = date('Y');
  $day = date("d", mktime(0,0,0, $month+1, 0, $year));
 
  return date('d', mktime(0,0,0, $month, $day, $year));
}

$id_user = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

if ($_GET['type'] == 'day') {
  $hoy = date("Y-m-d");

  $qs = $pdo->query("SELECT * FROM view_turnos_sigvit
    WHERE hgc_fecha_sigvit='$hoy'
    AND (hgc_esta_turno='form' OR hgc_esta_turno='signosVitales')
    AND hgc_enfer_sigvit='$id_user'
  ");
}
if ($_GET['type'] == 'mes') {
  $month = $_GET["month"];
  $year = date('Y');
  $day = _data_last_month_day($month);
  $desde = "$year-$month-01";
  $hasta = "$year-$month-$day";

  $qs = $pdo->query("SELECT * FROM view_turnos_sigvit
    WHERE hgc_fecha_sigvit BETWEEN '$desde' AND '$hasta'
    AND (hgc_esta_turno='form' OR hgc_esta_turno='signosVitales')
    AND hgc_enfer_sigvit='$id_user'
  ");
}
if ($_GET['type'] == 'fecha')  {
  $desde = $_GET['desde'];
  $hasta = $_GET['hasta'];

  $qs = $pdo->query("SELECT * FROM view_turnos_sigvit
    WHERE hgc_fecha_sigvit BETWEEN '$desde' AND '$hasta'
    AND (hgc_esta_turno='form' OR hgc_esta_turno='signosVitales')
    AND hgc_enfer_sigvit='$id_user'
  ");

}
else {
  $qs = $pdo->query("SELECT * FROM view_turnos_sigvit 
    WHERE (hgc_esta_turno='form'  OR hgc_esta_turno='signosVitales')
    AND hgc_enfer_sigvit='$id_user'
  ");
}

$user = $pdo->query("SELECT * FROM view_user WHERE hgc_cedu_profe='$id_user'");
$row_user = $user->fetch();

$mpdf = new mPDF('c', 'A4-L');

$content = '<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SIGNO VITALES</title>
    <link rel="stylesheet" href="../../../../assets/css/materialize.css">
    <style>
      body{
        color: #585757;
        font-size: 16px;
        font-family: "Roboto",sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      header {
        border-bottom: 2px solid #585757;
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 1em;
      }
      p{
        margin: 0;
      }
      .headerLogo {
        width: 20%;
        height: 3em;
        display: inline-block;
        float: left;
      }
      .titulo {
        font-weight: bold;
        width: 80%;
        margin: 0;
        display: inline-block;
        float: right;
        margin-bottom: .1em;
      }
      table {
        margin-bottom: 1em;
      }
      table tr td, tr th{
        font-size: 12px;
        border: 1px solid #585757;
        text-align: center;
      }
      table thead tr th{
        background-color: #00bcd4;
      }
    </style>
  </head>
  <body>
    <header name="headerSignosVitales">
      <img class="headerLogo" src="../../../../assets/img/reportes/logo.jpg" />
      <h3 class="titulo">Pacientes Atendidos</h3>
    </header>
    <div style="margin-bottom:1em">
    </div>';
  //  <p>Nombre y Apellido: '.$paciente["paciente"] .'</p>
      // <p>Historia Clinica: #'.$paciente["hgc_histo_hcli"] .'</p>
$content .= '<div>
<table class="bordered highlight centered responsive-table">
  <thead style="background: red">
    <tr bgcolor="#FFFF80" style="display:flex: align-items: center;">
      <th width="10%">#</th>
      <th width="23%">Historia Clinica</th>
      <th width="23%">Paciente</th>
      <th width="23%">Doctor</th>
    </tr>
  </thead>
  <tbody>
';

$headerIndex = 0;
$index = 0;

if ($qs->rowCount() === 0) {
    $content .= '
    <tr>
      <td colspan="4">No hay pacientes</td>
    </tr>';
}

$counterPage = 1;

while ($row = $qs->fetch()) {
  $index++;
  $headerIndex++;

  $content .= '
    <tr>
      <td>'.$index.'</td>
      <td>'.$row["hgc_paci_turno"].'</td>
      <td>'.$row["paciente"].'</td>
      <td>'.$row["doctor"].'</td>
    </tr>';
}

$content .= '
    </tbody>
  </table>
  <div style="margin-top:8rem;text-align:center;margin-left: 40%;">
    <p style="width:30%;text-align:center;">'.$row_user['hgc_nom_profe'].' '.$row_user['hgc_ape_profe'].':</p>
    <p style="margin-top:2.5rem;width:30%;text-align:center;border-top: 1px solid black">Firmar</p>
  </div>
</div>';

$content .= '</body></html>';


$mpdf->WriteHTML($content);
$mpdf->Output();
