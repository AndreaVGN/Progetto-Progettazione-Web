<?php 
  require "../sessione/sessione.php";

  $data = json_decode(file_get_contents("php://input"), true);
  $username = $_SESSION['username'];
  $connection = new mysqli("localhost", "root", "", "Vagnoli_635788");
  $data = $connection->real_escape_string($data);
  $query = "UPDATE utente SET ultimoScore = '$data' WHERE username = '$username'";
  $result = $connection->query($query);
  $connection->close();
?>