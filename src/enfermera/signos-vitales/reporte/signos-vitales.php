<?php
date_default_timezone_set('America/Guayaquil');
require_once('../../../../helpers/conexion.php');

require_once('../../../../mpd/mpdf.php');


$qs = $pdo->query("SELECT * FROM hgc_sigvit");
$index = 0;

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
				height: 4em;
				text-align: center;
				border-bottom: 1px solid #585757;
			}
			.headerLogo {
				width: 60%;
    		height: 9em;
			}
			.titulo {
				text-align: center;
				display:block;
				color: #585757;
				font-weight: bold;
			}
			table {
				margin-bottom: 1em;
			}
			table tr td, tr th{
				font-size: 12px;
				border: 1px solid #585757;
				text-align: center;
				line-height: 5px;
			}
			table thead tr th{
				background-color: #00bcd4;
			}
		</style>
	</head>
	<body>
		<header>
			<img class="headerLogo" src="../../../../assets/img/reportes/logo.jpg" />
		</header>';

$content .='<div><h3 class="titulo s-100">Signos Vitales</h3>';

while ($row = $qs->fetch()){
	$index++;
	if ($row["hgc_talla_sigvit"] === '') {
		$content .= '<table class="bordered highlight centered responsive-table">
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
	else {
		$content .= '<table class="bordered highlight centered responsive-table">
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
		</table>';
	}
}

$content .='</div>';
$content .='</body></html>';

// $mpdf = new mPDF();
$mpdf = new mPDF('c', 'A4-L'); 

$mpdf->WriteHTML($content);
$mpdf->Output();