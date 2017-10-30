<?php
session_start();

date_default_timezone_set('America/Guayaquil');
require_once('../../../../helpers/conexion.php');
require_once('../../../../mpd/mpdf.php');

$id = $_GET['id'];
$index = 0;

$id_user = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

$user = $pdo->query("SELECT * FROM view_user WHERE hgc_cedu_profe='$id_user'");
$row_user = $user->fetch();

$mpdf = new mPDF('c', 'A4-L');

$qs = $pdo->query("SELECT * FROM hgc_sigvit WHERE hgc_hcli_sigvit='$id'");
$query = $pdo->query("SELECT * FROM view_paciente WHERE hgc_cedu_pacie='$id'");
$paciente = $query->fetch();

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
      <h3 class="titulo">Signos Vitales</h3>
    </header>
    <div style="margin-bottom:1em">
      <p>Nombre y Apellido: '.$paciente["paciente"] .'</p>
      <p>Historia Clinica: #'.$paciente["hgc_histo_hcli"] .'</p>
    </div>';

$content .= '<div>';

$headerIndex = 0;

while ($row = $qs->fetch()) {
  $index++;
  $headerIndex++;

  if ($row["hgc_tform_sigvit"] === 'form028a') {
    $content .= ' hola
      <table class="bordered highlight centered responsive-table">
        <thead style="background: red">
          <tr bgcolor="#FFFF80" style="display:flex: align-items: center;">
            <th>#</th>
            <th>FECHA</th>
            <th>TEMPERATURA</th>
            <th>PESO</th>
            <th>P. Cefalico</th>
            <th>Longitud</th>
            <th>Pulso</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>'.$index.'</td>
            <td>'.$row["hgc_fecha_sigvit"].'</td>
            <td>'.$row["hgc_temp_sigvit"].'</td>
            <td>'.$row["hgc_peso_sigvit"].'</td>
            <td>'.$row["hgc_prence_sigvit"].'</td>
            <td>'.$row["hgc_longi_sigvit"].'</td>
            <td>'.$row["hgc_puls_sigvit"].'</td>
          </tr>
        </tbody>
      </table>';
  }
  else if ($row["hgc_tform_sigvit"] === 'form028c') {
    $content .= '
      <table class="bordered highlight centered responsive-table">
        <thead style="background: red">
          <tr bgcolor="#FFFF80" style="display:flex: align-items: center;">
            <th>#</th>
            <th>FECHA</th>
            <th>TEMPERATURA</th>
            <th>F. CARDIACA</th>
            <th>F. RESPIRATORIO</th>
            <th>P. Arterial</th>
            <th>PESO</th>
            <th>TALLA</th>
            <th>Estado Nutricional</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>'.$index.'</td>
            <td>'.$row["hgc_fecha_sigvit"].'</td>
            <td>'.$row["hgc_temp_sigvit"].'</td>
            <td>'.$row["hgc_frcar_sigvit"].'</td>
            <td>'.$row["hgc_frresp_sigvit"].'</td>
            <td>'.$row["hgc_prart_sigvit"].'</td>
            <td>'.$row["hgc_peso_sigvit"].'</td>
            <td>'.$row["hgc_talla_sigvit"].'</td>
            <td>'.$row["hgc_esta_sigvit"].'</td>
          </tr>
        </tbody>
      </table>
    ';
  }
  else if ($row['hgc_tform_sigvit'] === 'form056') {
    $content .= '
    <table class="bordered highlight centered responsive-table">
      <thead style="background: red">
        <tr bgcolor="#FFFF80" style="display:flex: align-items: center;">
          <th>#</th>
          <th>FECHA</th>
          <th>FRECUENCIA CARDIACA (latido/min)</th>
          <th>PRESION ARTERIAL (100/70)</th>
          <th>PESO</th>
          <th>TALLA</th>
          <th>INDICE DE MASA CORPORAL (IMC)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>'.$index.'</td>
          <td>'.$row["hgc_fecha_sigvit"].'</td>
          <td>'.$row["hgc_frcar_sigvit"].'</td>
          <td>'.$row["hgc_prart_sigvit"].'</td>
          <td>'.$row["hgc_peso_sigvit"].'</td>
          <td>'.$row["hgc_talla_sigvit"].'</td>
          <td>'.$row["hgc_imc_sigvit"].'</td>
        </tr>
      </tbody>
    </table>';
  }
  else if ($row["hgc_tform_sigvit"] === 'menor65') {
    $content .= '
      <table class="bordered highlight centered responsive-table">
        <thead style="background: red">
          <tr bgcolor="#FFFF80" style="display:flex: align-items: center;">
            <th>#</th>
            <th>FECHA DE MEDICION</th>
            <th>TEMPERATURA ºC</th>
            <th>PRESION ARTERIAL</th>
            <th>PULSO/min / FRECUENCIA RESPIRATORIO</th>
            <th>PESO/kg / TALLA/cm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>'.$index.'</td>
            <td>'.$row["hgc_fecha_sigvit"].'</td>
            <td>'.$row["hgc_temp_sigvit"].'</td>
            <td>'.$row["hgc_prart_sigvit"].'</td>
            <td>'.$row["hgc_puls_sigvit"].'/'.$row["hgc_fre_sigvit"].'</td>
            <td>'.$row["hgc_peso_sigvit"].'/'.$row["hgc_talla_sigvit"].'</td>
          </tr>
        </tbody>
      </table>
    ';
  }
  else if ($row["hgc_tform_sigvit"] === 'mayor65') {
    $content .= '
      <table class="bordered highlight centered responsive-table">
        <thead style="background: red">
          <tr bgcolor="#FFFF80" style="display:flex: align-items: center;">
            <th>#</th>
            <th>FECHA</th>
            <th>P. ARTERIAL ACOSTADO</th>
            <th>P. ARTERIAL SENTADO</th>
            <th>TEMPERATURA ºC</th>
            <th>PULSO 7min</th>
            <th>FRECUENCIA RESPIR/min</th>
            <th>PESO (kg)</th>
            <th>TALLA (cm)</th>
            <th>IMC</th>
            <th>PERIMETRO CINTURA (cm)</th>
            <th>PERIMETRO CADERA (cm)</th>
            <th>PERIMETRO PANTORILLA (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>'.$index.'</td>
            <td>'.$row["hgc_fecha_sigvit"].'</td>
            <td>'.$row["hgc_pracost_sigvit"].'</td>
            <td>'.$row["hgc_prsent_sigvit"].'</td>
            <td>'.$row["hgc_temp_sigvit"].'</td>
            <td>'.$row["hgc_puls_sigvit"].'</td>
            <td>'.$row["hgc_fre_sigvit"].'</td>
            <td>'.$row["hgc_peso_sigvit"].'</td>
            <td>'.$row["hgc_talla_sigvit"].'</td>
            <td>'.$row["hgc_imc_sigvit"].'</td>
            <td>'.$row["hgc_percint_sigvit"].'</td>
            <td>'.$row["hgc_percad_sigvit"].'</td>
            <td>'.$row["hgc_perpan_sigvit"].'</td>
          </tr>
        </tbody>
      </table>
    ';
  }

  if ($headerIndex == 6) {
    $headerIndex = 0;
    $content .= '<header name="headerSignosVitales">
      <img class="headerLogo" src="../../../../assets/img/reportes/logo.jpg" />
      <h3 class="titulo">Signos Vitales</h3>
    </header>';
  }
}

$content .= '
<div style="margin-top:8rem;text-align:center;margin-left: 40%;">
  <p style="width:30%;text-align:center;">'.$row_user['hgc_nom_profe'].' '.$row_user['hgc_ape_profe'].':</p>
  <p style="margin-top:2.5rem;width:30%;text-align:center;border-top: 1px solid black">Firmar</p>
</div>
</div>';
$content .= '</body></html>';


$mpdf->WriteHTML($content);
$mpdf->Output();
