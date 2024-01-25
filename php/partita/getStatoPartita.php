<?php 
  require "../sessione/sessione.php";

  $username = $_SESSION['username'];
  $connection = new mysqli("localhost", "root", "", "Vagnoli_635788");
  $query = "SELECT statoPartita FROM utente WHERE username = '$username'";
  $result = $connection->query($query);
  $row = mysqli_fetch_object($result);
  echo json_encode($row);
  $result->free();
  $connection->close();
?>