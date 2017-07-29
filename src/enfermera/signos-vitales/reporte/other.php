<?php
date_default_timezone_set('America/Guayaquil');

require_once('../../../../tcpdf/tcpdf.php');
require_once('../../../../helpers/conexion.php');

$qs = $pdo->query("SELECT * FROM hgc_sigvit");
$row = $qs->fetch();

// $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Gabriel Alban');
$pdf->SetTitle("Signos Vitales");
$pdf->setPrintHeader(false); 
$pdf->setPrintFooter(false);
$pdf->SetMargins(20, 20, 20, false); 
$pdf->SetAutoPageBreak(true, 20); 
$pdf->SetFont('Helvetica', '', 10);
$pdf->addPage();


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
				text-align: center
				margin: 0;
				display: flex;
				align-items: center;
				margin-bottom: 2em;
				margin-top: 2em;
			}
			table tr td, tr th{
				border: 1px solid black;
				text-align: center;
				line-height: 5px;
			}
			table thead tr th{
				background-color: red;
				color: green;
			} 
		</style>
	</head>
	<body>
		<h1 class="titulo">Signos Vitales</h1>
		<table class="bordered highlight centered responsive-table">
			<thead style="background: red">
				<tr bgcolor="#FFFF80" style="display:flex: align-items: center;">
					<th>#</th>
					<th style="color:red">FECHA</th>
					<th>TEMPERATURA</th>
					<th>PESO</th>
					<th>TALLA</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>'.$row["hgc_fecha_sigvit"].'</td>
					<td>'.$row["hgc_temp_sigvit"].'</td>
					<td>'.$row["hgc_peso_sigvit"].'</td>
					<td>'.$row["hgc_talla_sigvit"].'</td>
				</tr>
			</tbody>
		</table>
	</body>
	</html>
';

// $pdf->writeHTML($content, true, 0, true, 0, '');
$pdf->writeHTML($content, true, false, true, false, '');

$pdf->lastPage();
$pdf->output('SignosVitales.pdf', 'I');