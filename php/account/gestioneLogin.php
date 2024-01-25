<?php
  session_start();
  $data = json_decode(file_get_contents("php://input"), true);
  $username = $data['username'];
  $password = $data['password'];

  if(strlen($username) !=0 && strlen($password)!=0){
    $connection = new mysqli("localhost", "root", "", "Vagnoli_635788");
    $username = $connection->real_escape_string($username);
    $query = "SELECT * FROM utente WHERE username = '$username'";
    $result = $connection->query($query);
    if($result->num_rows == 0){
      $codiceRisposta = 0;
      $_SESSION['message'] = "L'utente $username &egrave sconosciuto.";
    }
    else{
      $user_row = $result->fetch_array();
      if(password_verify($password, $user_row['password'])){
        $codiceRisposta = 1;
        session_unset();
        session_destroy(); 
        //inizializzazione nuova sessione 
        session_start(); 
        $_SESSION['username'] = $username; 
        $_SESSION['start_time'] = time(); 
        $_SESSION['DB_username'] = $user_row['DB_username'];
        $_SESSION['DB_password'] = $user_row['DB_password'];
      }
      else{
        $codiceRisposta = 2;
        $_SESSION['message'] = "Password errata!";
      }
    }
      $result->free();
      $connection->close(); 
  } 
  else{
    $codiceRisposta = 3;
    $_SESSION['message'] = "Errore!";
  } 
  echo json_encode($codiceRisposta);
  exit();
?> 