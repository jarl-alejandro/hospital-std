<?php
session_start();
$_SESSION["87ea5dfc8b8e384d848979496e706390b497e547"] = "";
$_SESSION["f9f011a553550aef31a8ee2690e1d1b5f261c9ff"] = "";
$_SESSION["a88b7dcd1a9e3e17770bbaa6d7515b31a2d7e85d"] = "";
$_SESSION["9c3bb49ffea1144231cbe02d904b8d9018744e9d"] = "";

session_destroy();
$json = array('status'=>200);
echo json_encode($json);
