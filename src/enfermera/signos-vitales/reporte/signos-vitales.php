<?php
date_default_timezone_set('America/Guayaquil');
require_once('../../../../helpers/conexion.php');

require_once('../../../../mpd/mpdf.php');


$qs = $pdo->query("SELECT * FROM hgc_sigvit");

$content = '<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>SIGNO VITALES</title>
		<link rel="stylesheet" href="../../../../assets/css/materialize.css">
    <link rel="stylesheet" href="../../../../assets/css/style.css">

		<style>
			.titulo {
				text-align: center;
				background-color: red !important;
				color: #ee1 !important;
			}
			table tr td, tr th{
				font-size: 12px;
				border: 1px solid black;
				text-align: center;
				line-height: 5px;
			}
			table thead tr th{
				background-color: #00bcd4;
			} 
		</style>
	</head>
	<body>
		<h1 class="titulo s-100">Signos Vitales</h1>
		<table class="bordered highlight centered responsive-table">
			<thead style="background: red">
				<tr bgcolor="#FFFF80" style="display:flex: align-items: center;">
					<th>#</th>
					<th>FECHA</th>
					<th>TEMPERATURA</th>
					<th>PESO</th>
					<th>TALLA</th>
				</tr>
			</thead>
			<tbody>';
			while ($row = $qs->fetch()){
				$content .='<tr>
					<td>1</td>
					<td>'.$row["hgc_fecha_sigvit"].'</td>
					<td>'.$row["hgc_temp_sigvit"].'</td>
					<td>'.$row["hgc_peso_sigvit"].'</td>
					<td>'.$row["hgc_talla_sigvit"].'</td>
				</tr>';
			}
			$content .='</tbody>
		</table>
	</body>
	</html>
';

$mpdf=new mPDF();
// $mpdf->SetHTMLHeader($cabecera);
// $mpdf->SetHTMLFooter($pie);
$mpdf->WriteHTML($content);
$mpdf->Output();