<?php
ob_start();
date_default_timezone_set('America/Guayaquil');
require_once('../../../../helpers/conexion.php');
require_once('../../../../mpd/mpdf.php');

$turno = $_GET['turno'];
$index = 0;
$mpdf = new mPDF('c');

$qs = $pdo->query("SELECT * FROM hgc_form28 WHERE hgc_turno_form28='$turno'");
$row = $qs->fetch();
$id = $row["hgc_paci_form28"];

$qs_pac = $pdo->query("SELECT * FROM view_paciente WHERE hgc_cedu_pacie='$id'");
$row_pac = $qs_pac->fetch();
$sexo = $row_pac['hgc_sexo_pacie'];

$qs_sex = $pdo->query("SELECT * FROM hgc_genero WHERE hgc_codi_genero='$sexo'");
$row_sex = $qs_sex->fetch();

$qs_empresa = $pdo->query("SELECT * FROM hgc_empresa");
$row_empresa = $qs_empresa->fetch();

$qs_detail = $pdo->query("SELECT * FROM hgc_sisfis WHERE hgc_tipo_sisfi='3'")
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Form 028A</title>
    <link rel="stylesheet" href="../../../../assets/css/materialize.css">
    <!-- <link rel="stylesheet" href="./form028a.css"> -->
  </head>
  <body>
    <header name="headerSignosVitales">
      <img class="headerLogo" src="../../../../assets/img/reportes/logo.jpg" />
    </header>

    <article class="headerForm">
      <table>
        <thead>
          <tr>
            <th>ESTABLECIMIENTO</th>
            <th>NOMBRE Y APELLIDOS</th>
            <th>SEXO (H/M)</th>
            <th>FECHA DE NACIMIENTO</th>
            <th>Nº HISTORIA CLINICA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><?= $row_empresa['hgc_nom_empr'] ?></td>
            <td><?= $row_pac['paciente'] ?></td>
            <td><?= $row_sex['hgc_desc_genero'] ?></td>
            <td><?= $row_pac['hgc_fecn_pacie'] ?></td>
            <td><?= $row_pac['hgc_histo_hcli'] ?></td>
          </tr>
        </tbody>
      </table>
    </article>
    <p class="tag__information" style="width: 30%;">FUENTE DE INFORMACION:</p>

    <article class="AntecedentesMaternos">
      <h5 class="AntecedentesMaternos-title">1. ANTECEDENTES MATERNOS</h5>
      <div class="AntecedentesMaternos--menu">
        <p class="menu-mat-1" style="width:20%">SI</p>
        <p class="menu-mat-1" style="width:20%">NO</p>
        <p class="menu-mat-1" style="width:60%">OBSERVACION</p>
      </div>
      <div class="AntecedentesMaternos--menu2">
        <p class="menu-mat-1" style="width:20%">SI</p>
        <p class="menu-mat-1" style="width:20%">NO</p>
        <p class="menu-mat-1" style="width:60%">OBSERVACION</p>
      </div>
      <div class="AntecedentesMaternos--menu">
        <?php foreach ($qs_detail as $row): ?>
          <p><?= $row['hgc_desc_sisfi'] ?></p>
          <input type="radio" />
          <input type="radio" />
          <input type="text" />
        <?php endforeach; ?>
      </div>
    </article>
  </body>
</html>

<?php
  $stylesheet = file_get_contents('form028a.css');
  $mpdf->SetDisplayMode('fullpage');
  $mpdf->WriteHTML($stylesheet,1);
  $mpdf->WriteHTML(ob_get_clean());
  $mpdf->Output();
?>
