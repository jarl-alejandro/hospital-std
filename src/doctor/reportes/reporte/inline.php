<?php
ob_start();
date_default_timezone_set('America/Guayaquil');
require_once('../../../../mpd/mpdf.php');
?>
<cfdocument format="PDF" pagetype="letter">

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>CSS Demo: Display Property (block, inline, inline-block)</title>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>

<body style="margin: 0; padding: 0">

<style>
.container { margin-left: 2em; width: 35em; border: none; }
div { margin: 1em 0; border: solid 1px red; }
p { margin: 1em 0; border: dotted 2px blue; }
div#one p { display: block; width: 6em; text-align: center; }
div#two p { display: inline; width: 6em; text-align: center; }
div#three p { display: inline-block; width: 6em; text-align: center; }
</style>

<div class="container">
    <div id="one">
        <strong>TEST 1: block</strong>  This text is within block-level level element (DIV).
        <p>Here's a block-level paragraph (P).</p>
        Here's some additional text still inside a block-level elment.
    </div>
    <div id="two">
        <strong>TEST 2: inline</strong>  This text is within block-level level element (DIV).
        <p>Here's an inline paragraph (P).</p>
        Here's some additional text still inside a block-level element.
    </div>
    <div id="three">
        <strong>TEST 3: inline-block</strong> This text is within block-level level element (DIV).
        <p>Here's an inline-block paragraph (P).</p>
        Here's some additional text still inside a block-level element.
    </div>
    <div style="background:yellow">
      <p style="float:left;clear:both; border:0px;margin:0;width:47%;background:red;">Hola</p>
      <p style="float:right;clear:both; border:0px;margin:0;;width:47%;background:blue;">Mundo</p>
    </div>
</div>

</body>
</html>
</cfdocument>
<?php
  $mpdf = new mPDF('c');

  $stylesheet = file_get_contents('form028a.css');
  $mpdf->WriteHTML($stylesheet,1);
  $mpdf->SetDisplayMode('fullpage');
  $mpdf->WriteHTML(ob_get_clean());
  $mpdf->Output();
?>
