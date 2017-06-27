<?php

try {
  $pdo = new PDO('pgsql:host=localhost;port=5432;dbname=consultas',
  'postgres', '123456');
}
catch(PDOException $e) {
  echo $e->getMessage();

}
