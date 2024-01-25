<?php
  require "sessione.php";

  $username = $_SESSION['username'];
  $start_time = date("Y-m-d H:i:s", $_SESSION['start_time']);
  $connection = new mysqli("localhost", "root", "", "Vagnoli_635788");
  $query = "INSERT INTO `logtable`(`utente`, `timestampInizioSessione`, `timestampFineSessione`) 
            VALUES ('$username','$start_time', NOW())";
  $result = $connection->query($query);
  $connection->close();
  header("Location: logout.php");
?>